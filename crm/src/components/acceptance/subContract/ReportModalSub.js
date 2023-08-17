import React, { useEffect, useState } from 'react'
import { message, Modal, Select, Tooltip } from 'antd'
import { GET_CONTRACT_LIST, GET_DETAIL_SUB_CONTRACT } from '../../../title/title';
import { useDispatch, useSelector } from 'react-redux';
import { FcPlus } from 'react-icons/fc';
import CreateDetail from '../CreateDetail';
import {AiFillMinusCircle} from "react-icons/ai"
import moment from 'moment';
import { getSubContractOfMomContract } from '../../../redux/API/contractAPI';
import { createAcceptanceAPI, createDetailInAcceptanceAPI} from '../../../redux/API/acceptanceAPI';
import { setAcceptanceJustCreated } from '../../../redux/features/acceptanceSlice';

export default function ReportModalSub(props) {
    
    const { isShowModal, setIsShowModal} = props;
    const dispatch = useDispatch();
    const {Option} = Select;
    const { contractList, contractRequest } = useSelector(state => state.contractReducer);
    const [detailList, setDetailList] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [isCreateDetail, setIsCreateDetail] = useState(false);
    const [valueForm, setValueForm] = useState({});
    const [subContractList, setSubContractList] = useState([]);
    
    useEffect(() => {
        dispatch({
            type: GET_CONTRACT_LIST,
            data: { page:1, pageNumber: 1000, status: "Đang chạy" }
        })
    }, [dispatch]);

    // useEffect(()=>{
    //     if(isReset){
    //         setIsCreateDetail(false)
    //         setIsReset(false)
    //     }
    // }, [isReset])

    const handleCancel = ()=>{
        setIsShowModal(false)
        setValueForm({});
        // setIsReset(true)
        // setContracts([])
    }

    const handleOk = async () => {
        handleCreateAcc(valueForm)
        setIsShowModal(false)
        setValueForm({});
        // setIsReset(true)
        // setContracts([])
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
                console.log("line 64", resultDetail)
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

    async function getSubContractList(contract_id) {
        const result = await getSubContractOfMomContract(contract_id);
        setSubContractList(result.data.sub_contract)
    };

    const renderContractOption = ()=>{
        return contractList.map(contract => {
            return <Option key={contract.id} value={contract.id}>{`${contract.client_ID.name} - ${contract.contract_number}`}</Option>
        })
    }

    const renderSubContractOption = ()=>{
        return subContractList.map(sub => {
            return <Option key={sub.id} value={sub.id} >{`${sub.client_ID.name} - ${sub.sub_contract_number}`}</Option>
        })
    }

    const renderRequestOption = ()=>{
        return contractRequest.map(request => {
            return <Option key={request.id} value={request.id}>{`${request.product_ID.name}`}</Option>
        })
    }
    
    const renderDetailOption = ()=>{
        let newDetailList = [...detailList]
        return newDetailList.filter(item => item.completed_evidences === null).map(detail => {
            return <Option key={detail.id} value={detail.id}>{`${detail.desc}`}</Option>
        })
    }

    const valueOfField = (name) => {
        if(name === "report_date" || name === "from_date"){
            if(valueForm[name] !== null && valueForm[name] !== undefined){
                let newReportDate = moment(new Date(valueForm[name])).format("DD-MM-YYYY");
                return moment(newReportDate, "DD-MM-YYYY");
            }
            return null;
        }
        if(valueForm[name] && valueForm[name] !== "" && valueForm[name] !== undefined){
            return valueForm[name];
        } else {
            if(name === "completed_evidences" || name === "desc"){
                return "";
            }
            return null;
        }
    }

    const handleChangeValue = (name, value)=>{
        setValueForm({
            ...valueForm,
            [name]: value
        })
    }

    const renderInput = ()=>{
        return <>
            <label >Link</label>
            <textarea
                name="completed_evidences"
                value={valueOfField("completed_evidences")}
                onChange={(e) => {
                    let { name, value } = e.target;
                    handleChangeValue(name, value)
                }}>
            </textarea>
            <label>Ảnh</label>
            <input type="file"
                onChange={e => {
                    let files = e.target.files;
                    setValueForm({
                        ...valueForm,
                        files
                    })
                }}
                multiple
                accept="image/png, image/jpeg, image/jpg"
            />
        </>
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
            <div className="modal__report__content modal__content">
                <div>
                    <div className="modal__field field__select">
                        <div>
                            <label className="term__label">Hợp đồng</label>
                            <Select
                                className="style"
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                value={valueOfField("contract_id")}
                                onChange={(value) => {
                                    // dispatch({
                                    //     type: GET_CONTRACT_DETAIL,
                                    //     data: { contract_id: value, request_done: false }
                                    // });
                                    getSubContractList(value)
                                    handleChangeValue("contract_id", value)
                                }}
                            >
                                {renderContractOption()}
                            </Select>
                        </div>
                    </div>
                    <div className="modal__field field__select">
                        <div>
                            <label className="term__label">Hợp đồng con/Phụ lục</label>
                            <Select
                                className="style"
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                value={valueOfField("sub_contract_id")}
                                onChange={(value) => {
                                    dispatch({
                                        type: GET_DETAIL_SUB_CONTRACT,
                                        data: { sub_contract_id: value, contract_id: valueForm.contract_id }
                                    });
                                    handleChangeValue("sub_contract_id", value)
                                }}
                            >
                                {renderSubContractOption()}
                            </Select>
                        </div>
                    </div>
                    <div className="modal__field field__select">
                        <div>
                            <label className="term__label">Quyền lợi</label>
                            <Select
                                className="style"
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                value={valueOfField("request_id")}
                                onChange={(value) => {
                                    let detailList = contractRequest.find(contract => contract.id === value);
                                    setDetailList(detailList.details)
                                    handleChangeValue("request_id", value)
                                }}
                            >
                                {renderRequestOption()}
                            </Select>
                        </div>
                    </div>
                    <div className="modal__field field__select">
                        <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <label className="term__label" style={{ marginRight: "10px" }}>Chi tiết quyền lợi</label>
                                {!isCreateDetail
                                    ?
                                    <Tooltip title="Tạo chi tiết" color="green">
                                        <FcPlus onClick={() => {
                                            setIsCreateDetail(true)
                                        }} />
                                    </Tooltip>
                                    :
                                    <Tooltip title="Hủy tạo chi tiết" color="red">
                                        <AiFillMinusCircle style={{ color: "red" }} onClick={() => {
                                            setIsCreateDetail(false)
                                        }} />
                                    </Tooltip>
                                }
                            </div>
                            <Select
                                className="style"
                                showSearch
                                allowClear
                                filterOption={(input, option) =>
                                    (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                value={valueOfField("detail_id")}
                                onChange={(value) => {
                                    // handleChangeValue("detail_id", value)
                                    let detail = detailList.find(detail => detail.id === value)
                                    setValueForm({
                                        ...valueForm,
                                        detail_id: value,
                                        from_date: detail.from_date,
                                        to_date: detail.to_date,
                                        desc: detail.desc
                                    })
                                }}
                            >
                                {renderDetailOption()}
                            </Select>
                        </div>
                    </div>
                    {isCreateDetail
                        ?
                        <CreateDetail
                            handleChangeValue={handleChangeValue}
                            valueOfField={valueOfField}
                        />
                        : null
                    }
                    <div className="modal__field field__select modal__report__upload">
                        {renderInput()}
                    </div>
                </div>
            </div>
        </Modal>
    )
}