import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONTRACT_LIST } from '../../title/title';
import moment from 'moment';
import { convertDate } from '../../untils/helper';

export default function ContractTable() {

    console.log("hop dong")
    const { Column } = Table;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const { total, contractList } = useSelector(state => state.contractReducer);

    useEffect(() => {
        dispatch({
            type: GET_CONTRACT_LIST,
            data: { page, pageNumber }
        })
    }, [page, pageNumber, dispatch]);

    return (
        <div className="content contract__table customer__table">
            <div className="table__features">
                <div className="table__features__add">
                    <h1>Quản lý hợp đồng</h1>
                    <FcPlus onClick={() => {
                        navigate("/crm/contract/create")
                    }} />
                </div>
                <div className="table__features__search">
                    <input placeholder="Số hợp đồng" type="text" />
                    <input placeholder="Tên khách hàng" type="text" />
                    <input placeholder="Người phụ trách" type="text" />
                    <div className="table__features__search__btn">
                        <button>Tìm kiếm</button>
                    </div>
                </div>
            </div>
            <Table
                dataSource={contractList}
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
            >
                <Column className="contract__table__soHopDong" title="Số hợp đồng" key="soHopDong" dataIndex="soHopDong" />
                <Column className="contract__table__customerName" title="Tên khách hàng" key="customerName" dataIndex="customerName" />
                <Column className="contract__table__nguoiPhuTrach" title="Người phụ trách" key="nguoiPhuTrach" dataIndex="nguoiPhuTrach" />
                <Column className="contract__table__time" title="Thời gian thực hiện" key="time" dataIndex="time" />
                <Column className="contract__table__status" title="Trạng thái" key="status" render={(text) => {
                    return <span status={text?.status?.toLowerCase()} >{text?.status}</span>
                }} />
                <Column className="contract__table__createdBy" title="Người tạo HĐ" key="createdBy" dataIndex="createdBy" />
                <Column className="contract__table__thaotac" render={(text) => {
                    return <div className="table__thaotac">
                        <button >Chỉnh sửa</button>
                    </div>
                }} />
            </Table>
        </div>
    )
}
