import { message, Modal, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createAcceptanceAPI, createDetailInAcceptanceAPI, createDetailInEventAcceptanceAPI, createEventAcceptanceAPI } from '../../redux/API/acceptanceAPI';
import { setAcceptanceJustCreated } from '../../redux/features/acceptanceSlice';
import { CREATE_ACCEPTANCE, CREATE_EVENT_ACCEPTANCE } from '../../title/title';
import ContractContentModal from './ContractContentModal';
import EventContentModal from './EventContentModal';

export default function ReportModal(props) {
  
    const {isShowModal, setIsShowModal, eventMode, list, setList} = props; 
    const dispatch = useDispatch();
    const [valueRadio, setValueRadio] = useState(false)
    const [valueForm, setValueForm] = useState({});
    const [contracts, setContracts] = useState([]);
    const [isReset, setIsReset] = useState(false)

    useEffect(()=>{
        if(eventMode){
            setValueRadio(true)
        }
    }, [eventMode])
    
    const handleCancel = ()=>{
        setIsShowModal(false)
        setValueForm({});
        setIsReset(true)
        setContracts([])
    }

    const handleOk = async ()=>{
        if(!valueRadio){
            // console.log("tạo acc cho hđ")
            handleCreateAcc(valueForm)
        } else {
            valueForm.contract_IDs = contracts
            // console.log("tạo acc cho event")
            handleCreateAccOfEvent(valueForm)
        }
        setIsShowModal(false)
        setValueForm({});
        setIsReset(true)
        setContracts([])
    }

    const handleChangeRadio = (e)=>{
        let {value} = e.target;
        setValueRadio(value)
    }

    async function handleCreateAcc(data){
        try {
            if (data.detail_id && data.detail_id !== null) {
                const result = await createAcceptanceAPI(valueForm)
                // console.log("line 55", result)
                if (result.data.msg === "Updated successfully!") {
                    message.success("Tạo nghiệm thu thành công")
                    dispatch(setAcceptanceJustCreated({request_id: data.request_id, data: result.data.contract_detail, detail_id: result.data.contract_detail.id}))
                } else {
                    message.error("Tạo nghiệm thu thất bại")
                }
            } else {
                const resultDetail = await createDetailInAcceptanceAPI(valueForm);
                // console.log("line 64", resultDetail)
                let detail_id = resultDetail.data.details[0].id;
                let newDataAcceptance = {
                    ...resultDetail.data.details[0],
                    detail_id,
                    files: valueForm.files,
                    completed_evidences: valueForm.completed_evidences,
                    // report_date: valueForm.report_date
                }
                const result = await createAcceptanceAPI(newDataAcceptance);
                // console.log("line 73", result)
                if (result.data.msg === "Updated successfully!") {
                    message.success("Tạo nghiệm thu thành công")
                    dispatch(setAcceptanceJustCreated({request_id: data.request_id, data: result.data.contract_detail}))
                } else {
                    message.error("Tạo nghiệm thu thất bại")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCreateAccOfEvent(valueForm){
        try {
            const resultDetail = await createDetailInEventAcceptanceAPI(valueForm);
            if(resultDetail?.detail){
                message.error(resultDetail?.detail)
            } else {
                let newDataAcceptance = {
                    ...resultDetail.data?.event_executive_detail,
                    files: valueForm.files,
                    completed_evidences: valueForm.completed_evidences,
                    contract_IDs: valueForm.contract_IDs,
                    detail_id: resultDetail.data?.event_executive_detail.id,
                    // report_date: valueForm.report_date
                };
                const result = await createEventAcceptanceAPI(newDataAcceptance);
                if(result.data?.msg === "Updated successfully!"){
                    dispatch(setAcceptanceJustCreated({data: result.data.executive_detail, detail_id: result.data.executive_detail.event_detail_ID}))
                    message.success("Tạo nghiệm thu thành công")
                } else {
                    message.error("Tạo nghiệm thu thất bại")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            title={<span>Xác nhận thực hiện chi tiết</span>}
            closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
            </svg>}
            footer={
                <div className="contract__service__footer">
                    <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
                        <span>Hủy</span>
                    </button>
                    <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOk} >
                        <span>Thêm</span>
                    </button>
                </div>
            }
            open={isShowModal}
            onCancel={handleCancel}
        >
            { /*
<Radio.Group
                onChange={handleChangeRadio}
                value={valueRadio}
            >
                <Radio value={false}>Hợp đồng</Radio>
                <Radio value={true}>Sự kiện</Radio>
            </Radio.Group>
        */}
            <div className="modal__report__content modal__content">
                {
                    !valueRadio
                        ?
                        <ContractContentModal
                            valueForm={valueForm}
                            setValueForm={setValueForm}
                            isReset={isReset}
                            setIsReset={setIsReset}
                        />
                        :
                        <EventContentModal
                            valueForm={valueForm}
                            setValueForm={setValueForm}
                            contracts={contracts}
                            setContracts={setContracts}
                        />
                }
            </div>
        </Modal>
  )
}
