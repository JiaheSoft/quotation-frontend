module JiaheSoft.Quotation.Service
  ( Config
  , mkConfig
  , cfgManager
  , cfgBaseUrl
  , cfgAuthToken
  , Service
  ) where

import qualified Control.Lens                        as Lens
import           Control.Monad.Reader
import           JiaheSoft.Quotation.API.Common      (Result)
import           JiaheSoft.Quotation.Import
import           JiaheSoft.Quotation.Model.AuthToken
import           Network.HTTP.Client
import           Servant.Client

type Service a = ReaderT Config ClientM (Result a)

data Config = Config
  { _cfgManager   :: Manager
  , _cfgBaseUrl   :: BaseUrl
  , _cfgAuthToken :: Maybe AuthToken
  }

Lens.makeLenses ''Config

mkConfig :: Manager
         -> BaseUrl
         -> Maybe AuthToken
         -> Config
mkConfig = Config
