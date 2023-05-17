import { Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACCEPTANCE_CONTRACT_LIST } from '../../title/title';
import ExpandTableAcceptance from './ExpandTableAcceptance';
import ReportModal from './ReportModal';

export default function Acceptance() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState(false)
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [list, setList] = useState([])
    const {requestAcceptanceList, totalRequestAccList} = useSelector(state => state.acceptanceReducer)
    console.log(requestAcceptanceList, totalRequestAccList)
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
            <div className="content reciept__table customer__table">
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Quản lý nghiệm thu</h1>
                        <Tooltip title="Tạo nghiệm thu" color="green">
                            <FcPlus style={{ marginRight: "5px" }} onClick={() => {
                                setIsShowModal(true)
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
                    <Column title="Tên quyền lợi" fixed="left" render={(text) => {
                        // console.log(text)
                        return text.product_ID.name
                    }}></Column>
                    <Column title="Tên sự kiên" fixed="left" render={(text) => {
                        console.log(text)
                        return text.product_ID.name
                    }}></Column>
                {/**
            <Column title="Giá trị đã thanh toán (triệu)" fixed="right" render={(text) => {
                        let total = text.total;
                        let total_completed = text.total_completed_payment;
                        return `${total_completed} / ${total}`
                    }}></Column>
                */}
                </Table>
            </div>
        </div>
    )
}