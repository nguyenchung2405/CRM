import moment from 'moment';
import React, { useState } from 'react'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import ModalPaymentInfor from './ModalPaymentInfor';

export default function ContractPayment(props) {

    const {dotThanhToan, valueOfField, setValueForm, valueForm} = props;
    const [isExpand, setIsExpand] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false);
    const [paymentID, setPaymentID] = useState();

    const showPayment = () => {
        return dotThanhToan?.map((payment, index) => {
            let convertDate = moment(new Date(payment.request_date)).format("DD-MM-YYYY");
            let isComplete = payment?.receipts[0]?.is_complete;
            let isExistExport = payment.receipts.length > 0 ? true : false;
            let statusOfPayment;
            if (!isComplete) {
                if (isExistExport) {
                    statusOfPayment = "Đã xuất hóa đơn"
                } else {
                    statusOfPayment = "Chưa xuất hóa đơn"
                }
            } else {
                statusOfPayment = "Đã thanh toán"
            }
            return <div key={payment.id} className="payment__contract " onClick={()=>{ setIsShowModal(true); setPaymentID(payment.id) }}>
                <span>Đợt thanh toán {index + 1}</span>
                <span>{convertDate}</span>
                <span>{new Intl.NumberFormat("vi-VN").format(payment.total_value)} VNĐ</span>
                <span>{statusOfPayment}</span>
            </div>
        })
    }

    const showIconExpand = ()=>{
        if(dotThanhToan?.length > 5){
            if(isExpand){
                return <MdOutlineExpandLess onClick={() => { setIsExpand(false) }} />
            } else {
                return <MdOutlineExpandMore onClick={() => { setIsExpand(true) }} />
            }
        }
    }

    const setClassName = ()=>{
        if(dotThanhToan?.length > 5){
            if(isExpand){
                return "contract__payment__process expand__payment__more"
            } else {
                return "contract__payment__process expand__payment__less"
            }
        } else {
            return "contract__payment__process"
        }
    }

  return (
      <div className="create__contract__payment border_bottom_3px">
          <div className="display__flex contract__payment">
              <div className="display__flex">
                  <p>Đợt thanh toán</p>
              </div>
              <div className="display__flex soDotThanhToan">
                  <label htmlFor="soDotThanhToan">Kiểu thanh toán:</label>
                  <select name="soDotThanhToan" id="soDotThanhToan" value={valueOfField("pay_before_run")} onChange={(e) => { console.log(e.target.value, typeof e.target.value); setValueForm({ ...valueForm, pay_before_run: e.target.value }) }}>
                      <option value={true}>Trước thực hiện</option>
                      <option value={false}>Sau thực hiện</option>
                  </select>
              </div>
              <div className="display__flex soDotThanhToan">
                  <label htmlFor="soDotThanhToan">Số đợt thanh toán:</label>
                  <select name="soDotThanhToan" id="soDotThanhToan" value={valueOfField("payment_type")} onChange={(e) => { setValueForm({ ...valueForm, payment_type: e.target.value }) }}>
                      <option value="Một đợt">1 đợt</option>
                      <option value="Nhiều đợt">Nhiều đợt</option>
                      <option value="Theo tháng">Theo thàng</option>
                      <option value="Theo yêu cầu hợp đồng">Theo quyền lợi</option>
                  </select>
              </div>
          </div>
          <div className={setClassName()}>
              {showPayment()}
          </div>
          <div className="expand__more">
            { showIconExpand() }
          </div>
          <ModalPaymentInfor
              isShowModal={isShowModal}
              setIsShowModal={setIsShowModal}
              paymentID={paymentID}
          />
      </div>
  )
}