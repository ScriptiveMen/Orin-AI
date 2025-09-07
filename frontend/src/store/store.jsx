import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import chatSlice from "./slices/chatSlice";
import messageSlice from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    chats: chatSlice,
    messages: messageSlice,
  },
});
