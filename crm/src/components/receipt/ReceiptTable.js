import { DatePicker, Select, Table, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GET_PAYMENT_LIST } from "../../title/title";
import { checkMicroFe } from "../../untils/helper";
import CreateReceiptModal from "./CreateReceiptModal";
import HandleFeatures from "./HandleFeatures";

export default function ReceiptTable() {
  let uri = checkMicroFe() === true ? "/contract-service" : "";
  const { Column } = Table;
  const dispatch = useDispatch();
  const history = useHistory();
  const { total, recieptList } = useSelector((state) => state.receiptReducer);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  const [dataToCreateModal, setDataToCreateModal] = useState({});
  const [search, setSearch] = useState({
    client_name: "",
    contract_number: "",
    from_date: null,
    to_date: null,
    payment_status: null,
    note: "",
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: GET_PAYMENT_LIST,
      data: { page, pageNumber, completed: true },
    });
    // dispatch(setIsLoading(true))
  }, [dispatch, page, pageNumber]);

  useEffect(() => {
    let newArr = [...recieptList];
    setList(newArr);
  }, [recieptList]);
  const valueOfField = (name) => {
    if (name === "to_date" || name === "from_date") {
      if (search[name] !== null && search[name] !== undefined) {
        let newReportDate = moment(new Date(search[name])).format("DD-MM-YYYY");
        return moment(newReportDate, "DD-MM-YYYY");
      }
      return null;
    }
    if (search[name] && search[name] !== "" && search[name] !== undefined) {
      return search[name];
    } else {
      if (name === "completed_evidences" || name === "desc") {
        return "";
      }
      return null;
    }
  };
  const handleSubmitSearch = () => {
    dispatch({
      type: GET_PAYMENT_LIST,
      data: { page, pageNumber, completed: true, ...search },
    });
  };
  return (
    <div className="content reciept__table customer__table">
      <CreateReceiptModal
        isShowModal={isShowCreateModal}
        setIsShowModal={setIsShowCreateModal}
        dataToCreateModal={dataToCreateModal}
      />
      <div className="table__features">
        <div className="table__features__add">
          <h1>Quản lý hóa đơn</h1>
        </div>
        <div className="table__features__search">
          <input
            placeholder="Tên khách hàng"
            type="text"
            value={search.client_name}
            onChange={(value) => {
              setSearch({ ...search, client_name: value.target.value });
            }}
          />
          <input
            placeholder="Số hợp đồng"
            type="text"
            value={search.contract_number}
            onChange={(value) => {
              setSearch({ ...search, contract_number: value.target.value });
            }}
          />
          <input
            placeholder="Ghi chú"
            type="text"
            value={search.note}
            onChange={(value) => {
              setSearch({ ...search, note: value.target.value });
            }}
          />
          <DatePicker
            suffixIcon={
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.625 9H3.375C3.125 9 3 8.875 3 8.625V7.375C3 7.125 3.125 7 3.375 7H4.625C4.875 7 5 7.125 5 7.375V8.625C5 8.875 4.875 9 4.625 9ZM8 8.625C8 8.875 7.875 9 7.625 9H6.375C6.125 9 6 8.875 6 8.625V7.375C6 7.125 6.125 7 6.375 7H7.625C7.875 7 8 7.125 8 7.375V8.625ZM11 8.625C11 8.875 10.875 9 10.625 9H9.375C9.125 9 9 8.875 9 8.625V7.375C9 7.125 9.125 7 9.375 7H10.625C10.875 7 11 7.125 11 7.375V8.625ZM8 11.625C8 11.875 7.875 12 7.625 12H6.375C6.125 12 6 11.875 6 11.625V10.375C6 10.125 6.125 10 6.375 10H7.625C7.875 10 8 10.125 8 10.375V11.625ZM5 11.625C5 11.875 4.875 12 4.625 12H3.375C3.125 12 3 11.875 3 11.625V10.375C3 10.125 3.125 10 3.375 10H4.625C4.875 10 5 10.125 5 10.375V11.625ZM11 11.625C11 11.875 10.875 12 10.625 12H9.375C9.125 12 9 11.875 9 11.625V10.375C9 10.125 9.125 10 9.375 10H10.625C10.875 10 11 10.125 11 10.375V11.625ZM14 3.5V14.5C14 14.9167 13.8542 15.2708 13.5625 15.5625C13.2708 15.8542 12.9167 16 12.5 16H1.5C1.08333 16 0.729167 15.8542 0.4375 15.5625C0.145833 15.2708 0 14.9167 0 14.5V3.5C0 3.08333 0.145833 2.72917 0.4375 2.4375C0.729167 2.14583 1.08333 2 1.5 2H3V0.375C3 0.125 3.125 0 3.375 0H4.625C4.875 0 5 0.125 5 0.375V2H9V0.375C9 0.125 9.125 0 9.375 0H10.625C10.875 0 11 0.125 11 0.375V2H12.5C12.9167 2 13.2708 2.14583 13.5625 2.4375C13.8542 2.72917 14 3.08333 14 3.5ZM12.5 14.3125V5H1.5V14.3125C1.5 14.4375 1.5625 14.5 1.6875 14.5H12.3125C12.4375 14.5 12.5 14.4375 12.5 14.3125Z"
                  fill="#666666"
                  fillOpacity="0.6"
                />
              </svg>
            }
            className="style search__from__date"
            placeholder="Từ ngày"
            format={"DD-MM-YYYY"}
            onChange={(date, dateString) => {
              let from_date = moment(dateString, "DD-MM-YYYY").toISOString();

              setSearch({ ...search, from_date: from_date });
            }}
            value={valueOfField("from_date")}
          />
          <DatePicker
            suffixIcon={
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.625 9H3.375C3.125 9 3 8.875 3 8.625V7.375C3 7.125 3.125 7 3.375 7H4.625C4.875 7 5 7.125 5 7.375V8.625C5 8.875 4.875 9 4.625 9ZM8 8.625C8 8.875 7.875 9 7.625 9H6.375C6.125 9 6 8.875 6 8.625V7.375C6 7.125 6.125 7 6.375 7H7.625C7.875 7 8 7.125 8 7.375V8.625ZM11 8.625C11 8.875 10.875 9 10.625 9H9.375C9.125 9 9 8.875 9 8.625V7.375C9 7.125 9.125 7 9.375 7H10.625C10.875 7 11 7.125 11 7.375V8.625ZM8 11.625C8 11.875 7.875 12 7.625 12H6.375C6.125 12 6 11.875 6 11.625V10.375C6 10.125 6.125 10 6.375 10H7.625C7.875 10 8 10.125 8 10.375V11.625ZM5 11.625C5 11.875 4.875 12 4.625 12H3.375C3.125 12 3 11.875 3 11.625V10.375C3 10.125 3.125 10 3.375 10H4.625C4.875 10 5 10.125 5 10.375V11.625ZM11 11.625C11 11.875 10.875 12 10.625 12H9.375C9.125 12 9 11.875 9 11.625V10.375C9 10.125 9.125 10 9.375 10H10.625C10.875 10 11 10.125 11 10.375V11.625ZM14 3.5V14.5C14 14.9167 13.8542 15.2708 13.5625 15.5625C13.2708 15.8542 12.9167 16 12.5 16H1.5C1.08333 16 0.729167 15.8542 0.4375 15.5625C0.145833 15.2708 0 14.9167 0 14.5V3.5C0 3.08333 0.145833 2.72917 0.4375 2.4375C0.729167 2.14583 1.08333 2 1.5 2H3V0.375C3 0.125 3.125 0 3.375 0H4.625C4.875 0 5 0.125 5 0.375V2H9V0.375C9 0.125 9.125 0 9.375 0H10.625C10.875 0 11 0.125 11 0.375V2H12.5C12.9167 2 13.2708 2.14583 13.5625 2.4375C13.8542 2.72917 14 3.08333 14 3.5ZM12.5 14.3125V5H1.5V14.3125C1.5 14.4375 1.5625 14.5 1.6875 14.5H12.3125C12.4375 14.5 12.5 14.4375 12.5 14.3125Z"
                  fill="#666666"
                  fillOpacity="0.6"
                />
              </svg>
            }
            className="style search__to__date"
            placeholder="Đến ngày"
            format={"DD-MM-YYYY"}
            onChange={(date, dateString) => {
              let to_date = moment(dateString, "DD-MM-YYYY").toISOString();
              setSearch({ ...search, to_date: to_date });
            }}
            value={valueOfField("to_date")}
          />
          <Select
            className="search__select"
            placeholder="Trạng thái"
            allowClear
            onChange={(value) => {
              setSearch({ ...search, payment_status: value });
            }}
            value={search.payment_status}
          >
            {/* <Select.Option key="Đang chạy" value="Đang chạy">
              Đang chạy
            </Select.Option>
            <Select.Option key="Chưa chạy" value="Chưa chạy">
              Chưa chạy
            </Select.Option>
            <Select.Option
              key="Quá hạn nhưng chưa thanh lý"
              value="Quá hạn nhưng chưa thanh lý"
            >
              Quá hạn nhưng chưa thanh lý
            </Select.Option>
            <Select.Option key="Đã thanh lý" value="Đã thanh lý">
              Đã thanh lý
            </Select.Option> */}
            <Select.Option
              key="Chưa xuất hóa đơn"
              value="Ch%C6%B0a%20xu%E1%BA%A5t%20ho%C3%A1%20%C4%91%C6%A1n"
            >
              Chưa xuất hóa đơn
            </Select.Option>
            <Select.Option
              key="Đã xuất hóa đơn nhưng chưa thanh toán"
              value="%C4%90%C3%A3%20xu%E1%BA%A5t%20ho%C3%A1%20%C4%91%C6%A1n%20nh%C6%B0ng%20ch%C6%B0a%20thanh%20to%C3%A1n"
            >
              Đã xuất hóa đơn nhưng chưa thanh toán
            </Select.Option>
            <Select.Option key="Đã thanh toán" value="Đã thanh toán">
              Đã thanh toán
            </Select.Option>
          </Select>
          <div className="table__features__search__btn">
            <button onClick={handleSubmitSearch}>Tìm kiếm</button>
          </div>
        </div>
      </div>
      <Table
        dataSource={list}
        rowKey={(record) => record.id}
        pagination={{
          position: ["bottomLeft"],
          defaultPageSize: 10,
          locale: { items_per_page: "" },
          defaultCurrent: 1,
          showSizeChanger: true,
          total: total,
          pageSizeOptions: [10, 50, 100],
          onChange: (page, pageNumber) => {
            setPageNumber(pageNumber);
            setPage(page);
          },
          showTotal: (total) => {
            if (pageNumber * page < total) {
              return `Hiển thị ${pageNumber * page} trong ${total}`;
            }
            return `Hiển thị ${total} trong ${total}`;
          },
        }}
        scroll={{
          x: "max-content",
        }}
      >
        <Column
          className="receipt__table__report__date"
          title="Ngày quyết toán"
          key="eventName"
          fixed="left"
          render={(text) => {
            return moment(text.request_date).format("DD-MM-YYYY");
          }}
        ></Column>
        <Column
          className="receipt__table__value"
          title="Số tiền"
          key="eventName"
          fixed="left"
          render={(text) => {
            return new Intl.NumberFormat("vi-VN").format(
              text.total_value * 1000000
            );
          }}
        ></Column>
        <Column
          className="receipt__table__event__name"
          title="Tên sự kiên"
          key="eventName"
          render={(text) => {
            return text?.contract_info?.event_name;
          }}
        ></Column>
        <Column
          title="Tên khách hàng"
          key="clientName"
          render={(text) => text?.contract_info?.client_name}
        ></Column>
        <Column
          title="Số hợp đồng"
          key="soHopDong"
          render={(text) => {
            return (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`${uri}/crm/detail/${text?.contract_ID}`);
                }}
              >
                {text?.contract_info?.contract_number}
              </span>
            );
          }}
        ></Column>
        <Column
          title="Số đợt thanh toán"
          key="soDotThanhToan "
          render={(text) => text?.contract_info?.payment_count}
          sorter={(a, b) =>
            a.contract_info.payment_count - b.contract_info.payment_count
          }
          sortDirections={["ascend", "descend"]}
        ></Column>
        <Column
          title="Hình thức thanh toán"
          key="hinhThucThanhToan"
          render={(text) => {
            let soLanThanhToan = text?.contract_info?.payment_type;
            let kieuThanhToan = text?.contract_info?.pay_before_run
              ? "Trả trước"
              : "Trả sau";
            return `${soLanThanhToan} / ${kieuThanhToan}`;
          }}
        ></Column>
        <Column
          title="Số hóa đơn đã xuất"
          key="soHoaDonDaXuat"
          render={(text) => text?.contract_info?.receipt_count}
          sorter={(a, b) =>
            a.contract_info.receipt_count - b.contract_info.receipt_count
          }
        ></Column>
        <Column
          title="Số hóa đơn đã thanh toán"
          render={(text) => text?.contract_info?.completed_receipt_count}
          sorter={(a, b) =>
            a.contract_info.completed_receipt_count -
            b.contract_info.completed_receipt_count
          }
        ></Column>
        <Column
          title="Ngày xuất hóa đơn cuối"
          key="ngayXuatHDCuoi"
          render={(text) => {
            let last_receipt_exported =
              text?.contract_info?.last_receipt_exported;
            if (
              last_receipt_exported !== null &&
              last_receipt_exported !== undefined
            ) {
              let newDate = moment(last_receipt_exported).format("DD-MM-YYYY");
              return newDate;
            } else {
              return null;
            }
          }}
        ></Column>
        <Column
          title="Ghi chú"
          key="note"
          render={(text) => {
            if (text?.contract_info?.note?.length > 50) {
              return (
                <Tooltip title={text?.contract_info?.note}>
                  <span>{text?.contract_info?.note?.slice(0, 50) + "..."}</span>
                </Tooltip>
              );
            } else {
              return text?.contract_info?.note;
            }
          }}
        ></Column>
        <Column
          title="Giá trị đã thanh toán (triệu)"
          key="giaTriDaThanhToan"
          render={(text) => {
            let total = text?.contract_info?.total_include_VAT;
            let total_completed = text?.contract_info?.total_completed_payments;
            return `${total_completed.toString().replaceAll(".", ",")} / ${total
              .toString()
              .replaceAll(".", ",")}`;
          }}
        ></Column>
        <Column
          key="thaoTac"
          fixed="right"
          render={(text) => {
            let isExistExport = text?.receipts?.length > 0 ? true : false;
            let receipt_id = text?.receipts[0]?.id;
            let isComplete = text?.receipts[0]?.is_complete;
            return (
              <div className="table__thaotac">
                <HandleFeatures
                  isExistExport={isExistExport}
                  receipt_id={receipt_id}
                  isComplete={isComplete}
                  payment_ID={text.id}
                  contract_id={text.contract_ID}
                  data={text}
                  page={page}
                  pageNumber={pageNumber}
                />
              </div>
            );
          }}
        ></Column>
      </Table>
    </div>
  );
}
