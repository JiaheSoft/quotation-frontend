{-# LANGUAGE OverloadedStrings #-}

module JiaheSoft.React.Common.Centered
  ( centered_
  ) where

import           JiaheSoft.React.Import

centeredView :: ReactView Text
centeredView = defineView "Centered" $ \maxWidth ->
  div_
    [ style
        [ ("display", "table")
        , ("margin", "0px auto")
        , ("maxWidth", textToJSString maxWidth)
        ]
    ] childrenPassedToView

centered_ :: Text -- ^the max width
          -> ReactElementM ViewEventHandler a -- ^children
          -> ReactElementM ViewEventHandler a
centered_ = view centeredView
