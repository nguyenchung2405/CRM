import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "@redux-saga/core"
import rootSaga from "./rootSaga";
import customerSlice from "./features/customer.feature"
import loadingSlice from "./features/loadingSlice";
import messageSlice from "./features/messageSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        customerReducer: customerSlice,
        loadingReducer: loadingSlice,
        messageReducer: messageSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware)
    }
})

sagaMiddleware.run(rootSaga);