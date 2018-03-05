{-|
/ This module is intended to be imported qualified. /
-}
module JiaheSoft.Quotation.Store.Login
  ( State
  , username
  , password
  , rememberPassword
  , Action(..)
  , store
  , dispatch
  ) where

import qualified Control.Lens                     as Lens
import           JiaheSoft.Quotation.Store.Import

import qualified JiaheSoft.Quotation.Store.App    as App

data State = State
  { _username         :: !Text
  , _password         :: !Text
  , _rememberPassword :: !Bool
  } deriving (Show, Typeable)

makeLenses ''State

store :: ReactStore State
store = mkStore (State "" "" True)

data Action =
    ChangeUsername Text
  | ChangePassword Text
  | ToggleRememberPassword
  | Login
    deriving (Typeable, Generic, NFData)

dispatch :: Action -> ViewEventHandler
dispatch a = [SomeStoreAction store a]

instance StoreData State where
  type StoreAction State = Action
  transform (ChangeUsername newName) state = pure $ Lens.set username newName state
  transform (ChangePassword newPwd) state = pure $ Lens.set password newPwd state
  transform ToggleRememberPassword state = pure $
    Lens.over rememberPassword not state
  transform Login state = do
    let theName = Lens.view username state
    let thePwd = Lens.view password state
    if theName == "admin" && thePwd == "pwd"
      then void $ alterStore App.store (App.UserLogin theName thePwd)
      else pure ()
    pure . Lens.set password "" $ state
