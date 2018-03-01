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
  , Action(..)
  , store
  , dispatch
  ) where

import qualified Control.Lens                     as Lens
import           JiaheSoft.Quotation.Store.Import

data State = State
  { _username :: !Text
  , _password :: !Text
  } deriving (Show, Typeable)

Lens.makeLenses ''State

data Action =
    ChangeUsername Text
  | ChangePassword Text
  | Login
    deriving (Typeable, Generic, NFData)

store :: ReactStore State
store = mkStore (State "" "")

dispatch :: Action -> ViewEventHandler
dispatch a = [SomeStoreAction store a]

instance StoreData State where
  type StoreAction State = Action
  transform (ChangeUsername newName) state = do
    putStrLn $ show newName
    pure $ Lens.set username newName state
  transform (ChangePassword newPwd) state = pure $ Lens.set password newPwd state
  transform Login state = do
    putStrLn ("Username: " ++ show (Lens.view username state))
    putStrLn ("Password: " ++ show (Lens.view password state))
    pure state
