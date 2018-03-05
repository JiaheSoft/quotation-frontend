{-# LANGUAGE OverloadedStrings #-}

module JiaheSoft.Quotation.View.Login
  ( login_
  ) where

import           JiaheSoft.Quotation.View.Import

import qualified Control.Lens                    as Lens
import           Data.String                     (fromString)
import           Data.Text                       as Text
import           JiaheSoft.React.Common.Centered (centered_)
import qualified JiaheSoft.React.MaterialUI      as MUI

import           JiaheSoft.Quotation.Model.User  (User)
import qualified JiaheSoft.Quotation.Model.User  as User
import qualified JiaheSoft.Quotation.Store.Login as Login

loginView :: ReactView ()
loginView = defineControllerView "Login" Login.store $ \state () ->
  centered_ "" $ do
    let username = Lens.view Login.username state
    let password = Lens.view Login.password state
    form_ [] $ do
      MUI.textField_
        [ "label" $= "用户名"
        , "value" @= username
        , onChange handleUsernameChange
        ] mempty
      br_ []
      MUI.textField_
        [ "label" $= "密码"
        , "type" $= "password"
        , "value" @= password
        , onChange handlePasswordChange
        ] mempty
      br_ []
      MUI.inputLabel_
        [] "记住密码"
      let rememberPassword = Lens.view Login.rememberPassword state
      MUI.checkbox_
        [ "checked" @= rememberPassword
        , onChange handleRemPwdChange
        ]
    MUI.button_
      [ "variant" $= "raised"
      , "color" $= "primary"
      , onClick handleLogin
      ] "登录"

login_ :: ReactElementM eventHandler ()
login_ = view loginView () mempty

handleUsernameChange :: Event -> ViewEventHandler
handleUsernameChange event = Login.dispatch $
  Login.ChangeUsername newUsername
  where
  newUsername = target event "value"

handlePasswordChange :: Event -> ViewEventHandler
handlePasswordChange event = Login.dispatch $
  Login.ChangePassword newPassword
  where
  newPassword = target event "value"

handleRemPwdChange :: Event -> ViewEventHandler
handleRemPwdChange _ = Login.dispatch
  Login.ToggleRememberPassword

handleLogin :: Event -> MouseEvent -> ViewEventHandler
handleLogin _ _ = Login.dispatch Login.Login
