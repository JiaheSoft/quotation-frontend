module JiaheSoft.Quotation.Service.Login
  ( login
  , Credential
  , makeCredential
  , Result(..)
  ) where

import qualified Control.Lens                        as Lens
import           Control.Monad.Except
import           Data.Either                         (either)
import           JiaheSoft.Quotation.Model.AuthToken
import           JiaheSoft.Quotation.Service.Import
import           Servant.Client

import           JiaheSoft.Quotation.API.Login

login :: Credential -> ReaderT Config IO (Result AuthToken)
login cred = ReaderT $ \config -> do
  eitherResult <- runExceptT $ login' cred
    (Lens.view cfgManager config)
    (Lens.view cfgBaseUrl config)
  pure $ either
    (const (Failure "网络异常或其他未知错误"))
    (fmap unAuthToken')
    eitherResult

login' :: Credential -> Manager -> BaseUrl -> ClientM (Result AuthToken')
login' = client api
