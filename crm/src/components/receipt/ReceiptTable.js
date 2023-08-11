import { Table, Tooltip } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GET_PAYMENT_LIST } from '../../title/title';
import { checkMicroFe } from '../../untils/helper';
import CreateReceiptModal from './CreateReceiptModal';
import HandleFeatures from './HandleFeatures';

export default function ReceiptTable() {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const {Column} = Table;
    const dispatch = useDispatch();
    const history = useHistory();
    const { total, recieptList } = useSelector(state => state.receiptReducer);
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [isShowCreateModal, setIsShowCreateModal] = useState(false)
    const [dataToCreateModal, setDataToCreateModal] = useState({})
    const [list, setList] = useState([]);

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
    
    useEffect(() => {
      dispatch({
        type: GET_PAYMENT_LIST,
        data: { page, pageNumber, completed: true }
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
          rowKey={record => record.id}
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
          <Column className="receipt__table__report__date" title="Ngày quyết toán" key="eventName" fixed="left" render={(text) => {
            return moment(text.request_date).format("DD-MM-YYYY")
          }}></Column>
          <Column className="receipt__table__value" title="Số tiền" key="eventName" fixed="left" render={(text) => {
            return new Intl.NumberFormat("vi-VN").format(text.total_value * 1000000)
          }}></Column>
          <Column className="receipt__table__event__name" title="Tên sự kiên" key="eventName" render={(text) => {
            return text?.contract_info?.event_name
          }}></Column>
          <Column title="Tên khách hàng" key="clientName" render={(text) => text?.contract_info?.client_name}></Column>
          <Column title="Số hợp đồng" key="soHopDong" render={(text) => {
            return <span style={{ cursor: "pointer" }} onClick={() => {
              history.push(`${uri}/crm/detail/${text?.contract_ID}`)
            }}>{text?.contract_info?.contract_number}</span>
          }}></Column>
          <Column title="Số đợt thanh toán" key="soDotThanhToan "
            render={(text) => text?.contract_info?.payment_count}
            sorter={(a, b) => a.contract_info.payment_count - b.contract_info.payment_count}
            sortDirections={['ascend', 'descend']}
          ></Column>
          <Column title="Hình thức thanh toán" key="hinhThucThanhToan" render={(text) => {
            let soLanThanhToan = text?.contract_info?.payment_type;
            let kieuThanhToan = text?.contract_info?.pay_before_run ? "Trả trước" : "Trả sau";
            return `${soLanThanhToan} / ${kieuThanhToan}`
          }}></Column>
          <Column title="Số hóa đơn đã xuất"
            key="soHoaDonDaXuat"
            render={(text) => text?.contract_info?.receipt_count}
            sorter={(a, b) => a.contract_info.receipt_count - b.contract_info.receipt_count}></Column>
          <Column title="Số hóa đơn đã thanh toán"
            render={(text) => text?.contract_info?.completed_receipt_count}
            sorter={(a, b) => a.contract_info.completed_receipt_count - b.contract_info.completed_receipt_count}></Column>
          <Column title="Ngày xuất hóa đơn cuối" key="ngayXuatHDCuoi" render={(text) => {
            let last_receipt_exported = text?.contract_info?.last_receipt_exported
            if (last_receipt_exported !== null && last_receipt_exported !== undefined) {
              let newDate = moment(last_receipt_exported).format("DD-MM-YYYY");
              return newDate;
            } else {
              return null
            }
          }}></Column>
          <Column title="Ghi chú" key="note" render={(text) => {
            if (text?.contract_info?.note?.length > 50) {
              return <Tooltip title={text?.contract_info?.note}>
                <span>{text?.contract_info?.note?.slice(0, 50) + "..."}</span>
              </Tooltip>
            } else {
              return text?.contract_info?.note
            }
          }}></Column>
          <Column title="Giá trị đã thanh toán (triệu)" key="giaTriDaThanhToan" render={(text) => {
            let total = text?.contract_info?.total_include_VAT;
            let total_completed = text?.contract_info?.total_completed_payments;
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
                page={page}
                pageNumber={pageNumber}
              />
            </div>
          }}></Column>
        </Table>
      </div>
    )
}