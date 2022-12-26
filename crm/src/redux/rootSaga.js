import { all, call } from "redux-saga/effects";
import contractMiddleware from "./middleware/contract.middleware";
import customerMiddleware from "./middleware/customer.middleware";

export default function* rootSaga() {
    yield all([
        call(customerMiddleware),
        call(contractMiddleware)
    ])
}