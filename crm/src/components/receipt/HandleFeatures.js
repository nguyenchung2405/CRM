import { Tooltip } from 'antd'
import React, { useState } from 'react'
import { FaFileExport } from 'react-icons/fa'
import { MdCancel, MdOutlineModeEditOutline } from 'react-icons/md'
import {IoCheckmarkDoneCircleSharp} from "react-icons/io5"
import { useSelector } from 'react-redux'
import ExportReceiptModal from './ExportReceiptModal'
import CancelReceiptModal from './CancelReceiptModal'

export default function HandleFeatures(props) {

    // const {setIsShowModal} = props;
    const [isExportReceipt, setIsExportReceipt] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowCancelModal, setIsShowCancelModal] = useState(false)
  
    // const {isSuccess} = useSelector(state => state.receiptReducer);

    const renderContent = ()=>{
        if(isExportReceipt){
            return <>
                <Tooltip title="Hủy hóa đơn" color="red" >
                    <MdCancel className="style__svg" style={{backgroundColor: "red"}} onClick={() => {
                        // setIsExportReceipt(false)
                        setIsShowCancelModal(true)
                        // navigate(`${uri}/crm/customer/update/${text.id}`)
                    }} />
                </Tooltip>
                <Tooltip title="Hoàn tất" color="blue" >
                    <IoCheckmarkDoneCircleSharp className="style__svg" style={{backgroundColor: "blue"}} onClick={() => {

                        // navigate(`${uri}/crm/customer/update/${text.id}`)
                    }} />
                </Tooltip>
            </>
        } else {
            return <Tooltip title="Xuất hóa đơn" color="orange" >
                <FaFileExport className="style__svg" style={{backgroundColor: "orange"}} onClick={() => {
                    setIsShowModal(true)
                    // navigate(`${uri}/crm/customer/update/${text.id}`)
                }} />
            </Tooltip>
        }
    }

  return (
      <>
      <ExportReceiptModal
      isShowModal={isShowModal}
      setIsShowModal={setIsShowModal}
      setIsExportReceipt={setIsExportReceipt}
    />
        <CancelReceiptModal
        isShowModal={isShowCancelModal}
        setIsShowModal={setIsShowCancelModal}
        setIsExportReceipt={setIsExportReceipt}
        />
        {renderContent()}
    </>
  )
}