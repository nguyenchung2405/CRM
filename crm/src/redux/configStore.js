import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "@redux-saga/core"
import rootSaga from "./rootSaga";
import customerSlice from "./features/customer.feature"
import loadingSlice from "./features/loadingSlice";
import messageSlice from "./features/messageSlice";
import contractSlice from "./features/contractSlice";
import productSlice from "./features/productSlice";
import groupChannelSlice from "./features/groupChannelSlice";
import eventSlice from "./features/eventSlice";
import receiptSlice from "./features/receiptSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        customerReducer: customerSlice,
        loadingReducer: loadingSlice,
        messageReducer: messageSlice,
        contractReducer: contractSlice,
        productReducer: productSlice,
        groupChannelReducer: groupChannelSlice,
        eventReducer: eventSlice,
        receiptReducer: receiptSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware)
    }
})

sagaMiddleware.run(rootSaga);