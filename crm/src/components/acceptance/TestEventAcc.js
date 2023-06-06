import { Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ACCEPTANCE_CONTRACT_LIST, GET_ACCEPTANCE_EVENT_LIST, GET_EVENT_LIST } from '../../title/title';
import CreateReceiptModal from '../receipt/CreateReceiptModal';
import ExpandTableAcceptance from './ExpandTableAcceptance';
import ReportModal from './ReportModal';
import TestExpandEventAcceptance from './ExpandEventAcc';

export default function TestEventAcceptance() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState(false)
    const [eventMode, setEventMode] = useState(false)
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [list, setList] = useState([])
    const [isShowCreateModal, setIsShowCreateModal] = useState(false)
    const [dataToCreateModal, setDataToCreateModal] = useState({})
    // const {eventAcceptanceList, totalEventAccList} = useSelector(state => state.acceptanceReducer)
    const { eventList, totalEventList } = useSelector(state => state.eventReducer);

    useEffect(()=>{
        dispatch({
            type: GET_EVENT_LIST,
            data: { page, pageNumber }
        });
    }, [page, pageNumber])

    useEffect(()=>{
        let newList = eventList.map(item => {
            return {
                ...item,
                key: item.id
            }
        });
        setList(newList)
    }, [eventList])
    
    return (
        <div className="acceptance__table content">
            <ReportModal 
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            eventMode={eventMode}
            />
            <CreateReceiptModal
                isShowModal={isShowCreateModal}
                setIsShowModal={setIsShowCreateModal}
                dataToCreateModal={dataToCreateModal}
            />
            <div className="content reciept__table customer__table">
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Theo dõi thực hiện quyền lợi sự kiện</h1>
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
                            return <TestExpandEventAcceptance data={record} />
                        },
                    }}
                    pagination={{
                        position: ["bottomLeft"],
                        defaultPageSize: 10,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: totalEventList,
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
                >
                    <Column title="Tên sự kiện" dataIndex="name" ></Column>
                    <Column title="Thời gian diễn ra sự kiện" 
                        render={text => {
                            let ngayBatDau = moment(new Date(text.from_date)).format("DD-MM-YYYY");
                            let ngayKetThuc = moment(new Date(text.to_date)).format("DD-MM-YYYY");
                            return `${ngayBatDau} - ${ngayKetThuc}`
                        }}
                    ></Column>
                    <Column title="Giá trị sự kiện" render={(text) => {
                        return `${new Intl.NumberFormat("vi-VN").format(text.value_event * 1000000)} VNĐ`
                    }}></Column>
                    <Column render={text => {
                        return <div className="table__thaotac">
                            <Tooltip title="Tạo quyết toán" color="green" >
                                <AiFillPlusCircle className="style__svg" onClick={() => {
                                    setIsShowCreateModal(true)
                                    setDataToCreateModal({
                                        event_id: text.id,
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