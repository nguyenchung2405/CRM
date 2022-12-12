import { all, call } from "redux-saga/effects";
import customerMiddleware from "./middleware/customer.middleware";

export default function* rootSaga() {
    yield all([
        call(customerMiddleware)
    ])
}