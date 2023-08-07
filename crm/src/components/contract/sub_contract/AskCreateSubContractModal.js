import { Modal, Switch } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSubContractInfor } from '../../../redux/features/contractSlice';
import { checkMicroFe } from '../../../untils/helper';

export default function AskCreateSubContractModal(props) {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const { isShowModal, setIsShowModal, data } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [valueModal, setValueModal] = useState({extend_parent_contract: false})

    const handleCancel = () => {
        setIsShowModal(false)
    }

    const handleOK = ()=>{
        let newValueModal = {...valueModal, contract_ID: data.id}
        dispatch(setSubContractInfor(newValueModal))
        setIsShowModal(false)
        history.push(`${uri}/crm/subcontract/create`)
    }

    const handleChange = (name, value)=>{
        setValueModal({
            ...valueModal,
            [name]: value
        })
    }

    const showTypeOfPayment = ()=>{
        let kieuThanhToan = data.payment_type;
        let soDotThanhToan = data.pay_before_run ? "Trả trước" : "Trả sau";
        return kieuThanhToan + "/" + soDotThanhToan
    }

    const showPrices = (name)=>{
        if(data[name] > 0){
            return new Intl.NumberFormat("vi-VN").format(data[name] * 1000000)
        } else {
            return 0
        }
    }

    return (
        <Modal
            title={<span>Tạo hợp đồng con/phụ lục</span>}
            closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
            </svg>}
            footer={
                <div className="contract__service__footer">
                    <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
                        <span>Hủy</span>
                    </button>
                    <button type="button" className="ant-btn ant-btn-default btn__add" onClick={handleOK}>
                      <span>Tạo</span>
                  </button>
                </div>
            }
            open={isShowModal}
            onCancel={handleCancel}
            className="create__sub__contranct__modal"
            width="500px"
        >
            <section className="sub__contract__content">
                <div className="mom__contract__infor">
                    <h3>Thông tin hợp đồng mẹ</h3>
                    <div className="mom__contract__field">
                        <span>Số hợp đồng: {data.contract_number}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Khách hàng: {data.client_ID?.name}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Tình trạng: {data.status}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Loại thanh toán: {showTypeOfPayment()}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Giá trị hợp đồng: {showPrices("total_include_VAT") + " VNĐ"}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Tổng giá trị đã thực hiện: {showPrices("real_time_total") + " VNĐ"}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Tổng giá trị thanh toán đã tạo: {showPrices("total_created_payments") + " VNĐ"}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Tổng giá trị hợp đồng đã thanh toán: {showPrices("total_completed_payments") + " VNĐ"}</span>
                    </div>
                    <div className="mom__contract__field">
                        <span>Số tiền chưa thực hiện: {showPrices("total_left") + " VNĐ"}</span>
                    </div>
                </div>
                <hr />
                <div className="sub__contract__infor">
                    <h3>Thông tin hợp đồng con</h3>
                    <div className="sub__contract__field">
                        <label >
                        Loại hợp đồng: 
                        <Switch checkedChildren="Phụ lục" unCheckedChildren="Hợp đồng con" checked={valueModal.extend_parent_contract} onChange={(checked) => { handleChange("extend_parent_contract", checked) }}>Phụ lục</Switch>
                        </label>
                    </div>
                </div>
            </section>
        </Modal>
    )
}