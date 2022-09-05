import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../Store'

// Define a type for the slice state
interface volume {
    isMute: boolean
}

// Define the initial state using that type
const initialState: volume = {
  isMute: false,
}

export const videoVolumeSlice = createSlice({
  name: 'volume',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //Function to used to mute/unmute of reels video
    volume: (state) => {
      state.isMute = !state.isMute
    },
  },
})

export const { volume } = videoVolumeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectVolume = (state: RootState) => state.isMute.isMute

export default videoVolumeSlice.reducer