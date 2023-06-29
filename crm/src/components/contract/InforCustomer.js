import { Select } from 'antd';
import React from 'react'

export default function InforCustomer(props) {

    const {renderOption, handleChangeValue, valueOfField, setValueForm, valueForm, renderOptionOwner, valueOfCustomer, history} = props;

  return (
      <div className="create__contract__inforCustomer border_bottom_3px">
          <p>Thông tin khách hàng</p>
          <div className="field__input field__flex">
              <div className="infor__customer">
                  <div className="field__input_2">
                      <label>Tên khách hàng</label>
                      <Select
                          className="style"
                          showSearch
                          showArrow={false}
                          placeholder="Tên khách hàng"
                          filterOption={(input, option) =>
                              (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                          }
                          onChange={(value) => {
                              handleChangeValue("client_ID", +value)
                          }}
                          value={valueOfField("client_ID")}
                      >
                          {renderOption()}
                      </Select>
                      <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={()=>{
                            history.push("/crm/customer")
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
                  <div className="field__input two__field">
                      <div className="contract__field">
                          <input
                              className="style not__allow"
                              type="text"
                              disabled
                              value={valueOfCustomer("tax_number")}
                          />
                          <label>Mã số thuế</label>
                      </div>
                      <div className="contract__field">
                          <input
                              className="style not__allow"
                              type="text"
                              disabled
                              value={valueOfCustomer("phone")}
                          />
                          <label>Số điện thoại</label>
                      </div>
                  </div>
                  <div className="field__input two__field">
                      <div className="contract__field">
                          <input
                              className="style not__allow"
                              type="text"
                              disabled
                              value={valueOfCustomer("address")}
                          />
                          <label>Địa chỉ</label>
                      </div>
                      <div className="contract__field">
                          <input
                              className="style not__allow"
                              type="text"
                              disabled
                              value={valueOfCustomer("email")}
                          />
                          <label>Email</label>
                      </div>
                  </div>
                  <div className="field__input two__field">
                      <div className="contract__field">
                          <input
                              className="style not__allow"
                              type="text"
                              disabled
                              value={valueOfCustomer("daiDien")}
                          />
                          <label>Người đại diện và chức danh</label>
                      </div>
                      <div className="contract__field">
                          <input
                              className="style"
                              type="text"
                              disabled
                              value=""
                          // value={()=>{
                          //   if(customerInfor["representative"] && customerInfor["represent_position"]){
                          //     return customerInfor["representative"] + " - " + customerInfor["represent_position"]
                          //   } else {
                          //     return null;
                          //   }
                          // }}
                          />
                          <label>Người liên hệ và chức danh</label>
                      </div>
                  </div>
              </div>
              <div className="infor__owner">
                  <div className="field__input_2">
                      <label>Người đầu mối</label>
                      <Select
                          className="style"
                          showSearch
                          showArrow={false}
                          placeholder="Người đầu mối"
                          filterOption={(input, option) =>
                              (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                          }
                          onChange={(value, option) => {
                              setValueForm({
                                  ...valueForm,
                                  owner: +value,
                                  owner_name: option.children
                              })
                          }}
                          value={valueOfField("owner")}
                      >
                          {renderOptionOwner()}
                      </Select>
                  </div>
              </div>
          </div>

      </div>
  )
}
