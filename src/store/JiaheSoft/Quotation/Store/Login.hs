{-|
/ This module is intended to be imported qualified. /
-}
module JiaheSoft.Quotation.Store.Login
  ( State
  , username
  , password
  , rememberPassword
  , status
  , Action(..)
  , store
  , dispatch
  , Status(..)
  , isNotLoggedIn
  , isLoggingIn
  , isLoginFailed
  ) where

import qualified Control.Lens                     as Lens
import qualified Data.Text.IO                     as Text
import           JiaheSoft.Quotation.Store.Import

import qualified JiaheSoft.Quotation.Store.App    as App

{-|
  Represent the current login status
-}
data Status = NotLoggedIn
            | LoggingIn
            | LoginFailed
              deriving (Show, Typeable)

data State = State
  { _username         :: !Text
  , _password         :: !Text
  , _rememberPassword :: !Bool
  , _status           :: !Status
  } deriving (Show, Typeable)

makeLenses ''State

store :: ReactStore State
store = mkStore (State "" "" True NotLoggedIn)

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
    alterStore App.store (App.UserLogin theName thePwd onLoginFinish)
    pure state

onLoginFinish :: Either Text () -> IO ()
onLoginFinish (Right _)     = Text.putStrLn "Login successfully"
onLoginFinish (Left errMsg) = Text.putStrLn ("Error: " <> errMsg)

isNotLoggedIn :: Status -> Bool
isNotLoggedIn NotLoggedIn = True
isNotLoggedIn _           = False

isLoggingIn :: Status -> Bool
isLoggingIn LoggingIn = True
isLoggingIn _         = False

isLoginFailed :: Status -> Bool
isLoginFailed LoginFailed = True
isLoginFailed _           = False
