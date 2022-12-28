import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "@redux-saga/core"
import rootSaga from "./rootSaga";
import customerSlice from "./features/customer.feature"
import loadingSlice from "./features/loadingSlice";
import messageSlice from "./features/messageSlice";
import contractSlice from "./features/contractSlice";
import productSlice from "./features/productSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        customerReducer: customerSlice,
        loadingReducer: loadingSlice,
        messageReducer: messageSlice,
        contractReducer: contractSlice,
        productReducer: productSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware)
    }
})

sagaMiddleware.run(rootSaga);