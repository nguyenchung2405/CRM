import { DatePicker } from 'antd'
import moment from 'moment';
import React from 'react'

export default function CreateDetail(props) {

    const {handleChangeValue, valueOfField} = props;

  return (
      <>
          <div className="modal__field field__select">
              <div>
                  <label className="term__label">Ngày đăng</label>
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
                      className="style report__date"
                      format={"DD-MM-YYYY"}
                      onChange={(date, dateString) => {
                          let ngayDangChiTiet = moment(dateString, "DD-MM-YYYY").toISOString();
                          handleChangeValue("from_date", ngayDangChiTiet)
                      }}
                      value={valueOfField("from_date")}
                  />
              </div>
          </div>
          <div className="modal__field field__select detail__desc">
              <div className="display__block">
                  <label className="term__label">Mô tả</label>
                  <input type="text"
                      name="desc"
                      value={valueOfField("desc")}
                      onChange={(e)=>{
                        let {name, value} = e.target;
                        handleChangeValue(name, value);
                      }}
                  />
              </div>
          </div>
          <div className="modal__field field__select">
              <input type="file" 
                  onChange={e => {
                      let file = e.target.files[0];
                      handleChangeValue("fileDetail", file);
                  }}
              />
          </div>
      </>
  )
}