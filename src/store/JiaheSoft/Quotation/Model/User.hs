{-# LANGUAGE TemplateHaskell #-}

module JiaheSoft.Quotation.Model.User
  ( User
  , name
  , password
  ) where

import           Control.Lens (makeLenses)
import           Data.Text    (Text)

data User = User
  { _name     :: !Text
  , _password :: !Text
  } deriving (Show, Eq)

makeUser :: Text -- ^username
         -> Text -- ^password
         -> User -- ^the result
makeUser = User

makeLenses ''User
