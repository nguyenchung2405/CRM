import { Image, Modal, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FcImageFile } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { local, TOKEN } from '../../title/title';
import { checkMicroFe } from '../../untils/helper';
import ViewPDF from '../ViewPDF';
import {v4 as uuidv4} from "uuid"

export default function ModalPaymentInfor(props) {

    let uri_file = checkMicroFe() === true ?
        window.location.href.includes("dev") ?
            "https://crmservice-dev.tuoitre.vn/" : "https://crmservice-staging.tuoitre.vn/"
        : "http://localhost:3003/";

    const { isShowModal, setIsShowModal, paymentID } = props;
    const {Column} = Table;
    const [data, setData] = useState();
    const [imageVisible, setImageVisible] = useState(false);
    const [file, setFile] = useState("");

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
                          className="term__table evidence__table"
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
                          <Column
                              className="evidence"
                              title="Chứng minh"
                              key="evidence"
                              render={(text) => {
                                  if(text.completed_evidences.length > 0){
                                    // if(text.completed_evidences[0].includes("proxy") || text.completed_evidences.includes("resources")){
                                    //     return <FcImageFile className="file" onClick={() => {
                                    //         setFile(uri_file + text.completed_evidences)
                                    //         setImageVisible(true)
                                    //     }} />
                                    // } else {
                                    //     return <a 
                                    //         href={text.completed_evidences[0]}
                                    //         target="_blank"
                                    //         rel='noreferrer'
                                    //     >Link</a>
                                    // }
                                    return text.completed_evidences.map(evident => {
                                        if (evident.includes("proxy") || evident.includes("resources")) {
                                            return <FcImageFile key={uuidv4()} className="file" onClick={() => {
                                                setFile(uri_file + evident)
                                                setImageVisible(true)
                                            }} />
                                        } else {
                                            return <a
                                                key={uuidv4()}
                                                href={evident}
                                                target="_blank"
                                                rel='noreferrer'
                                            >Link</a>
                                        }
                                    })
                                  } else {
                                    return ""
                                  }
                              }}
                          />
                      </Table>
                  </div>
              </div>
          </div>
          <Image
              preview={{
                  visible: imageVisible,
                  src: file,
                  onVisibleChange: (value) => {
                      setImageVisible(value);
                  },
              }}
          />
      </Modal>
  )
}