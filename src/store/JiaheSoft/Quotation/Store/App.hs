{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DeriveGeneric  #-}
{-# LANGUAGE TypeFamilies   #-}

{-|
Top level store of our app, holding user login info.
-}
module JiaheSoft.Quotation.Store.App
  ( State(..)
  , Action(..)
  ) where

import           JiaheSoft.Quotation.Store.Import

import           JiaheSoft.Quotation.Model.User   (User)
import qualified JiaheSoft.Quotation.Model.User   as User

newtype State = State
  { user :: Maybe User
  } deriving (Show, Typeable)

data Action =
  -- | Login with username and password, respectively
    UserLogin Text Text
  -- | Logout
  | UserLogout
    deriving (Typeable, Generic, NFData)

instance StoreData State where
  type StoreAction State = Action
  transform UserLogout _ = pure $ State Nothing
  transform (UserLogin _ _) (State user@(Just _)) = pure $ State user
  transform (UserLogin name pwd) (State Nothing) = do
    putStrLn "Logging in"
    pure . State . Just $ User.makeUser name pwd

store :: ReactStore State
store = mkStore $ State Nothing
