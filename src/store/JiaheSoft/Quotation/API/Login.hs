{-# LANGUAGE DataKinds     #-}
{-# LANGUAGE TypeOperators #-}

{-|
/ This module is intended to be imported qualified /
-}
module JiaheSoft.Quotation.API.Login
  ( API
  , api
  , Credential
  , name
  , password
  , makeCredential
  , Result(..)
  , AuthToken'(..)
  ) where

import           JiaheSoft.Quotation.API.Common
import           JiaheSoft.Quotation.API.Import
import           JiaheSoft.Quotation.Model.AuthToken

data Credential = Credential
  { name     :: Text
  , password :: Text
  } deriving (Show, Eq, Generic)

instance ToJSON Credential

{-|
  Construct a new credential value,
  from username and password
-}
makeCredential :: Text -- ^username
               -> Text -- ^password
               -> Credential
makeCredential = Credential

newtype AuthToken' = AuthToken'
  { unAuthToken' :: AuthToken
  }
instance FromJSON AuthToken' where
  parseJSON v = AuthToken' . AuthToken <$> (parseJSON v)

type API = "user" :> "login"
        :> ReqBody '[JSON] Credential
        :> Post '[JSON] (Result AuthToken')

api :: Proxy API
api = Proxy
