import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";
import notificationSlice from "./notificationSlice";
import approvalWorkflowSlice from "./approvalWorkflowSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'approvalWorkflow', 'priceVisibility'] // Persist cart, approval workflow, and price visibility state
};

const rootReducer = combineReducers({
  cart: cartSlice,
  notifications: notificationSlice,
  approvalWorkflow: approvalWorkflowSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 
          'persist/REHYDRATE',
          'approvalWorkflow/setConnectionStatus',
          'approvalWorkflow/addRealTimeNotification'
        ]
      }
    }),
  // Enable DevTools only in development with safe environment detection
  devTools: (typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production') || 
            (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
});

export const persistor = persistStore(store);