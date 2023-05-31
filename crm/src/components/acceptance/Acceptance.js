import { Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACCEPTANCE_CONTRACT_LIST } from '../../title/title';
import CreateReceiptModal from '../receipt/CreateReceiptModal';
import ExpandTableAcceptance from './ExpandTableAcceptance';
import ReportModal from './ReportModal';

export default function Acceptance() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState(false)
    const [eventMode, setEventMode] = useState(false)
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [list, setList] = useState([])
    const [isShowCreateModal, setIsShowCreateModal] = useState(false)
    const [dataToCreateModal, setDataToCreateModal] = useState({})
    const {requestAcceptanceList, totalRequestAccList} = useSelector(state => state.acceptanceReducer)
    
    useEffect(()=>{
        dispatch({
            type: GET_ACCEPTANCE_CONTRACT_LIST,
            data: {page, pageNumber}
        })
    }, [page, pageNumber])

    useEffect(()=>{
        let newList = requestAcceptanceList.map(item => {
            return {
                ...item,
                key: item.id
            }
        });
        setList(newList)
    }, [requestAcceptanceList])
    
    return (
        <div className="acceptance__table content">
            <ReportModal 
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            />
            <CreateReceiptModal
            isShowModal={isShowCreateModal}
            setIsShowModal={setIsShowCreateModal}
            dataToCreateModal={dataToCreateModal}
            />
            <div className="content reciept__table customer__table">
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Theo dõi thực hiện quyền lợi hợp đồng</h1>
                        <Tooltip title="Tạo nghiệm thu" color="green">
                            <FcPlus style={{ marginRight: "5px" }} onClick={() => {
                                setIsShowModal(true)
                                setEventMode(false)
                            }} />
                        </Tooltip>
                    </div>
                    <div className="table__features__search">
                        <input placeholder="Tên khách hàng" type="text" />
                        <input placeholder="Loại hợp đồng" type="text" />
                        <input placeholder="Người đầu mối" type="text" />
                        <div className="table__features__search__btn">
                            <button>Tìm kiếm</button>
                        </div>
                    </div>
                </div >
                <Table
                    dataSource={list}
                    expandable={{
                        showExpandColumn: true,
                        // expandRowByClick: true,
                        expandedRowRender: record => {
                            return <ExpandTableAcceptance data={record.details} />
                        },
                        rowExpandable: (record) => record.details.length > 0,
                    }}
                    pagination={{
                        position: ["bottomLeft"],
                        defaultPageSize: 10,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: totalRequestAccList,
                        pageSizeOptions: [10, 50, 100],
                        onChange: (page, pageNumber) => {
                            setPageNumber(pageNumber);
                            setPage(page);
                        },
                        showTotal: (total) => {
                            if (pageNumber * page < total) {
                                return `Hiển thị ${pageNumber * page} trong ${total}`;
                            }
                            return `Hiển thị ${total} trong ${total}`;
                        },
                    }}
                    scroll={{
                        x: "max-content",
                    }}
                >
                    <Column title="Khách hàng" dataIndex="client_name"></Column>
                    <Column title="Số hợp đồng" dataIndex="contract_number"></Column>
                    <Column title="Tên quyền lợi" fixed="left" render={(text) => {
                        // console.log(text)
                        return text.product_ID.name
                    }}></Column>
                    <Column title="Số lượng" dataIndex="quality"></Column>
                    <Column fixed="right" render={(text) => {
                        // console.log(text)
                        return <div className="table__thaotac">
                            <Tooltip title="Tạo quyết toán" color="green" >
                                <AiFillPlusCircle className="style__svg" onClick={() => {
                                    setIsShowCreateModal(true)
                                    setDataToCreateModal({
                                        contract_id: text.contract_ID,
                                        details: text.details,
                                        // event_id: text.event_ID?.id,
                                        // real_time_total: text.real_time_total,
                                        // total_completed_payments: text.total_completed_payments,
                                        // total_created_payments: text.total_created_payments
                                    })
                                }} />
                            </Tooltip>
                        </div>
                    }}></Column>
                </Table>
            </div>
        </div>
    )
}