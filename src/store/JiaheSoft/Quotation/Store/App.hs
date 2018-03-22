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

import qualified Control.Lens                      as Lens
import           Control.Monad.Reader
import           JiaheSoft.Async
import           JiaheSoft.Quotation.Model.User    (User)
import qualified JiaheSoft.Quotation.Model.User    as User
import qualified JiaheSoft.Quotation.Service       as Service
import qualified JiaheSoft.Quotation.Service.Login as LoginService
import qualified Network.HTTP.Client               as HTTP
import           Servant.Common.BaseUrl            (BaseUrl (..), Scheme (Http))
import           System.IO.Unsafe                  (unsafePerformIO)

data State = State
  { _user          :: Maybe User
  , _httpManager   :: HTTP.Manager
  , _serverBaseUrl :: BaseUrl
  } deriving Typeable

makeLenses ''State

data Action =
  {-|
    Login with username and password. The callback will
    be fired when login finishes, either succeed or fail.
  -}
    UserLogin Text Text (Either Text () -> IO ())
  -- | Logout
  | UserLogout
  -- | Change user info in this store directly
  | UpdateUser User
    deriving (Typeable, Generic, NFData)

instance StoreData State where
  type StoreAction State = Action
  transform UserLogout state = pure $ Lens.set user Nothing state
  transform (UserLogin username password onFinish) state = do
    let credential = LoginService.makeCredential username password
    let config = Service.mkConfig
                   (Lens.view httpManager state)
                   (Lens.view serverBaseUrl state)
                   Nothing
    void $ asyncWithCallback
      (runReaderT (LoginService.login credential) config)
      $ \result -> do
        case result of
          (LoginService.Success token) -> do
            alterStore store (UpdateUser $ User.makeUser username password (Just token))
            onFinish (Right ())
          (LoginService.Failure msg) -> do
            onFinish (Left msg)
    pure state
  transform (UpdateUser newUser) state = pure $ Lens.set user (Just newUser) state

{-# NOINLINE store #-}
store :: ReactStore State
store = unsafePerformIO $ do
  let httpSettings = HTTP.defaultManagerSettings { HTTP.managerResponseTimeout = Just 5000000 }
  theManager <- HTTP.newManager httpSettings
  let theBaseUrl = BaseUrl Http "47.93.31.73" 80 "api"
  pure . mkStore $ State Nothing theManager theBaseUrl

dispatch :: Action -> ViewEventHandler
dispatch a = [SomeStoreAction store a]
