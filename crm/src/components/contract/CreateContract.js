import { DatePicker, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CUSTOMER_LIST } from "../../title/title";
import TermModal from "../modal/contract/Term";

export default function CreateContract() {
  
  const { Column } = Table;
  const { Option } = Select;
  const dispatch = useDispatch();
  const {customerList} = useSelector(state => state.customerReducer);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataTable, setDataTable] = useState([{
    sanPham: "ĐẶC San (02/09/2022)",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque porro earum deleniti quam a eveniet magnam praesentium sint explicabo molestiae debitis modi culpa laborum, animi aut quod sunt numquam repellat.",
    dateUp: "01/02/2022 - 01/02/2022",
    price: "900,000",
  },]);

  useEffect(()=>{
    dispatch({
      type: GET_CUSTOMER_LIST
    });
  }, []);

  const renderOption = () => {
    return customerList?.map((customer, index) => {
      return <Option key={customer.id}>{customer.name}</Option>;
    });
  };

  return (
    <div className="create__contract content">
      <div className="create__contract__content">
        <div className="create__contract__header border_bottom_3px">
          <h2>Tạo hợp đồng</h2>
        </div>
        <div className="create__contract__inforCustomer border_bottom_3px">
          <p>Thông tin khách hàng</p>
          <div className="field__input field__flex">
            <div>
              <Select
                className="style"
                showSearch
                showArrow={false}
                placeholder="Tên khách hàng"
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {renderOption()}
              </Select>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 7.32739V14.6537"
                  stroke="#35794A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6667 10.9904H7.33337"
                  stroke="#35794A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                  stroke="#35794A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              className="style"
              placeholder="Người phụ trách"
              type="text"
            />
          </div>
          <div className="field__input field__flex">
            <input
              className="style margin_right_54"
              placeholder="Số hợp đồng"
              type="text"
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
              className="style"
              placeholder="Thời gian thưc hiện"
            />
          </div>
        </div>
        <div className="create__contract__contactInfor border_bottom_3px">
          <div className="display__flex">
            <p>Thông tin liên hệ</p>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 7.32739V14.6537"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 10.9904H7.33337"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="field__input_3">
            <input className="style" placeholder="Người liên hệ" type="text" />
            <input className="style" placeholder="Email" type="text" />
            <input className="style" placeholder="Số điện thoại" type="text" />
          </div>
          <div className="field__input">
            <input type="text" placeholder="Địa chỉ" className="style" />
          </div>
        </div>
        <div className="create__contract__value border_bottom_3px">
          <p>Giá trị hợp đồng</p>
          <div className="field__input_2">
            <input
              className="style margin_right_54"
              placeholder="Loại hợp đồng"
              type="text"
            />
            <input className="style" placeholder="Năm" type="text" />
          </div>
          <div className="field__input_3">
            <input className="style" placeholder="Chiết khấu (%)" type="text" />
            <input className="style" placeholder="Thuế GTGT(%)" type="text" />
            <input
              className="style"
              placeholder="Giá trị hợp đồng"
              type="text"
            />
          </div>
          <textarea name="" id="note" placeholder="Ghi chú"></textarea>
        </div>
        <div className="create__contract__payment border_bottom_3px">
          <div className="display__flex">
            <p>Đợt thanh toán</p>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 7.32739V14.6537"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 10.9904H7.33337"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="field__input_2">
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
              className="style"
              placeholder="Ngày thanh toán"
            />
            <input className="style" type="text" placeholder="Số tiền" />
          </div>
          <div className="contract__payment__process">
            <div className="payment__contract">
              <span>Đợt thanh toán 1</span>
              <span>01/02/2023</span>
              <span>100,000 VNĐ</span>
            </div>
            <div className="payment__contract">
              <span>Đợt thanh toán 2</span>
              <span>01/03/2023</span>
              <span>1,000,000,000 VNĐ</span>
            </div>
          </div>
        </div>
        <div className="create__contract__term border_bottom_3px">
          <div className="display__flex">
            <p>Hạn mục thực hiện</p>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setIsShowModal(true);
              }}
            >
              <path
                d="M11 7.32739V14.6537"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 10.9904H7.33337"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Table dataSource={dataTable} pagination={false}>
            <Column
              className="item"
              title="Sản phẩm"
              key="item"
              dataIndex="sanPham"
            />
            <Column
              className="content"
              title="Nội dung"
              key="content"
              dataIndex="content"
            />
            <Column
              className="dateUp"
              title="Ngày đăng"
              key="dateUp"
              dataIndex="dateUp"
            />
            <Column
              className="price"
              title="Giá tiền"
              key="price"
              render={(text) => {
                return `${text.price} VNĐ`;
              }}
            />
            <Column
              className="thaoTac"
              render={() => {
                return <button>Xóa</button>;
              }}
            />
          </Table>
          <TermModal
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
          />
        </div>
        <div className="create__contract__footer">
          <button className="footer__btn btn__delete">Xóa</button>
          <button className="footer__btn btn__review">Xem lại</button>
          <button className="footer__btn btn__create">Tạo</button>
        </div>
      </div>
    </div>
  );
}
