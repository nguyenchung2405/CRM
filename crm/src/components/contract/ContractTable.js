import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONTRACT_LIST } from '../../title/title';
import moment from 'moment';
import { checkMicroFe, convertDate } from '../../untils/helper';
import { setMessage } from '../../redux/features/messageSlice';
import Loading from '../Loading';
import { setIsLoading } from '../../redux/features/loadingSlice';

export default function ContractTable() {

    let uri = checkMicroFe() === true ? "contract-service" : "";
    const { Column } = Table;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const { total, contractList } = useSelector(state => state.contractReducer);
    const { messageAlert } = useSelector(state => state.messageReducer);
    const { isLoading } = useSelector(state => state.loadingReducer);

    useEffect(() => {
        dispatch({
            type: GET_CONTRACT_LIST,
            data: { page, pageNumber }
        })
        dispatch(setIsLoading(true))
    }, [page, pageNumber, dispatch]);

    useEffect(() => {
        let { type, msg } = messageAlert;
        if (type === "thành công") {
            message.success(msg)
            dispatch(setMessage({}))
        } else if (type === "thất bại") {
            message.error(msg)
            dispatch(setMessage({}))
        }
    }, [messageAlert])

    const showLoading = () => {
        if (isLoading) {
            return <Loading />
        }
    }

  return (
    <div className="content contract__table customer__table">
        {showLoading()}
        <div className="table__features">
            <div className="table__features__add">
                <h1>Quản lý hợp đồng</h1>
                <FcPlus onClick={()=>{
                    if(checkMicroFe()){
                        navigate("/create")
                    } else {
                        navigate(`${uri}/crm/contract/create`, { replace: true })
                    }
                }} />
            </div>
            <div className="table__features__search">
                <input placeholder="Tên khách hàng" type="text" />
                <input placeholder="Loại hợp đồng" type="text" />
                <input placeholder="Người đầu mối" type="text" />
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
            <Column className="contract__table__loaiHopDong" title="Loại hợp đồng" key="loaiHopDong" render={(text)=>{ return text.contract_type_id.toUpperCase()}} />
            <Column className="contract__table__customerName" title="Tên khách hàng" key="customerName"
            render={(text)=>{
                return text?.client_ID?.name
            }} />
            {/**
            <Column className="contract__table__nguoiPhuTrach" title="Người phụ trách" key="nguoiPhuTrach" dataIndex="owner"
            render={(text)=>{
                // fake tên người phụ trách để đi demo
                if(+text === 1){
                    return "Nguyễn Văn Chương"
                } else if(+text === 2){
                    return "Nguyễn Trọng Trí"
                } else {
                    return "Trần Quốc Duy"
                }
            }} />
            */}
            <Column className="contract__table__time" title="Thời gian thực hiện" key="time"
            render={(text)=>{
                // let batDau = convertDate(text.begin_date);
                // let ketThuc = convertDate(text.end_date);
                let batDau = moment(text.begin_date).format("DD/MM/YYYY");
                let ketThuc = moment(text.end_date).format("DD/MM/YYYY");
                return `${batDau} - ${ketThuc}`
            }} />
            <Column className="contract__table__status" title="Trạng thái" key="status" render={(text)=>{
                // fake dữ liệu để đi demo, khi nào làm thì sửa lại
                // return <span status={text.status === null ? "đang làm" : text.status?.toLowerCase()} >{text.status === null ? "Đang làm" : text.status}</span>
                return <span status={text.id % 2 === 0 ? "đang chạy" : "kết thúc"}>{text.id % 2 === 0 ? "Đang chạy" : "Kết thúc"}</span>
            }} />
            <Column className="contract__table__status" title="Người đầu mối" key="status" render={(text)=>{
                // fake dữ liệu để đi demo, khi nào làm thì sửa lại
                // return <span status={text.status === null ? "đang làm" : text.status?.toLowerCase()} >{text.status === null ? "Đang làm" : text.status}</span>
                return <span>{text.id % 2 === 0 ? "Nguyễn Hoài Nam" : "Nguyễn Văn Lợi"}</span>
            }} />
            <Column className="contract__table__status" title="Người theo dõi" key="status" render={(text)=>{
                // fake dữ liệu để đi demo, khi nào làm thì sửa lại
                // return <span status={text.status === null ? "đang làm" : text.status?.toLowerCase()} >{text.status === null ? "Đang làm" : text.status}</span>
                return <span>{text.id % 2 === 0 ? "Đoàn Nguyễn Chung" : "Nguyễn Văn Chương"}</span>
            }} />
            <Column className="contract__table__total" title="Giá trị hợp đồng" key="total" render={(text)=>{
                let total = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(+text.total)
                return total + " VNĐ"
            }}  />
            <Column className="contract__table__no" title="Nợ" key="total" render={(text)=>{
                return <span>{text.id % 2 === 0 ? "100.000.000 VNĐ" : "30.000.000 VNĐ"}</span>
            }} />
            <Column className="contract__table__thaotac" render={(text)=>{
               return <div className="table__thaotac">
                    <button onClick={()=>{
                        if(checkMicroFe()){
                            navigate(`detail/${text.id}`)
                        } else {
                            navigate(`${uri}/crm/detail/${text.id}`, { replace: true })
                        }
                    }}>Chỉnh sửa</button>
               </div>
            }} />
        </Table>
    </div>
  )
}
