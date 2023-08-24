const axios = require("axios");
const { local } = require("../untils/title");

const createExportReceipt = async (req, res) => {
  try {
    let {
      headers: { authorization },
    } = req;
    const result = await axios({
      url: `${local}/payment/receipt/add`,
      method: "POST",
      headers: {
        Authorization: authorization,
      },
      data: req.body,
    });
    res.send(result.data);
  } catch (error) {
    if (error.response?.data) {
      res.send(error.response.data);
    } else {
      res.send(error);
    }
  }
};

const cancelExportReceipt = async (req, res) => {
  try {
    let {
      headers: { authorization },
    } = req;
    const result = await axios({
      url: `${local}/payment/receipt/disable`,
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
      data: req.body,
    });
    res.send(result.data);
  } catch (error) {
    if (error.response?.data) {
      res.send(error.response.data);
    } else {
      res.send(error);
    }
  }
};

const completeExportReceipt = async (req, res) => {
  try {
    let { receipt_id } = req.query;
    let {
      headers: { authorization },
    } = req;
    const result = await axios({
      url: `${local}/payment/receipt/update?receipt_ID=${receipt_id}`,
      method: "PUT",
      headers: {
        Authorization: authorization,
      },
      data: req.body,
    });
    res.send(result.data);
  } catch (error) {
    if (error.response?.data) {
      res.send(error.response.data);
    } else {
      res.send(error);
    }
  }
};

const getAcceptaneListByContractID = async (req, res) => {
  try {
    let {
      headers: { authorization },
    } = req;
    let { contract_id, is_event, has_payment, is_complete, sub_contract_id } =
      req.query;
    let result;
    if (is_event === "true") {
      result = await axios({
        url: `${local}/event/executive_event_detail/list?contract_ID=${contract_id}&is_complete=${is_complete}&has_payment=${has_payment}&page_size=100&page=1&sort_by=id&asc_order=true`,
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
    } else if (
      sub_contract_id === "undefined" ||
      sub_contract_id === undefined
    ) {
      result = await axios({
        url: `${local}/contract/detail/list?contract_id=${contract_id}&is_complete=${is_complete}&has_payment=${has_payment}&page_size=100&page=1&sort_by=id&asc_order=true`,
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
    } else {
      result = await axios({
        url: `${local}/contract/detail/list?contract_id=${contract_id}&is_complete=${is_complete}&has_payment=${has_payment}&sub_contract_ID=${sub_contract_id}&page_size=100&page=1&sort_by=id&asc_order=true`,
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
    }
    res.send(result.data);
  } catch (error) {
    if (error.response?.data) {
      res.send(error.response.data);
    } else {
      res.send(error);
    }
  }
};

const getPaymentList = async (req, res) => {
  try {
    let {
      headers: { authorization },
    } = req;
    let {
      page,
      page_size,
      completed,
      from_date,
      to_date,
      client_name,
      contract_number,
      note,
      payment_status,
    } = req.query;
    let queryParams = `page_size=${page_size}&page=${page}&sort_by=id&asc_order=false&completed=${completed}`;

    if (from_date) queryParams += `&from_date=${from_date}`;
    if (to_date) queryParams += `&to_date=${to_date}`;
    if (client_name) queryParams += `&client_name=${encodeURI(client_name)}`;
    if (contract_number)
      queryParams += `&contract_number=${encodeURI(contract_number)}`;
    if (note) queryParams += `&note=${encodeURI(note)}`;
    if (payment_status)
      queryParams += `&payment_status=${encodeURI(payment_status)}`;

    const result = await axios({
      url: `${local}/payment/list?&${queryParams}`,
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    // Ch%C6%B0a%20xu%E1%BA%A5t%20ho%C3%A1%20%C4%91%C6%A1n

    // Ch%C6%B0a%20xu%E1%BA%A5t%20h%C3%B3a%20%C4%91%C6%A1n
    // Ch%C6%B0a%20xu%E1%BA%A5t%20h%C3%B3a%20%C4%91%C6%A1n

    res.send(result.data);
  } catch (error) {
    if (error.response?.data) {
      res.send(error.response.data);
    } else {
      res.send(error);
    }
  }
};

const deletePayment = async (req, res) => {
  try {
    let {
      headers: { authorization },
    } = req;
    let { payment_id } = req.query;
    const result = await axios({
      url: `${local}/payment/disable?payment_id=${payment_id}`,
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
    });
    res.send(result.data);
  } catch (error) {
    if (error.response?.data) {
      res.send(error.response.data);
    } else {
      res.send(error);
    }
  }
};

module.exports = {
  createExportReceipt,
  cancelExportReceipt,
  completeExportReceipt,
  getAcceptaneListByContractID,
  getPaymentList,
  deletePayment,
};
