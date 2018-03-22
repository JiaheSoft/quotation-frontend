module JiaheSoft.Quotation.API.Common
  ( Result(..)
  ) where

import           JiaheSoft.Quotation.API.Import

data Result a = Success a | Failure Text
  deriving (Show, Eq)

instance FromJSON a => FromJSON (Result a) where
  parseJSON = withObject "Response" $ \obj -> do
    succeed <- obj .: "succeed"
    if succeed
      then Success <$> obj .: "MsgCode"
      else Failure <$> obj .: "MsgCode"

instance Functor Result where
  fmap _ (Failure errMsg) = Failure errMsg
  fmap f (Success x)      = Success (f x)
