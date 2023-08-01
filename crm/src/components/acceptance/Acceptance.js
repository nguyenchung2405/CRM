import { Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONTRACT_LIST } from '../../title/title';
import ReportModal from './ReportModal';
import ExpandTableAcceptance from "./ExpandTableAcceptance"
import CreateReceiptModal from '../receipt/CreateReceiptModal';
import { AiFillPlusCircle } from 'react-icons/ai';

export default function Acceptance() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState(false)
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [list, setList] = useState([])
    const [isShowCreateModal, setIsShowCreateModal] = useState(false)
    const [dataToCreateModal, setDataToCreateModal] = useState({})
    // const {requestAcceptanceList, totalRequestAccList} = useSelector(state => state.acceptanceReducer)
    const { total, contractList } = useSelector(state => state.contractReducer);

    useEffect(() => {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }, []);
    
    useEffect(()=>{
        dispatch({
            type: GET_CONTRACT_LIST,
            data: {page, pageNumber, status: "Đang chạy"}
        })
    }, [page, pageNumber])

    useEffect(()=>{
        let newList = contractList.map(item => {
            return {
                ...item,
                key: item.id
            }
        });
        setList(newList)
    }, [contractList])
    
    return (
        <div className="acceptance__table content">
            <ReportModal 
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            list={list}
            setList={setList}
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
                            return <ExpandTableAcceptance data={record} />
                        },
                    }}
                    pagination={{
                        position: ["bottomLeft"],
                        defaultPageSize: 10,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: total,
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
                <Column className="contract__table__loaiHopDong" title="Loại hợp đồng" key="loaiHopDong" fixed="left" render={(text) => { return text.contract_type_id.name.toUpperCase() }} />
                <Column className="contract__table__customerName" title="Tên khách hàng" key="customerName" fixed="left"
                    render={(text) => {
                        return text?.client_ID?.name
                    }} 
                />
                <Column className="contract__table__time" title="Thời gian thực hiện" key="time"
                    render={(text) => {
                        let batDau = moment(text.begin_date).format("DD/MM/YYYY");
                        let ketThuc = moment(text.end_date).format("DD/MM/YYYY");
                        return `${batDau} - ${ketThuc}`
                    }} />
                <Column className="contract__table__nguoiDauMoi" title="Người đầu mối" key="nguoiDauMoi" dataIndex="owner_name" />
                <Column className="contract__table__nguoiTheoDoi" title="Người theo dõi" key="nguoiTheoDoi" dataIndex="creater_name" />
                <Column className="contract__table__total" title="Giá trị hợp đồng" key="total" render={(text) => {
                    let total = new Intl.NumberFormat("vi-VN", { currency: "VND" }).format(+text.total_include_VAT > 1000000 ? +text.total_include_VAT : +text.total_include_VAT * 1000000)
                    return total + " VNĐ"
                }} />
                <Column fixed="right" render={(text) => {
                    return <div className="table__thaotac">
                        <Tooltip title="Tạo quyết toán" color="green" >
                            <AiFillPlusCircle className="style__svg" onClick={() => {
                                  setIsShowCreateModal(true)
                                  setDataToCreateModal({
                                      contract_id: text.id,
                                    //   details: text.details,
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