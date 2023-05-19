import { Table, Tooltip } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONTRACT_LIST } from '../../title/title';
import ExportReceiptModal from './ExportReceiptModal';
import HandleFeatures from './HandleFeatures';

export default function ReceiptTable() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const { total, recieptList } = useSelector(state => state.receiptReducer);
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [isShowModal, setIsShowModal] = useState(false)
  
    useEffect(() => {
      dispatch({
        type: GET_CONTRACT_LIST,
        data: { page, pageNumber }
      })
      // dispatch(setIsLoading(true))
    }, [page, pageNumber, dispatch]);

    return (
      <div className="content reciept__table customer__table">
        {
          /**
           <ExportReceiptModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        /> 
           
           */
        }
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
          dataSource={recieptList}
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
          <Column className="receipt__tabel__event__name" title="Tên sự kiên" key="eventName" fixed="left" render={(text) => {
            return text.event_ID?.name
          }}></Column>
          <Column title="Tên khách hàng" fixed="left" key="clientName" render={(text) => text.client_ID.name}></Column>
          <Column title="Số hợp đồng" key="soHopDong" dataIndex="contract_number"></Column>
          <Column title="Số đợt thanh toán" key="soDotThanhToan " dataIndex="payment_count"></Column>
          <Column title="Hình thức thanh toán" key="hinhThucThanhToan" render={(text) => {
            let soLanThanhToan = text.payment_type;
            let kieuThanhToan = text.pay_before_run ? "Trả trước" : "Trả sau";
            return `${soLanThanhToan} / ${kieuThanhToan}`
          }}></Column>
          <Column title="Số hóa đơn đã xuất" key="soHoaDonDaXuat" dataIndex="receipt_count"></Column>
          {/*<Column title="Số hóa đơn đã thanh toán" dataIndex="total_completed_payment"></Column> */}
          <Column title="Ngày xuất hóa đơn cuối" key="ngayXuatHDCuoi" dataIndex="last_receipt_exported" render={(text) => {
            if (text !== null) {
              let newDate = moment(text).format("DD-MM-YYYY");
              return newDate;
            } else {
              return null
            }
          }}></Column>
          <Column title="Ghi chú" key="note" dataIndex="note"></Column>
          <Column title="Giá trị đã thanh toán (triệu)" key="giaTriDaThanhToan" render={(text) => {
            let total = text.total;
            let total_completed = text.total_completed_payments;
            return `${total_completed} / ${total}`
          }}></Column>
          <Column key="thaoTac" fixed="right" render={(text) => {
            return <div className="table__thaotac">
              <Tooltip title="Yêu cầu thanh toán" color="green" >
                <MdOutlineModeEditOutline className="style__svg" onClick={() => {

                  // navigate(`${uri}/crm/customer/update/${text.id}`)
                }} />
              </Tooltip>
              <HandleFeatures setIsShowModal={setIsShowModal} />
            </div>
          }}></Column>
        </Table>
      </div>
    )
}