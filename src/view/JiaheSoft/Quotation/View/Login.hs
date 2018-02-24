module JiaheSoft.Quotation.View.Login
  ( login_
  , LoginProps
  ) where

import           React.Flux

import           JiaheSoft.Quotation.Model.User

data LoginProps = LoginProps
  { initialUser :: User
  } deriving (Show, Eq)

loginView :: ReactView LoginProps
loginView = undefined

login_ :: ReactElementM eventHandler ()
login_ = undefined
