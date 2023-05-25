import { Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACCEPTANCE_CONTRACT_LIST, GET_ACCEPTANCE_EVENT_LIST } from '../../title/title';
import ExpandTableAcceptance from './ExpandTableAcceptance';
import ReportModal from './ReportModal';

export default function EventAcceptance() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState(false)
    const [eventMode, setEventMode] = useState(false)
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [list, setList] = useState([])
    const {eventAcceptanceList, totalEventAccList} = useSelector(state => state.acceptanceReducer)

    useEffect(()=>{
        dispatch({
            type: GET_ACCEPTANCE_EVENT_LIST,
            data: {page, pageNumber}
        })
    }, [page, pageNumber])

    useEffect(()=>{
        let newList = eventAcceptanceList.map(item => {
            return {
                ...item,
                key: item.id
            }
        });
        setList(newList)
    }, [eventAcceptanceList])
    
    return (
        <div className="acceptance__table content">
            <ReportModal 
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            eventMode={eventMode}
            />
            <div className="content reciept__table customer__table">
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Quản lý nghiệm thu sự kiện</h1>
                        <Tooltip title="Tạo nghiệm thu" color="green">
                            <FcPlus style={{ marginRight: "5px" }} onClick={() => {
                                setIsShowModal(true)
                                setEventMode(true)
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
                            return <ExpandTableAcceptance data={record.executive_details} />
                        },
                        rowExpandable: (record) => record.executive_details.length > 0,
                    }}
                    pagination={{
                        position: ["bottomLeft"],
                        defaultPageSize: 10,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: totalEventAccList,
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
                    <Column title="Tên sự kiện" fixed="left" dataIndex="event_name" ></Column>
                    <Column title="Tên quyền lợi" fixed="left" dataIndex="product_name" ></Column>
                    <Column title="Số lượng" fixed="left" dataIndex="quantity" ></Column>
                    <Column fixed="right" render={(text) => {
                        
                    }}></Column>
                </Table>
            </div>
        </div>
    )
}