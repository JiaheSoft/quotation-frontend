{-# LANGUAGE DeriveAnyClass  #-}
{-# LANGUAGE DeriveGeneric   #-}
{-# LANGUAGE TemplateHaskell #-}

module JiaheSoft.Quotation.Model.User
  ( User
  , makeUser
  , username
  , password
  , authToken
  ) where

import           JiaheSoft.Quotation.Model.AuthToken
import           JiaheSoft.Quotation.Model.Import

data User = User
  { _username  :: !Text
  , _password  :: !Text
  , _authToken :: Maybe AuthToken
  } deriving (Show, Eq, Typeable, Generic, NFData)

makeUser :: Text -- ^username
         -> Text -- ^password
         -> Maybe AuthToken
         -> User -- ^the result
makeUser = User

makeLenses ''User
