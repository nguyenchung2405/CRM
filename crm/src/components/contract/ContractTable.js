import React, { useState } from 'react'
import { Table } from 'antd';
import {FcPlus} from "react-icons/fc"
import { useNavigate } from 'react-router-dom';

export default function ContractTable() {

    const {Column} = Table;
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const dataTable = [
        {
            soHopDong: 1,
            customerName: "Công ty HYOSUNG",
            nguoiPhuTrach: "Nguyễn Lan Anh",
            time: "20/01/2022 - 20/12/2022",
            status: "Chưa chạy",
            createdBy: "Nguyễn Lan"
        },
        {
            soHopDong: 2,
            customerName: "Công ty HYOSUNG",
            nguoiPhuTrach: "Nguyễn Lan Anh",
            time: "20/01/2022 - 20/12/2022",
            status: "Đang chạy",
            createdBy: "Nguyễn Lan"
        },
        {
            soHopDong: 3,
            customerName: "Công ty HYOSUNG",
            nguoiPhuTrach: "Nguyễn Lan Anh",
            time: "20/01/2022 - 20/12/2022",
            status: "Kết thúc",
            createdBy: "Nguyễn Lan"
        },
    ]

  return (
    <div className="content contract__table customer__table">
        <div className="table__features">
            <div className="table__features__add">
                <h1>Quản lý hợp đồng</h1>
                <FcPlus onClick={()=>{
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
            dataSource={dataTable}
            pagination={{
                position: ["bottomLeft"],
                defaultPageSize: 10,
                locale: { items_per_page: "" },
                defaultCurrent: 1,
                showSizeChanger: true,
                total: 10,
                pageSizeOptions: [10,50,100],
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
            <Column className="contract__table__status" title="Trạng thái" key="status" render={(text)=>{
                return <span status={text.status.toLowerCase()} >{text.status}</span>
            }} />
            <Column className="contract__table__createdBy" title="Người tạo HĐ" key="createdBy" dataIndex="createdBy" />
            <Column className="contract__table__thaotac" render={(text)=>{
               return <div className="table__thaotac">
                    <button >Chỉnh sửa</button>
               </div>
            }} />
        </Table>
    </div>
  )
}
