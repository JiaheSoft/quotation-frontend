{-# LANGUAGE OverloadedStrings #-}

module JiaheSoft.Quotation.View.Login
  ( login_
  , LoginProps(..)
  ) where

import           JiaheSoft.Quotation.View.Import

import qualified Control.Lens                    as Lens

import           JiaheSoft.Quotation.Model.User  (User)
import qualified JiaheSoft.Quotation.Model.User  as User
import qualified JiaheSoft.Quotation.Store.Login as Login

data LoginProps = LoginProps
  { initialUser :: Maybe User
  } deriving (Show, Eq)

loginView :: ReactView LoginProps
loginView = defineControllerView "Login" Login.store $ \store props ->
  form_ $ do
    label_ "Username: "
    input_
      [ "type" $= "text"
      , "value" @= Lens.view Login.username store
      , onChange handleUsernameChange
      ]
    br_ []
    label_ "Password: "
    input_ [ "type" $= "password" ]
    br_ []

login_ :: LoginProps -> ReactElementM eventHandler ()
login_ props = view loginView props mempty

handleUsernameChange :: Event -> ViewEventHandler
handleUsernameChange event = Login.dispatch (Login.ChangeUsername "zelinf")
