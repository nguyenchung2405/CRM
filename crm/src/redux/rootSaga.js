import { all, call } from "redux-saga/effects";
import contractMiddleware from "./middleware/contract.middleware";
import customerMiddleware from "./middleware/customer.middleware";
import productMiddleware from "./middleware/product.middleware";
import groupChannelMiddleware from "./middleware/groupChannel.middleware";
import EventMiddleware from "./middleware/event.middleware";
import receiptMiddleware from "./middleware/receipt.middleware";
import acceptanceMiddleware from "./middleware/acceptance.middleware";

export default function* rootSaga() {
    yield all([
        call(customerMiddleware),
        call(contractMiddleware),
        call(productMiddleware),
        call(groupChannelMiddleware),
        call(EventMiddleware),
        call(receiptMiddleware),
        call(acceptanceMiddleware)
    ])
}