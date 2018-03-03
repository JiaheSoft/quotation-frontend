{-# LANGUAGE OverloadedStrings #-}

module JiaheSoft.Quotation.View.Login
  ( login_
  ) where

import           JiaheSoft.Quotation.View.Import

import qualified Control.Lens                    as Lens
import qualified JiaheSoft.React.MaterialUI      as MUI

import           JiaheSoft.Quotation.Model.User  (User)
import qualified JiaheSoft.Quotation.Model.User  as User
import qualified JiaheSoft.Quotation.Store.Login as Login

loginView :: ReactView ()
loginView = defineControllerView "Login" Login.store $ \store () ->
  div_ $ do
    MUI.textField_
      [ "label" $= "用户名"
      ] mempty
    br_ []
    MUI.textField_
      [ "label" $= "密码"
      , "type" $= "password"
      ] mempty
    br_ []
    MUI.button_
      [ "variant" $= "raised"
      , "color" $= "primary"
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
