module JiaheSoft.Quotation.Model.AuthToken
  ( AuthToken(..)
  ) where

import           Data.String                      (IsString, fromString)
import           JiaheSoft.Quotation.Model.Import

newtype AuthToken = AuthToken
  { unAuthToken :: Text
  } deriving (Eq, Generic, NFData)

instance IsString AuthToken where
  fromString tokStr = AuthToken $ fromString tokStr

instance Show AuthToken where
  show = show . unAuthToken
