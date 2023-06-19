import { Modal, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { local, TOKEN } from '../../title/title';

export default function ModalPaymentInfor(props) {

    const { isShowModal, setIsShowModal, paymentID } = props;
    const {Column} = Table;
    const [data, setData] = useState();

    useEffect(()=>{
        if(paymentID && paymentID !== undefined && paymentID !== null && typeof paymentID === "number"){
            getDetailPayment(paymentID)
        }
    }, [paymentID])

    async function getDetailPayment(paymentID){
        try {
            const result = await axios({
                url: `${local}/api/contract/payment-infor?id=${paymentID}`,
                method: "GET",
                headers: {
                    Authorization: "Bearer " + TOKEN
                }
            });
            let dataOfTable = [];
            result.data.payment.forEach(payment => {
                let paymentArr = payment.detail_IDs.concat(payment.executive_event_IDs);
                dataOfTable = dataOfTable.concat(paymentArr)
            })
            setData(dataOfTable)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setIsShowModal(false)
    }

  return (
      <Modal
          title={<span>Thông tin thanh toán</span>}
          closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
          </svg>}
          footer={
              <div className="contract__service__footer">
                  <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
                      <span>Hủy</span>
                  </button>
              </div>
          }
          open={isShowModal}
          onCancel={handleCancel}
          className="payment__infor__modal"
      >
          <div className="create__contract content payment__infor__modal__content">
              <div className="modal__content create__contract__content">
                  <div className="create__contract__term border_bottom_3px">
                      <Table
                          className="term__table"
                          dataSource={data}
                          pagination={false}
                      >
                          <Column
                              title="STT"
                              render={((text, record, index) => {
                                  return index + 1
                              })} />
                          <Column
                              className="donGia"
                              title="Mô tả"
                              key="price"
                              dataIndex="desc"
                          />
                          <Column
                              className="quality"
                              title="Ngày đăng"
                              key="quality"
                              render={(text) => {
                                  if (text?.complete_date !== null) {
                                      let completeDate = moment(new Date(text?.from_date)).format("DD-MM-YYYY")
                                      return completeDate;
                                  } else {
                                      return null
                                  }
                              }}
                          />
                          <Column
                              className="item"
                              title="Ngày nghiệm thu nội bộ"
                              key="item"
                              render={(text) => {
                                  let exportDate = moment(new Date(text?.report_date)).format("DD-MM-YYYY")
                                  return exportDate
                              }}
                          />
                      </Table>
                  </div>
              </div>
          </div>
      </Modal>
  )
}