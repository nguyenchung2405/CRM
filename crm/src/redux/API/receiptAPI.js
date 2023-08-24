import moment from "moment";
import { local } from "../../title/title";
import { AxiosExpress } from "../../untils/axios";

export async function createExportReceiptAPI(data) {
  try {
    let newData = {
      ...data,
      export_date: moment(new Date(data.export_date)).format("YYYY-MM-DD"),
    };
    const result = await AxiosExpress({
      url: `${local}/api/receipt/create`,
      method: "POST",
      data: newData,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return "Thât bại";
  }
}

export async function cancelExportReceiptAPI(data) {
  try {
    const result = await AxiosExpress({
      url: `${local}/api/receipt/cancel`,
      method: "DELETE",
      data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return "Thât bại";
  }
}

export async function completeExportReceiptAPI(data) {
  try {
    let newData = {
      ...data,
      complete_date: moment(new Date(data.complete_date)).format("YYYY-MM-DD"),
    };
    const result = await AxiosExpress({
      url: `${local}/api/receipt/complete?receipt_id=${data.receipt_id}`,
      method: "PUT",
      data: newData,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return "Thât bại";
  }
}

export async function getAcceptaneListByContractAPI(
  contract_id,
  has_payment,
  is_complete,
  is_event,
  sub_contract_id
) {
  try {
    if (sub_contract_id && sub_contract_id !== undefined) {
      const result = await AxiosExpress({
        url: `${local}/api/receipt/acc-list?contract_id=${contract_id}&is_event=${is_event}&has_payment=${has_payment}&is_complete=${is_complete}&sub_contract_id=${sub_contract_id}`,
        method: "GET",
      });
      return result.data;
    } else {
      const result = await AxiosExpress({
        url: `${local}/api/receipt/acc-list?contract_id=${contract_id}&is_event=${is_event}&has_payment=${has_payment}&is_complete=${is_complete}`,
        method: "GET",
      });
      return result.data;
    }
  } catch (error) {
    console.log(error);
    return "Thât bại";
  }
}

export async function getPaymentListAPI(
  page,
  pageNumber,
  completed,
  from_date,
  to_date,
  client_name,
  contract_number,
  note,
  payment_status
) {
  try {
    let queryParams = `page=${page}&page_size=${pageNumber}&completed=${completed}`;

    if (from_date)
      queryParams += `&from_date=${moment(from_date).format("YYYY-MM-DD")}`;
    if (to_date)
      queryParams += `&to_date=${moment(to_date).format("YYYY-MM-DD")}`;
    if (client_name) queryParams += `&client_name=${client_name}`;
    if (contract_number) queryParams += `&contract_number=${contract_number}`;
    if (note) queryParams += `&note=${note}`;
    if (payment_status) queryParams += `&payment_status=${payment_status}`;
    const result = await AxiosExpress({
      url: `${local}/api/receipt/get-payment-list?${queryParams}`,
      method: "GET",
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return "Thât bại";
  }
}

export async function deletePaymentAPI(data) {
  try {
    // console.log(data)
    const result = await AxiosExpress({
      url: `${local}/api/receipt/delete-payment?payment_id=${data}`,
      method: "DELETE",
      data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return "Fail";
  }
}
