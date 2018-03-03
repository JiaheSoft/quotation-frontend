{-# LANGUAGE DeriveAnyClass    #-}
{-# LANGUAGE DeriveGeneric     #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell   #-}
{-# LANGUAGE TypeFamilies      #-}

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

data State = State
  { _username         :: !Text
  , _password         :: !Text
  , _rememberPassword :: !Bool
  } deriving (Show, Typeable)

Lens.makeLenses ''State

{-# NOLINE store #-}
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
    putStrLn ("Username: " ++ show (Lens.view username state))
    putStrLn ("Password: " ++ show (Lens.view password state))
    putStrLn ("Remember password? " ++ show (Lens.view rememberPassword state))
    pure state
