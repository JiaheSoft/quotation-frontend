module JiaheSoft.Async
  ( module Control.Concurrent.Async
  , asyncWithCallback
  ) where

import           Control.Concurrent.Async
import           Control.Monad.IO.Class

asyncWithCallback :: MonadIO m
                  => IO b -- ^ action to execute
                  -> (b -> IO c) -- ^ callback to handle result
                  -> m (Async c) -- ^ final result as an Async
asyncWithCallback f onFinish =
  liftIO . async $ f >>= onFinish
