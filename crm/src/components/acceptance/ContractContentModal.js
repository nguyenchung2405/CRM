import React, { useEffect, useState } from 'react'
import { DatePicker, Radio, Select, Tooltip } from 'antd'
import { GET_CONTRACT_LIST, GET_CONTRACT_DETAIL } from '../../title/title';
import { useDispatch, useSelector } from 'react-redux';
import { FcPlus } from 'react-icons/fc';
import CreateDetail from './CreateDetail';
import {AiFillMinusCircle} from "react-icons/ai"
import moment from 'moment';

export default function ContractContentModal(props) {
    
    const { valueForm, setValueForm, isReset, setIsReset} = props;
    const dispatch = useDispatch();
    const {Option} = Select;
    const { contractList, contractRequest } = useSelector(state => state.contractReducer);
    const [valueRadio, setValueRadio] = useState(false)
    const [detailList, setDetailList] = useState([]);
    const [isCreateDetail, setIsCreateDetail] = useState(false);
    
    useEffect(() => {
        dispatch({
            type: GET_CONTRACT_LIST,
            data: { page:1, pageNumber: 1000, status: "Đang chạy" }
        })
    }, [dispatch]);

    useEffect(() => {
        if (valueRadio) {
            setValueForm({
                ...valueForm,
                completed_evidences: null
            })
        } else {
            setValueForm({
                ...valueForm,
                files: null
            })
        }
    }, [valueRadio]);

    useEffect(()=>{
        if(isReset){
            setIsCreateDetail(false)
            setValueRadio(false)
            setIsReset(false)
        }
    }, [isReset])

    const renderContractOption = ()=>{
        return contractList.map(contract => {
            return <Option key={contract.id} value={contract.id}>{`${contract.client_ID.name} - ${contract.contract_number}`}</Option>
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
        // return detailList.map(detail => {
        //     return <Option key={detail.id} value={detail.id}>{`${detail.desc}`}</Option>
        // })
    }

    const handleChangRadio = (e)=>{
        let {value} = e.target;
        setValueRadio(value)
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
        // if (valueRadio) {
        //     return <input type="file"
        //         onChange={e => {
        //             let files = e.target.files;
        //             setValueForm({
        //                 ...valueForm,
        //                 files
        //             })
        //         }}
        //     />
        // } else {
        //     return <input type="text"
        //         name="completed_evidences"
        //         value={valueOfField("completed_evidences")}
        //         onChange={(e) => {
        //             let { name, value } = e.target;
        //             handleChangeValue(name, value)
        //         }}
        //     />
        // }
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
                            dispatch({
                                type: GET_CONTRACT_DETAIL,
                                contract_id: value
                            });
                            handleChangeValue("contract_id", value)
                        }}
                    >
                        {renderContractOption()}
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
                    <div style= {{ display: "flex", alignItems: "center" }}>
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
                                <AiFillMinusCircle style={{ color:"red" }} onClick={() => {
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
            {
                /**
                 <div className="modal__field field__select">
                <div>
                    <label className="term__label">Ngày nghiệm thu</label>
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
                            let ngayNghiemThu = moment(dateString, "DD-MM-YYYY").toISOString();
                            handleChangeValue("report_date", ngayNghiemThu)
                        }}
                        value={valueOfField("report_date")}
                    />
                </div>
            </div>
                 */
            }
            <div className="modal__field field__select modal__report__upload">
                {/**
                <Radio.Group onChange={handleChangRadio} value={valueRadio} >
                    <Radio value={false}>Link</Radio>
                    <Radio value={true}>Ảnh</Radio>
                </Radio.Group>
                */}
                { renderInput() }
            </div>
        </div>
    )
}