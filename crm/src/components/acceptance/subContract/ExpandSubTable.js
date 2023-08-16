import { Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { getSubContractOfMomContract } from '../../../redux/API/contractAPI';
import { checkMicroFe } from '../../../untils/helper';
import CreateReceiptModal from '../../receipt/CreateReceiptModal';
import ExpandRequestTable from './ExpandRequestTable';

export default function ExpandSubTable({ data }) {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const { Column } = Table;
    const history = useHistory();
    const [subContractList, setSubContractList] = useState([]);
    const [isShowCreateModal, setIsShowCreateModal] = useState(false);
    const [dataToCreateModal, setDataToCreateModal] = useState({})

    useEffect(() => {
        getSubContractList(data.id)
    }, [data.id])

    async function getSubContractList(contract_id) {
        const result = await getSubContractOfMomContract(contract_id);
        setSubContractList(result.data.sub_contract)
    };

    return (
        <>
            <CreateReceiptModal
                isShowModal={isShowCreateModal}
                setIsShowModal={setIsShowCreateModal}
                dataToCreateModal={dataToCreateModal}
            />
            <Table
                dataSource={subContractList}
                pagination={false}
                rowKey={record => record.id}
                expandable={{
                    showExpandColumn: true,
                    expandedRowRender: record => {
                        return <ExpandRequestTable data={record} />
                    },
                    // rowExpandable: record => record.has_sub_contract
                }}
            >
                <Column className="contract__table__loaiHopDong" title="Loại hợp đồng" key="loaiHopDong" fixed="left"
                    render={(text) => {
                        return text.contract_type_ID.name.toUpperCase()
                    }} />
                <Column title="Loại" fixed="left" render={text => {
                    if (text.extend_parent_contract) {
                        return "Phụ lục"
                    } else if (!text.extend_parent_contract) {
                        return "Hợp đồng con"
                    }
                }}></Column>
                <Column className="contract__table__customerName" title="Tên khách hàng" key="customerName" fixed="left"
                    render={(text) => {
                        return text?.client_ID?.name
                    }}
                />
                <Column className="contract__table__time" title="Thời gian thực hiện" key="time"
                    render={(text) => {
                        // let batDau = convertDate(text.begin_date);
                        // let ketThuc = convertDate(text.end_date);
                        let batDau = moment(text.begin_date).format("DD/MM/YYYY");
                        let ketThuc = moment(text.end_date).format("DD/MM/YYYY");
                        return `${batDau} - ${ketThuc}`
                    }} />
                <Column className="contract__table__status"
                    onFilter={(value, record) => { return record.status.toLowerCase().includes(value.toLowerCase()) }}
                    title="Trạng thái"
                    key="status"
                    render={(text) => {
                        return <span status={text.status.toLowerCase()}>{text.status}</span>
                    }}
                />
                <Column className="contract__table__nguoiDauMoi" title="Người đầu mối" key="nguoiDauMoi" dataIndex="owner_name" />
                <Column className="contract__table__nguoiTheoDoi" title="Người theo dõi" key="nguoiTheoDoi" dataIndex="creater_name" />
                <Column className="contract__table__total" fixed="right" title="Giá trị hợp đồng" key="sub__total" render={text => {
                    let total = new Intl.NumberFormat("vi-VN").format(+text.total_include_VAT > 1000000 ? +text.total_include_VAT : +text.total_include_VAT * 1000000)
                    return total + " VNĐ"
                }} ></Column>
                <Column fixed="right" render={(text) => {
                    return <div className="table__thaotac">
                        <Tooltip title="Tạo quyết toán" color="green" >
                            <AiFillPlusCircle className="style__svg" onClick={() => {
                                setIsShowCreateModal(true)
                                setDataToCreateModal({
                                    sub_contract_id: text.id,
                                    contract_id: text.contract_ID
                                })
                            }} />
                        </Tooltip>
                    </div>
                }}></Column>
            </Table>
        </>
    )
}