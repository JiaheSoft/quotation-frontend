{-# LANGUAGE OverloadedStrings #-}

module JiaheSoft.Quotation.View.Login
  ( login_
  ) where

import           JiaheSoft.Quotation.View.Import

import qualified Control.Lens                    as Lens

import           JiaheSoft.Quotation.Model.User  (User)
import qualified JiaheSoft.Quotation.Model.User  as User
import qualified JiaheSoft.Quotation.Store.Login as Login

loginView :: ReactView ()
loginView = defineControllerView "Login" Login.store $ \store () ->
  form_ $ do
    label_ "用户名: "
    input_
      [ "type" $= "text"
      , "value" @= (Lens.view Login.username store)
      , onChange handleUsernameChange
      ]
    br_ []
    label_ "密码: "
    input_
      [ "type" $= "password"
      , "value" @= (Lens.view Login.password store)
      , onChange handlePasswordChange
      ]
    br_ []
    button_
      [ onClick handleLogin
      , "type" $= "button"
      ] "登录"

login_ :: ReactElementM eventHandler ()
login_ = view loginView () mempty

handleUsernameChange :: Event -> ViewEventHandler
handleUsernameChange event = Login.dispatch $
  Login.ChangeUsername newUsername
  where
  newUsername = eventTargetProp (evtTarget event) "value"

handlePasswordChange :: Event -> ViewEventHandler
handlePasswordChange event = Login.dispatch $
  Login.ChangePassword newPassword
  where
  newPassword = eventTargetProp (evtTarget event) "value"

handleLogin :: Event -> MouseEvent -> ViewEventHandler
handleLogin _ _ = Login.dispatch Login.Login
