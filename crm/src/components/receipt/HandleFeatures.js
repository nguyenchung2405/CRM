import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaFileExport } from 'react-icons/fa'
import { MdCancel, MdDone, MdOutlineModeEditOutline } from 'react-icons/md'
import {IoCheckmarkDoneCircleSharp} from "react-icons/io5"
import { useSelector } from 'react-redux'
import ExportReceiptModal from './ExportReceiptModal'
import CancelReceiptModal from './CancelReceiptModal'
import CompleteReceiptModal from './CompleteReceiptModal'

export default function HandleFeatures(props) {

    const { payment_ID, isExistExport, receipt_id, contract_id, isComplete } = props;
    const [isExportReceipt, setIsExportReceipt] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowCancelModal, setIsShowCancelModal] = useState(false)
    const [isShowCompleteModal, setIsShowCompleteModal] = useState(false)
  
    // const {isSuccess} = useSelector(state => state.receiptReducer);

    useEffect(()=>{
        setIsExportReceipt(isExistExport)
    } , [isExistExport])

    const renderContent = ()=>{
        if(!isComplete){
            if(isExportReceipt){
                return <>
                    <Tooltip title="Hủy hóa đơn" color="red" >
                        <MdCancel className="style__svg" style={{backgroundColor: "red"}} onClick={() => {
                            setIsShowCancelModal(true)
                        }} />
                    </Tooltip>
                    <Tooltip title="Hoàn tất" color="blue" >
                        <IoCheckmarkDoneCircleSharp className="style__svg" style={{backgroundColor: "blue"}} onClick={() => {
                            setIsShowCompleteModal(true)
                        }} />
                    </Tooltip>
                </>
            } else {
                return <Tooltip title="Xuất hóa đơn" color="orange" >
                    <FaFileExport className="style__svg" style={{backgroundColor: "orange"}} onClick={() => {
                        setIsShowModal(true)
                    }} />
                </Tooltip>
            }
        } else {
            return <Tooltip title="Đã hoàn tất" color="green" >
                <MdDone style={{color: "green"}} />
            </Tooltip>
        }
    }

  return (
      <>
          <ExportReceiptModal
              isShowModal={isShowModal}
              setIsShowModal={setIsShowModal}
              payment_ID={payment_ID}
              contract_id={contract_id}
          />
          <CancelReceiptModal
              isShowModal={isShowCancelModal}
              setIsShowModal={setIsShowCancelModal}
              receipt_id={receipt_id}
              contract_id={contract_id}
              payment_ID={payment_ID}
          />
          <CompleteReceiptModal
              isShowModal={isShowCompleteModal}
              setIsShowModal={setIsShowCompleteModal}
              receipt_id={receipt_id}
              contract_id={contract_id}
              payment_ID={payment_ID}
          />
          {renderContent()}
      </>
  )
}