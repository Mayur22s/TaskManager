// src/store/store.js
import { applyMiddleware, createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

// Configure persistence
const persistConfig = {
    key: "root",           // Storage key
    storage: AsyncStorage, // Use AsyncStorage in React Native
    whitelist: ["taskReducer"],   // add reducers here 
}

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// Create store with persisted reducer
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

// Create persistor (controls rehydration)
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };