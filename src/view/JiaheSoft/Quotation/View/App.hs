{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings     #-}

module JiaheSoft.Quotation.View.App where

import           React.Flux

appView :: ReactView ()
appView = defineView "app" $ \_ ->
  p_ "The App"

app_ :: ReactElementM eventHandler ()
app_ = view appView () mempty
