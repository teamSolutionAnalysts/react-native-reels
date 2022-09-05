import { configureStore } from '@reduxjs/toolkit'
import cartCounterSlice from './Slices/cartCounterSlice'
import videoVolumeSlice from './Slices/videoVolumeSlice'
// ...

export const store = configureStore({
  reducer: {
    count: cartCounterSlice,
    isMute: videoVolumeSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch