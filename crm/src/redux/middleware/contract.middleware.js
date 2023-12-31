import { call, put, takeLatest } from "redux-saga/effects";
import {
  COMPLETED_CONTRACT,
  CREATE_CONTRACT,
  CREATE_CONTRACT_TYPE,
  CREATE_DETAIL,
  CREATE_PAYMENT,
  CREATE_REQUEST,
  CREATE_REQUEST_SUB_CONTRACT,
  CREATE_SUB_CONTRACT,
  DELETE_CONTRACT_TYPE,
  DELETE_DETAIL,
  DELETE_REQUEST,
  DELETE_REQUEST_SUB_CONTRACT,
  GET_CONTRACT_DETAIL,
  GET_CONTRACT_LIST,
  GET_CONTRACT_TYPE,
  GET_CONTRACT_TYPE_LIST,
  GET_DETAIL_SUB_CONTRACT,
  GET_SUB_CONTRACT_LIST,
  GET_OWNER_LIST,
  GET_REQUEST_OF_EVENT,
  IMPORT_FILE,
  IMPORT_FILE_SUB_CONTRACT,
  UPDATE_CONTRACT,
  UPDATE_CONTRACT_TYPE,
  UPDATE_DETAIL,
  UPDATE_PAYMENT,
  UPDATE_REQUEST,
  UPDATE_REQUEST_SUB_CONTRACT,
  UPDATE_SUB_CONTRACT,
} from "../../title/title";
import {
  dataOfContractMapping,
  dataOfEventMapping,
  dataOfPayment,
  dataOfSubContractMapping,
} from "../../untils/mapping";
import {
  completedContractAPI,
  createContractAPI,
  createContractTypeAPI,
  createDetailAPI,
  createPaymentAPI,
  createRequestAPI,
  createRequestSubContractAPI,
  createSubContractAPI,
  deleteContractTypeAPI,
  deleteDetailAPI,
  deleteRequestAPI,
  getContractDetailAPI,
  getContractListAPI,
  getContractRequestAPI,
  getContractTypeAPI,
  getContractTypeListAPI,
  getDetailSubContractAPI,
  getOwnerListAPI,
  getRequestOfEventAPI,
  getSubContractRequestAPI,
  importFileExcelAPI,
  importFileSubContractAPI,
  updateContractiAPI,
  updateContractTypeMiddlewareAPI,
  updateDetailAPI,
  updatePaymentAPI,
  updateRequestAPI,
  updateRequestSubContractAPI,
  updateSubContractAPI,
  uploadFileContractAPI,
  getSubContractListAPI,
} from "../API/contractAPI";
import {
  addContractRequest,
  addPayment,
  deleteContractRequest,
  removeContractType,
  removeRequestDetail,
  setContractDetail,
  setContractList,
  setContractRequest,
  setContractTypeList,
  setIsResetUpload,
  setOwnerList,
  setTotalContractType,
  updateContractRequest,
  updateContractType,
  updateRequestDetail,
  setSubContractList,
} from "../features/contractSlice";
import { setRequestOfEvent, setSelectRequest } from "../features/eventSlice";
import { setIsLoading } from "../features/loadingSlice";
import {
  addPaymentToReceiptList,
  updatePaymentToReceiptList,
} from "../features/receiptSlice";
import { message } from "antd";

function* getContractList(payload) {
  try {
    let { page, pageNumber, status, search } = payload.data;
    let result = yield call(
      getContractListAPI,
      page,
      pageNumber,
      status,
      search
    );
    let { total_data: total, contract: data } = result.data;
    yield put(setContractList({ total, contractList: data }));
    yield put(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
}
function* getSubContractList(payload) {
  try {
    let { page, pageNumber, status, search } = payload.data;
    let result = yield call(
      getSubContractListAPI,
      page,
      pageNumber,
      status,
      search
    );
    let { total_data: total, sub_contract: data } = result.data;
    yield put(setSubContractList({ total, subContractList: data }));
    yield put(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* getContractTypeList() {
  try {
    let result = yield call(getContractTypeListAPI);
    let { contract_type } = result.data;
    yield put(setContractTypeList(contract_type));
  } catch (error) {
    console.log(error);
  }
}

function* createContract(payload) {
  try {
    let { data } = payload;
    let filesUpload =
      data.contract.filesUpload && data.contract.filesUpload.length > 0
        ? data.contract.filesUpload
        : [];
    const uploadFiles = yield call(uploadFileContractAPI, filesUpload);
    if (uploadFiles.length > 0) {
      data.contract.files = uploadFiles.map((file) => file.path);
    }
    let result = yield call(createContractAPI, data);
    let { code } = result;
    if (+code === 200 || result.data?.contract?.id) {
      message.success("Tạo hợp đồng thành công.");
      yield put(setIsResetUpload(false));
    } else {
      message.error("Tạo hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* getContractDetail(payload) {
  try {
    if (payload?.contract_id) {
      let { contract_id } = payload;
      let result = yield call(getContractDetailAPI, contract_id);
      let { code, data } = result;
      let responseRequest = yield call(getContractRequestAPI, contract_id);
      if (+code === 200 || result.data.contract.length > 0) {
        let dataAfterMapping = dataOfContractMapping(result.data.contract[0]);
        dataAfterMapping.payments = dataOfPayment(
          result.data.contract[0].payments
        );
        yield put(setContractDetail(dataAfterMapping));
        yield put(setContractRequest(responseRequest.data.contract_request));
        yield put(
          setSelectRequest(dataAfterMapping.dataContract.event_detail_IDs)
        );
        yield put(setIsLoading(false));
      } else {
        yield put(setContractDetail({}));
      }
    } else if (
      payload?.data?.request_done === true ||
      payload?.data?.request_done === false
    ) {
      let { contract_id, request_done } = payload.data;
      let result = yield call(getContractDetailAPI, contract_id);
      let { code, data } = result;
      let responseRequest = yield call(
        getContractRequestAPI,
        contract_id,
        request_done
      );
      if (+code === 200 || result.data.contract.length > 0) {
        let dataAfterMapping = dataOfContractMapping(result.data.contract[0]);
        dataAfterMapping.payments = dataOfPayment(
          result.data.contract[0].payments
        );
        yield put(setContractDetail(dataAfterMapping));
        yield put(setContractRequest(responseRequest.data.contract_request));
        yield put(
          setSelectRequest(dataAfterMapping.dataContract.event_detail_IDs)
        );
        yield put(setIsLoading(false));
      } else {
        yield put(setContractDetail({}));
      }
    } else if (payload?.data?.status) {
      let { contract_id, status } = payload.data;
      let result = yield call(getContractDetailAPI, contract_id, status);
      let { code, data } = result;
      let responseRequest = yield call(getContractRequestAPI, contract_id);
      if (+code === 200 || data.contract.length > 0) {
        let dataAfterMapping = dataOfContractMapping(data.contract[0]);
        dataAfterMapping.payments = dataOfPayment(data.contract[0].payments);
        yield put(setContractDetail(dataAfterMapping));
        yield put(setContractRequest(responseRequest.data.contract_request));
        yield put(
          setSelectRequest(dataAfterMapping.dataContract.event_detail_IDs)
        );
        yield put(setIsLoading(false));
      } else {
        yield put(setContractDetail({}));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* getOwnerList(payload) {
  try {
    const result = yield call(getOwnerListAPI);
    if (result.data?.users?.length > 0) {
      yield put(setOwnerList(result.data.users));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateContract(payload) {
  try {
    let filesUpload =
      payload.data.filesUpload && payload.data.filesUpload.length > 0
        ? payload.data.filesUpload
        : [];
    const uploadFiles = yield call(uploadFileContractAPI, filesUpload);
    if (uploadFiles.length > 0) {
      if (payload.data.files?.length > 0 && payload.data.files !== null) {
        payload.data.files = uploadFiles
          .map((file) => file.path)
          .concat(payload.data.files);
      } else {
        payload.data.files = uploadFiles.map((file) => file.path);
      }
    }
    const result = yield call(updateContractiAPI, payload.data);
    if (result.data?.msg === "Updated successfully!") {
      message.success("Cập nhật hợp đồng thành công.");
      yield put({
        type: GET_CONTRACT_DETAIL,
        contract_id: payload.data.contract_id,
      });
      yield put(setIsResetUpload(false));
    } else {
      message.error("Cập nhật hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* createRequest(payload) {
  try {
    const result = yield call(createRequestAPI, payload.data);
    if (result.data?.requests?.length > 0) {
      yield put(addContractRequest(result.data.requests[0]));
      message.success("Tạo quyền lợi hợp đồng thành công.");
      yield put({
        type: GET_CONTRACT_DETAIL,
        contract_id: payload.data.contract_id,
      });
    } else if (result?.detail) {
      message.error(result.detail);
    } else {
      message.error("Tạo quyền lợi hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteRequest(payload) {
  try {
    const result = yield call(deleteRequestAPI, payload.data.request_id);
    if (result.data?.msg === "Vô hiệu yêu cầu hợp đồng thành công.") {
      yield put(deleteContractRequest(payload.data.request_id));
      message.success("Xóa quyền lợi hợp đồng thành công.");
      yield put({
        type: GET_CONTRACT_DETAIL,
        contract_id: payload.data.contract_id,
      });
    } else {
      message.error("Xóa quyền lợi hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateRequest(payload) {
  try {
    const result = yield call(updateRequestAPI, payload.data);
    if (result.data.msg === "Updated successfully!") {
      yield put(updateContractRequest(payload.data));
      message.success("Cập nhật quyền lợi hợp đồng thành công.");
      yield put({
        type: GET_CONTRACT_DETAIL,
        contract_id: payload.data.contract_id,
      });
    } else {
      message.error("Cập nhật quyền lợi hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* createDetail(payload) {
  try {
    const result = yield call(createDetailAPI, payload.data);
    if (result.data.details.length > 0) {
      yield put(
        updateRequestDetail({
          request_id: payload.data.request_id,
          detailData: result.data.details[0],
          detail_id_old: payload.data.id,
        })
      );
      message.success("Thêm chi tiết quyền lợi hợp đồng thành công.");
    } else {
      yield put(
        removeRequestDetail({
          request_id: payload.data.request_id,
          detail_id: payload.data.id,
        })
      );
      message.error(
        `Thêm chi tiết quyền lợi hợp đồng thất bại. Lý do: ${result.data.warning}`
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateDetail(payload) {
  try {
    const result = yield call(updateDetailAPI, payload.data);
    if (result.data?.msg === "Updated successfully!") {
      yield put(
        updateRequestDetail({
          request_id: payload.data.request_id,
          detailData: payload.data,
        })
      );
      message.success("Cập nhật chi tiết quyền lợi hợp đồng thành công.");
    } else {
      message.error("Cập nhật chi tiết quyền lợi hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteDetail(payload) {
  try {
    const result = yield call(deleteDetailAPI, payload.data.contract_detail_id);
    if (
      result?.data?.msg === "Vô hiệu chi tiết thực hiện hợp đồng thành công."
    ) {
      message.success("Xóa chi tiết quyền lợi hợp đồng thành công.");
      yield put(
        removeRequestDetail({
          request_id: payload.data.request_id,
          detail_id: payload.data.contract_detail_id,
        })
      );
    } else {
      message.error("Xóa chi tiết quyền lợi hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* createPayment(payload) {
  try {
    const result = yield call(createPaymentAPI, payload.data);
    if (result.data.payment.contract_ID) {
      let newPayment = {
        ...result.data.payment,
        total_value: result.data.payment.total_value * 1000000,
      };
      message.success("Thêm đợt thanh toán thành công.");
      yield put(addPayment(newPayment));
      yield put(
        addPaymentToReceiptList({
          contract_id: payload.data.contract_ID,
          data: {
            ...result.data.payment,
            receipts: [],
            total_value: result.data.payment.total_value,
          },
        })
      );
    } else {
      message.error("Thêm đợt thanh toán thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatePayment(payload) {
  try {
    const result = yield call(updatePaymentAPI, payload.data);
    if (result.data?.msg === "Updated successfully!") {
      message.success("Cập nhât thành công.");
      yield put(
        updatePaymentToReceiptList({
          contract_id: payload.data.contract_id,
          data: payload.data,
        })
      );
    } else {
      message.error("Cập nhât thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* getRequestOfEvent(payload) {
  try {
    const result = yield call(getRequestOfEventAPI, payload.event_id);
    let dataMapping = dataOfEventMapping(result.data.event_management[0]);
    yield put(setRequestOfEvent(dataMapping.requests));
  } catch (error) {
    console.log(error);
  }
}

function* importFileExcel(payload) {
  try {
    const result = yield call(importFileExcelAPI, payload.data);
    if (result.data?.data?.errors?.length > 0) {
      message.error("Nhập file thất bại.");
      result.data?.data?.errors.forEach((err) => {
        message.error(`Lỗi ở ${err.slice(0, 6).toLowerCase()}`);
      });
    } else {
      message.success("Nhập file thành công.");
      yield put({
        type: GET_CONTRACT_DETAIL,
        contract_id: payload.data.contract_id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getContractType(payload) {
  try {
    const result = yield call(getContractTypeAPI, payload.data);
    let { contract_type, total_data } = result.data;
    yield put(setContractTypeList(contract_type));
    yield put(setTotalContractType(total_data));
  } catch (error) {
    console.log(error);
  }
}

function* createContractType(payload) {
  try {
    const result = yield call(createContractTypeAPI, payload.data);
    if (result.data?.contract_type[0]?.id) {
      message.success("Tạo loại hợp đồng thành công.");
      yield put(
        updateContractType({
          contract_type_id: payload.data.id,
          data: result.data.contract_type[0],
        })
      );
    } else {
      message.error("Tạo loại hợp đồng thất bại.");
      yield put(removeContractType(payload.data.id));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateContractTypeMiddleware(payload) {
  try {
    const result = yield call(updateContractTypeMiddlewareAPI, payload.data);
    if (result.data?.msg === "Updated successfully!") {
      yield put(
        updateContractType({
          contract_type_id: payload.data.id,
          data: payload.data,
        })
      );
      message.success("Cập nhật hợp đồng thành công.");
    } else {
      message.error("Cập nhật hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteContractType(payload) {
  try {
    const result = yield call(deleteContractTypeAPI, payload.contract_type_id);
    if (result.data?.result && result.data?.data === "Xóa thành công") {
      message.success("Xóa loại hợp đồng thành công.");
      yield put(removeContractType(payload.contract_type_id));
    } else {
      message.error("Xóa loại hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* createSubContract(payload) {
  try {
    let { data } = payload;
    let filesUpload =
      data.contract.filesUpload && data.contract.filesUpload.length > 0
        ? data.contract.filesUpload
        : [];
    const uploadFiles = yield call(uploadFileContractAPI, filesUpload);
    if (uploadFiles.length > 0) {
      data.contract.files = uploadFiles.map((file) => file.path);
    }
    const result = yield call(createSubContractAPI, data);
    let { code } = result;
    if (+code === 200 || result.data?.sub_contract?.id) {
      message.success("Tạo hợp đồng thành công.");
    } else {
      message.error("Tạo hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* getDetailSubContract(payload) {
  try {
    if (payload?.data?.sub_contract_id) {
      let { sub_contract_id, contract_id } = payload.data;
      let result = yield call(getDetailSubContractAPI, sub_contract_id);
      let { code, data } = result;
      let responseRequest = yield call(
        getSubContractRequestAPI,
        contract_id,
        sub_contract_id
      );
      if (+code === 200 || data.sub_contract.length > 0) {
        let dataAfterMapping = dataOfSubContractMapping(data.sub_contract[0]);
        dataAfterMapping.payments = dataOfPayment(
          data.sub_contract[0].payments
        );
        yield put(setContractDetail(dataAfterMapping));
        yield put(setContractRequest(responseRequest.data.contract_request));
        yield put(
          setSelectRequest(dataAfterMapping.dataContract.event_detail_IDs)
        );
        yield put(setIsLoading(false));
      } else {
        yield put(setContractDetail({}));
      }
    } else if (
      payload?.data?.request_done === true ||
      payload?.data?.request_done === false
    ) {
      let { sub_contract_id, request_done, contract_id } = payload.data;
      let result = yield call(getContractDetailAPI, sub_contract_id);
      let { code, data } = result;
      let responseRequest = yield call(
        getContractRequestAPI,
        contract_id,
        sub_contract_id,
        request_done
      );
      if (+code === 200 || result.data.contract.length > 0) {
        let dataAfterMapping = dataOfContractMapping(result.data.contract[0]);
        dataAfterMapping.payments = dataOfPayment(
          result.data.contract[0].payments
        );
        yield put(setContractDetail(dataAfterMapping));
        yield put(setContractRequest(responseRequest.data.contract_request));
        yield put(
          setSelectRequest(dataAfterMapping.dataContract.event_detail_IDs)
        );
        yield put(setIsLoading(false));
      } else {
        yield put(setContractDetail({}));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* createRequestSubContract(payload) {
  try {
    const result = yield call(createRequestSubContractAPI, payload.data);
    if (result.data?.requests?.length > 0) {
      yield put(addContractRequest(result.data.requests[0]));
      message.success("Tạo quyền lợi hợp đồng thành công.");
      yield put({
        type: GET_DETAIL_SUB_CONTRACT,
        data: { sub_contract_id: payload.data.sub_contract_id },
      });
      yield put(setIsLoading(false));
    } else if (result?.detail) {
      message.error(result.detail);
      yield put(setIsLoading(false));
    } else {
      message.error("Tạo quyền lợi hợp đồng thất bại.");
      yield put(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateRequestSubContract(payload) {
  try {
    const result = yield call(updateRequestSubContractAPI, payload.data);
    if (result.data.msg === "Updated successfully!") {
      yield put(updateContractRequest(payload.data));
      message.success("Cập nhật quyền lợi hợp đồng thành công.");
      yield put({
        type: GET_DETAIL_SUB_CONTRACT,
        data: { sub_contract_id: payload.data.sub_contract_id },
      });
      yield put(setIsLoading(false));
    } else {
      message.error("Cập nhật quyền lợi hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateSubContract(payload) {
  try {
    let filesUpload =
      payload.data.filesUpload && payload.data.filesUpload.length > 0
        ? payload.data.filesUpload
        : [];
    const uploadFiles = yield call(uploadFileContractAPI, filesUpload);
    if (uploadFiles.length > 0) {
      if (payload.data.files?.length > 0 && payload.data.files !== null) {
        payload.data.files = uploadFiles
          .map((file) => file.path)
          .concat(payload.data.files);
      } else {
        payload.data.files = uploadFiles.map((file) => file.path);
      }
    }
    const result = yield call(updateSubContractAPI, payload.data);
    if (result.data?.msg === "Updated successfully!") {
      message.success("Cập nhật hợp đồng con thành công.");
      yield put({
        type: GET_DETAIL_SUB_CONTRACT,
        data: { sub_contract_id: payload.data.sub_contract_id },
      });
      yield put(setIsResetUpload(false));
    } else {
      message.error("Cập nhật hợp đồng con thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* importFileSubContract(payload) {
  try {
    const result = yield call(importFileSubContractAPI, payload.data);
    if (result.data?.data?.errors?.length > 0) {
      message.error("Nhập file thất bại.");
      result.data?.data?.errors.forEach((err) => {
        message.error(`Lỗi ở ${err.slice(0, 6).toLowerCase()}`);
      });
    } else {
      message.success("Nhập file thành công.");
      yield put({
        type: GET_DETAIL_SUB_CONTRACT,
        data: { sub_contract_id: payload.data.sub_contract_id },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteRequestSubContract(payload) {
  try {
    const result = yield call(deleteRequestAPI, payload.data.request_id);
    if (result.data?.msg === "Vô hiệu yêu cầu hợp đồng thành công.") {
      yield put(deleteContractRequest(payload.data.request_id));
      message.success("Xóa quyền lợi hợp đồng thành công.");
      yield put({
        type: GET_DETAIL_SUB_CONTRACT,
        data: { sub_contract_id: payload.data.sub_contract_id },
      });
    } else {
      message.error("Xóa quyền lợi hợp đồng thất bại.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* completedContract(payload) {
  try {
    const result = yield call(completedContractAPI, payload.data.contract_id);
    if (result.data?.result) {
      message.success("Thanh lý thành công");
      yield put({
        type: GET_CONTRACT_LIST,
        data: { page: payload.data.page, pageNumber: payload.data.pageNumber },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* contractMiddleware() {
  yield takeLatest(GET_CONTRACT_LIST, getContractList);
  yield takeLatest(GET_CONTRACT_TYPE_LIST, getContractTypeList);
  yield takeLatest(CREATE_CONTRACT, createContract);
  yield takeLatest(GET_CONTRACT_DETAIL, getContractDetail);
  yield takeLatest(GET_OWNER_LIST, getOwnerList);
  yield takeLatest(UPDATE_CONTRACT, updateContract);
  yield takeLatest(COMPLETED_CONTRACT, completedContract);
  // Request Middleware
  yield takeLatest(CREATE_REQUEST, createRequest);
  yield takeLatest(DELETE_REQUEST, deleteRequest);
  yield takeLatest(UPDATE_REQUEST, updateRequest);
  // Detail Middleware
  yield takeLatest(CREATE_DETAIL, createDetail);
  yield takeLatest(UPDATE_DETAIL, updateDetail);
  yield takeLatest(DELETE_DETAIL, deleteDetail);
  // Payment
  yield takeLatest(CREATE_PAYMENT, createPayment);
  yield takeLatest(UPDATE_PAYMENT, updatePayment);
  // Event
  // call API lấy quyền lợi chung về nếu loại HĐ là "Sự kịện"
  yield takeLatest(GET_REQUEST_OF_EVENT, getRequestOfEvent);
  // Import Export file Excel
  yield takeLatest(IMPORT_FILE, importFileExcel);
  yield takeLatest(IMPORT_FILE_SUB_CONTRACT, importFileSubContract);
  // Contract Type
  yield takeLatest(GET_CONTRACT_TYPE, getContractType);
  yield takeLatest(CREATE_CONTRACT_TYPE, createContractType);
  yield takeLatest(UPDATE_CONTRACT_TYPE, updateContractTypeMiddleware);
  yield takeLatest(DELETE_CONTRACT_TYPE, deleteContractType);
  // Sub Contract
  yield takeLatest(GET_SUB_CONTRACT_LIST, getSubContractList);
  yield takeLatest(CREATE_SUB_CONTRACT, createSubContract);
  yield takeLatest(GET_DETAIL_SUB_CONTRACT, getDetailSubContract);
  yield takeLatest(UPDATE_SUB_CONTRACT, updateSubContract);
  yield takeLatest(CREATE_REQUEST_SUB_CONTRACT, createRequestSubContract);
  yield takeLatest(UPDATE_REQUEST_SUB_CONTRACT, updateRequestSubContract);
  yield takeLatest(DELETE_REQUEST_SUB_CONTRACT, deleteRequestSubContract);
}
