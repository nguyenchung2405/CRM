import { Table, Tooltip } from 'antd'
import React from 'react'
import { FcPlus } from 'react-icons/fc';

export default function ReceiptTable() {

    const {Column} = Table;

  return (
    <div className="content reciept__table customer__table">
      <div className="table__features">
        <div className="table__features__add">
          <h1>Quản lý hóa đơn</h1>
          <Tooltip title="Tạo hóa đơn" color="green">
            <FcPlus style={{ marginRight: "5px" }} onClick={() => {

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
          scroll={{
            x: "max-content",
          }}
        >
        
        </Table>
    </div>
  )
}