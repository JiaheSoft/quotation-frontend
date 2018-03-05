{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings     #-}

module JiaheSoft.Quotation.View.App
  ( appView
  ) where

import           JiaheSoft.Quotation.View.Import

import           JiaheSoft.Quotation.View.Login

appView :: ReactView ()
appView = defineView "App" $ \_ ->
  div_ $ do
    p_ "The App"
    login_

app_ :: ReactElementM eventHandler ()
app_ = view appView () mempty
