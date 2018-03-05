{-|
Top level store of our app, holding user login info.
-}
module JiaheSoft.Quotation.Store.App
  ( State
  , user
  , Action(..)
  , store
  , dispatch
  ) where

import           JiaheSoft.Quotation.Store.Import

import           JiaheSoft.Quotation.Model.User   (User)
import qualified JiaheSoft.Quotation.Model.User   as User

newtype State = State
  { _user :: Maybe User
  } deriving (Show, Typeable)

makeLenses ''State

data Action =
  -- | Login with username and password, respectively
    UserLogin Text Text
  -- | Logout
  | UserLogout
    deriving (Typeable, Generic, NFData)

instance StoreData State where
  type StoreAction State = Action
  transform UserLogout _ = pure $ State Nothing
  transform (UserLogin username password) _ =
    pure . State $ Just (User.makeUser username password)

store :: ReactStore State
store = mkStore $ State Nothing

dispatch :: Action -> ViewEventHandler
dispatch a = [SomeStoreAction store a]
