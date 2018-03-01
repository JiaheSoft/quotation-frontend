module JiaheSoft.Quotation.Model.Import
  ( module JiaheSoft.Quotation.Import
  , NFData
  , Typeable
  , Generic
  , makeLenses
  ) where

import           JiaheSoft.Quotation.Import

import           Control.DeepSeq            (NFData)
import           Control.Lens               (makeLenses)
import           Data.Typeable              (Typeable)
import           GHC.Generics               (Generic)
