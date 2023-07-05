import React, { useEffect, useState } from 'react'
import { message, Table, Tooltip } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONTRACT_LIST } from '../../title/title';
import moment from 'moment';
import { checkMicroFe } from '../../untils/helper';
import { setMessage } from '../../redux/features/messageSlice';
import Loading from '../Loading';
import { setIsLoading } from '../../redux/features/loadingSlice';
import { MdOutlineModeEditOutline, MdPayment } from "react-icons/md";

export default function ContractTable() {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const { Column } = Table;
    const history = useHistory();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [search, setSearch] = useState({client_name: "", contract_type: "", owner_name: ""})
    const { total, contractList } = useSelector(state => state.contractReducer);
    const { messageAlert } = useSelector(state => state.messageReducer);
    const { isLoading } = useSelector(state => state.loadingReducer);

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
        if(search.client_name !== "" || search.contract_type !== "" || search.owner_name !== ""){
            dispatch(setIsLoading(true))
            dispatch({
                type: GET_CONTRACT_LIST,
                data: { page, pageNumber, search }
            })
        } else {
            dispatch({
                type: GET_CONTRACT_LIST,
                data: { page, pageNumber }
            })
            dispatch(setIsLoading(true))
        }
    }, [page, pageNumber, dispatch]);

    useEffect(()=>{
        if(search.client_name === "" && search.contract_type === "" && search.owner_name === ""){
            if(page === 1){
                dispatch({
                    type: GET_CONTRACT_LIST,
                    data: { page, pageNumber }
                })
                dispatch(setIsLoading(true))
            } else {
                setPage(1)
            }
        }
    }, [search])

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

    const searchContract = ()=>{
        if(search.client_name !== "" || search.contract_type !== "" || search.owner_name !== ""){
            dispatch(setIsLoading(true))
            dispatch({
                type: GET_CONTRACT_LIST,
                data: { page, pageNumber, search }
            })
        }
    }

    const showLoading = () => {
        if (isLoading) {
            return <Loading />
        }
    }

    const filterStatus = [
        {
            text: "Đang chạy",
            value: "Đang chạy"
        },
        {
            text: "Kết thúc",
            value: "Kết thúc"
        },
        {
            text: "Chưa chạy",
            value: "Chưa chạy"
        },
    ]

    return (
        <div className="content contract__table customer__table">
            {showLoading()}
            <div className="table__features">
                <div className="table__features__add">
                    <h1>Quản lý hợp đồng</h1>
                    <Tooltip title="Tạo hợp đồng" color="green">
                        <FcPlus style={{ marginRight: "5px" }} onClick={() => {
                            history.push(`${uri}/crm/contract/create`)
                        }} />
                    </Tooltip>
                </div>
                <div className="table__features__search">
                    <input placeholder="Tên khách hàng" type="text"  
                        name="client_name"
                        value={search.client_name}
                        onChange={e => {
                            let { name, value } = e.target;
                            setSearch(prev => { return { ...prev, [name]: value } })
                        }}
                    />
                    <input placeholder="Loại hợp đồng" type="text"
                        name="contract_type"
                        value={search.contract_type}
                        onChange={e => {
                            let { name, value } = e.target;
                            setSearch(prev => { return { ...prev, [name]: value } })
                        }}
                    />
                    <input placeholder="Người đầu mối" type="text"
                        name="owner_name"
                        value={search.owner_name}
                        onChange={e => {
                            let { name, value } = e.target;
                            setSearch(prev => { return { ...prev, [name]: value } })
                        }}
                    />
                    <div className="table__features__search__btn">
                        <button onClick={searchContract}>Tìm kiếm</button>
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
                    current: page,
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
                rowKey={record => record.id}
            >
                <Column className="contract__table__loaiHopDong" title="Loại hợp đồng" key="loaiHopDong" fixed="left" render={(text) => { return text.contract_type_id.name.toUpperCase() }} />
                <Column className="contract__table__customerName" title="Tên khách hàng" key="customerName" fixed="left"
                    render={(text) => {
                        return text?.client_ID?.name
                    }} 
                />
                <Column className="contract__table__time" title="Thời gian thực hiện" key="time"
                    render={(text) => {
                        // let batDau = convertDate(text.begin_date);
                        // let ketThuc = convertDate(text.end_date);
                        let batDau = moment(text.begin_date).format("DD/MM/YYYY");
                        let ketThuc = moment(text.end_date).format("DD/MM/YYYY");
                        return `${batDau} - ${ketThuc}`
                    }} />
                <Column className="contract__table__status" 
                    filters={filterStatus}
                    filterSearch={true}
                    filterMode="menu"
                    onFilter={(value, record) => { return record.status.toLowerCase().includes(value.toLowerCase()) }}
                    title="Trạng thái" 
                    key="status"
                    render={(text) => {
                        return <span status={text.status.toLowerCase()}>{text.status}</span>
                    }} 
                />
                <Column className="contract__table__nguoiDauMoi" title="Người đầu mối" key="nguoiDauMoi" dataIndex="owner_name" />
                <Column className="contract__table__nguoiTheoDoi" title="Người theo dõi" key="nguoiTheoDoi" dataIndex="creater_name" />
                <Column className="contract__table__total" title="Giá trị hợp đồng" key="total" render={(text) => {
                    let total = new Intl.NumberFormat("vi-VN", { currency: "VND" }).format(+text.total_include_VAT > 1000000 ? +text.total_include_VAT : +text.total_include_VAT * 1000000)
                    return total + " VNĐ"
                }} />
                <Column className="contract__table__thaotac" fixed="right" key="thaoTac" render={(text) => {
                    return <div className="table__thaotac">
                        <Tooltip title="Chỉnh sửa" color="green">
                            <MdOutlineModeEditOutline className="style__svg" onClick={() => {
                                history.push(`${uri}/crm/detail/${text.id}`);
                            }} />
                        </Tooltip>
                    </div>
                }} />
            </Table>
        </div >
    )
}
