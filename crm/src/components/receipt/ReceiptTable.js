import { Table, Tooltip } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_PAYMENT_LIST } from '../../title/title';
import CreateReceiptModal from './CreateReceiptModal';
import ExpandTableReceipt from './ExpandTable';
import HandleFeatures from './HandleFeatures';

export default function ReceiptTable() {

    const {Column} = Table;
    const dispatch = useDispatch();
    const { total, recieptList } = useSelector(state => state.receiptReducer);
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [isShowCreateModal, setIsShowCreateModal] = useState(false)
    const [dataToCreateModal, setDataToCreateModal] = useState({})
    const [list, setList] = useState([]);
    
    useEffect(() => {
      dispatch({
        type: GET_PAYMENT_LIST,
        data: { page, pageNumber }
      })
      // dispatch(setIsLoading(true))
    }, [dispatch, page, pageNumber]);

    useEffect(()=>{
      let newArr = [...recieptList]
      setList(newArr)
    }, [recieptList])

    return (
      <div className="content reciept__table customer__table">
        <CreateReceiptModal
        isShowModal={isShowCreateModal}
        setIsShowModal={setIsShowCreateModal}
        dataToCreateModal={dataToCreateModal}
        />
        <div className="table__features">
          <div className="table__features__add">
            <h1>Quản lý hóa đơn</h1>
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
        //   expandable={{
        //     showExpandColumn: true,
        //     expandedRowRender: record => {
        //         return <ExpandTableReceipt data={record.payments} contract_id={record.id} />
        //     },
        //     rowExpandable: (record) => record.payments.length > 0,
        // }}
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
        <Column className="receipt__tabel__report__date" title="Ngày quyết toán" key="eventName" fixed="left" render={(text) => {
          return moment(text.request_date).format("DD-MM-YYYY")
        }}></Column>
        <Column className="receipt__tabel__report__date" title="Số tiền" key="eventName" fixed="left" render={(text) => {
          return new Intl.NumberFormat("vi-VN").format(text.total_value * 1000000)
        }}></Column>
          <Column className="receipt__tabel__event__name" title="Tên sự kiên" key="eventName" render={(text) => {
            return text?.event_ID?.name
          }}></Column>
          <Column title="Tên khách hàng" key="clientName" render={(text) => text?.client_ID?.name}></Column>
          <Column title="Số hợp đồng" key="soHopDong" dataIndex="contract_number"></Column>
          <Column title="Số đợt thanh toán" key="soDotThanhToan " 
          dataIndex="payment_count" 
          sorter={(a,b) => a.payment_count - b.payment_count}
          sortDirections={['ascend','descend']}
          ></Column>
          <Column title="Hình thức thanh toán" key="hinhThucThanhToan" render={(text) => {
            let soLanThanhToan = text?.payment_type;
            let kieuThanhToan = text?.pay_before_run ? "Trả trước" : "Trả sau";
            return `${soLanThanhToan} / ${kieuThanhToan}`
          }}></Column>
          <Column title="Số hóa đơn đã xuất" key="soHoaDonDaXuat" dataIndex="receipt_count" sorter={(a,b) => a.receipt_count - b.receipt_count}></Column>
          <Column title="Số hóa đơn đã thanh toán" dataIndex="completed_receipt_count" sorter={(a,b) => a.completed_receipt_count - b.completed_receipt_count}></Column>
          <Column title="Ngày xuất hóa đơn cuối" key="ngayXuatHDCuoi" dataIndex="last_receipt_exported" render={(text) => {
            if (text !== null && text !== undefined) {
              let newDate = moment(text).format("DD-MM-YYYY");
              return newDate;
            } else {
              return null
            }
          }}></Column>
          <Column title="Ghi chú" key="note" dataIndex="note"></Column>
          <Column title="Giá trị đã thanh toán (triệu)" key="giaTriDaThanhToan" render={(text) => {
            let total = text?.total;
            let total_completed = text?.total_completed_payments;
            return `${total_completed} / ${total}`
          }}></Column>
          <Column key="thaoTac" fixed="right" render={(text) => {
            let isExistExport = text?.receipts?.length > 0 ? true : false;
            let receipt_id = text?.receipts[0]?.id;
            let isComplete = text?.receipts[0]?.is_complete;
            return <div className="table__thaotac">
              <HandleFeatures 
              isExistExport={isExistExport}
              receipt_id={receipt_id}
              isComplete={isComplete}
              payment_ID={text.id}
              contract_id={text.contract_ID}
              data={text}
              />
            </div>
          }}></Column>
        </Table>
      </div>
    )
}