import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [], // array of { id, title }
  selectedChatId: null,
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      // Replace entire chat list
      state.chats = action.payload;
    },
    addChat: (state, action) => {
      // Add a new chat
      state.chats.push(action.payload);
    },
    clearChats: (state) => {
      // Reset chats when user logs out / switches
      state.chats = [];
      state.selectedChatId = null;
    },
    selectChat: (state, action) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const { setChats, addChat, clearChats, selectChat } = chatSlice.actions;
export default chatSlice.reducer;
