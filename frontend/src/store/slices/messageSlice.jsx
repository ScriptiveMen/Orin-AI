import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload; // overwrite with fresh messages
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        message: action.payload,
        role: "user",
      });
    },
    addModelMessage: (state, action) => {
      state.messages.push({
        message: action.payload,
        role: "model",
      });
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addModelMessage, addUserMessage, clearMessages, setMessages } =
  messageSlice.actions;
export default messageSlice.reducer;
