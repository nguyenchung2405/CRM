import React, { useEffect, useState } from 'react'
import { message, Table, Tooltip } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONTRACT_LIST } from '../../title/title';
import moment from 'moment';
import { checkMicroFe } from '../../untils/helper';
import { setMessage } from '../../redux/features/messageSlice';
import Loading from '../Loading';
import { setIsLoading } from '../../redux/features/loadingSlice';
import { MdOutlineModeEditOutline, MdPayment } from "react-icons/md";
import { setIsOnlyPayment } from '../../redux/features/contractSlice';

export default function ContractTable() {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
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
                    <Tooltip title="Tạo hợp đồng" color="green">
                        <FcPlus style={{ marginRight: "5px" }} onClick={() => {
                            navigate(`${uri}/crm/contract/create`)
                            dispatch(setIsOnlyPayment(false));
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
                scroll={{
                    x: "max-content",
                }}
            >
                <Column className="contract__table__loaiHopDong" title="Loại hợp đồng" key="loaiHopDong" fixed="left" render={(text) => { return text.contract_type_id.name.toUpperCase() }} />
                <Column className="contract__table__customerName" title="Tên khách hàng" key="customerName" fixed="left"
                    render={(text) => {
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
                    render={(text) => {
                        // let batDau = convertDate(text.begin_date);
                        // let ketThuc = convertDate(text.end_date);
                        let batDau = moment(text.begin_date).format("DD/MM/YYYY");
                        let ketThuc = moment(text.end_date).format("DD/MM/YYYY");
                        return `${batDau} - ${ketThuc}`
                    }} />
                <Column className="contract__table__status" title="Trạng thái" key="status" render={(text) => {
                    if(text.status){
                        return <span status={"đang chạy"}>Đang chạy</span>
                    } else if(!text.status){
                        return <span status={"kết thúc"}>Kết thúc</span>
                    } else {
                        return <span status={"chưa chạy"}>Chưa chạy</span>
                    }
                }} />
                <Column className="contract__table__nguoiDauMoi" title="Người đầu mối" key="status" render={(text) => {
                    return <span>{text.owner_name}</span>
                }} />
                <Column className="contract__table__nguoiTheoDoi" title="Người theo dõi" key="status" render={(text) => {
                    return <span>{text.creater_name}</span>
                }} />
                <Column className="contract__table__total" title="Giá trị hợp đồng" key="total" render={(text) => {
                    let total = new Intl.NumberFormat("vi-VN", { currency: "VND" }).format(+text.total > 1000000 ? +text.total : +text.total * 1000000)
                    return total + " VNĐ"
                }} />
                {/** <Column className="contract__table__no" title="Nợ" key="total" render={(text) => {
                    return <span>{text.id % 2 === 0 ? "10.000.000 VNĐ" : "30.000.000 VNĐ"}</span>
                }} /> */}
                <Column className="contract__table__thaotac" render={(text) => {
                    return <div className="table__thaotac">
                        <Tooltip title="Chỉnh sửa" color="green">
                            <MdOutlineModeEditOutline className="style__svg" onClick={() => {
                                navigate(`${uri}/crm/detail/${text.id}`);
                                dispatch(setIsOnlyPayment(false));
                            }} />
                        </Tooltip>
                        <Tooltip title="Sửa đợt thanh toán" color="green">
                            <MdPayment className="style__svg" onClick={() => {
                                dispatch(setIsOnlyPayment(true));
                                navigate(`${uri}/crm/detail/${text.id}`)
                            }} />
                        </Tooltip>
                    </div>
                }} />
            </Table>
        </div >
    )
}
