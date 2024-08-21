import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

import storage from "redux-persist/lib/storage"; // Use the storage engine you prefer
// Define the persistence configuration
const persistConfig = {
  key: "root", // Key to store your data in local storage
  storage, // Storage engine to use
};
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  //middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Create the persisted store
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
