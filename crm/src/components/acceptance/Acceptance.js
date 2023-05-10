import { Table, Tooltip } from 'antd';
import React, { useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import ReportModal from './ReportModal';

export default function Acceptance() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState(false)
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);

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
                    // dataSource={recieptList}
                    pagination={{
                        position: ["bottomLeft"],
                        defaultPageSize: 10,
                        locale: { items_per_page: "" },
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        //   total: total,
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
                    <Column title="Tên sự kiên" fixed="left" render={(text) => {
                        console.log(text)
                    }}></Column>
                    <Column title="Tên khách hàng" fixed="left" render={(text) => text.client_ID.name}></Column>
                    <Column title="Số hợp đồng" dataIndex="contract_number"></Column>
                    <Column title="Số đợt thanh toán" dataIndex="payment_count"></Column>
                    <Column title="Hình thức thanh toán" render={(text) => {
                        let soLanThanhToan = text.payment_type;
                        let kieuThanhToan = text.pay_before_run ? "Trả trước" : "Trả sau";
                        return `${soLanThanhToan} / ${kieuThanhToan}`
                    }}></Column>
                    <Column title="Số hóa đơn đã xuất" dataIndex="receipt_count"></Column>
                    {/*<Column title="Số hóa đơn đã thanh toán" dataIndex="total_completed_payment"></Column> */}
                    <Column title="Ngày xuất hóa đơn cuối" dataIndex="last_receipt_exported"></Column>
                    <Column title="Ghi chú" dataIndex="note"></Column>
                    <Column title="Giá trị đã thanh toán (triệu)" fixed="right" render={(text) => {
                        let total = text.total;
                        let total_completed = text.total_completed_payment;
                        return `${total_completed} / ${total}`
                    }}></Column>
                </Table>
            </div>
        </div>
    )
}