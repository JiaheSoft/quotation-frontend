module JiaheSoft.Quotation.View.App
  ( appView
  ) where

import qualified Control.Lens                    as Lens
import           Data.Maybe                      (isNothing)

import qualified JiaheSoft.Quotation.Store.App   as App
import           JiaheSoft.Quotation.View.Import
import           JiaheSoft.Quotation.View.Login
-- import qualified JiaheSoft.React.MaterialUI      as MUI

appView :: ReactView ()
appView = defineControllerView "App" App.store $ \state () -> do
  let loginDialogOpen = isNothing $ Lens.view App.user state
  div_ $ do
    login_ loginDialogOpen
