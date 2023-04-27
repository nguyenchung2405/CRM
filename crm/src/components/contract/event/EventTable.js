import React, { useEffect, useState } from 'react'
import { message, Table, Tooltip } from 'antd';
import { FcPlus } from "react-icons/fc"
import ModalCustomer from '../../modal/ModalCustomer';
import { useDispatch, useSelector } from "react-redux"
import { GET_CUSTOMER_LIST, GET_EVENT_LIST, SEARCH_CUSTOMER } from '../../../title/title';
import Loading from "../../../components/Loading"
import { setIsLoading } from '../../../redux/features/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { setDataCustomer, setIsCreateCustomer } from '../../../redux/features/customer.feature';
import { setMessage } from '../../../redux/features/messageSlice';
import { checkMicroFe } from '../../../untils/helper';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import moment from "moment"

export default function EventTable() {
    // console.log(process.env.crmServer)
    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const { Column } = Table;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isLoading } = useSelector(state => state.loadingReducer);
    const { eventList, totalEventList } = useSelector(state => state.eventReducer);
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [search, setSearch] = useState({ name: "", tax_number: "", brief_name: "" })

    useEffect(() => {
        if (search?.name === "" && search?.tax_number === "" && search?.brief_name === "") {
            dispatch({
                type: GET_EVENT_LIST,
                data: { page, pageNumber }
            });
            dispatch(setIsLoading(true))
            dispatch(setMessage({}))
        }
    }, [search])

    useEffect(() => {
        if (search?.name === "" && search?.tax_number === "" && search?.brief_name === "") {
            dispatch({
                type: GET_EVENT_LIST,
                data: { page, pageNumber }
            });
            dispatch(setIsLoading(true))
        }
    }, [page, pageNumber])

    const handleSearchInput = (e) => {
        let { value, name } = e.target;
        setSearch({
            ...search,
            [name]: value
        })
    }
    const showLoading = () => {
        if (isLoading) {
            return <Loading />
        }
    }

    return (
        <div className="customer__table content event__table">
            {showLoading()}
            <div className="table__features">
                <div className="table__features__add">
                    <h1>Quản lý sự kiện</h1>
                    <Tooltip title="Tạo" color="green">
                        <FcPlus onClick={() => {
                            dispatch(setIsCreateCustomer(true))
                            dispatch(setDataCustomer({}))
                            navigate(`${uri}/crm/event/create`)
                        }} />
                    </Tooltip>
                </div>
                <div className="table__features__search">
                    <input placeholder="Tên sự kiện" type="text"
                        name="brief_name"
                        onChange={handleSearchInput} />
                    <div className="table__features__search__btn" style={{ width: "auto" }}>
                        <button onClick={() => {
                            if (search?.name === "" && search?.tax_number === "" && search?.brief_name === "") {
                                message.warning("Dữ liệu tìm kiếm không thể để trống", 1)
                            } else {
                                dispatch({
                                    type: SEARCH_CUSTOMER,
                                    searchData: search
                                })
                            }
                        }}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
            <Table
                dataSource={eventList}
                pagination={{
                    position: ["bottomLeft"],
                    defaultPageSize: 10,
                    locale: { items_per_page: "" },
                    defaultCurrent: 1,
                    showSizeChanger: true,
                    total: totalEventList,
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
                <Column className="event__table__name" title="Tên sự kiện" key="name" dataIndex="name" />
                <Column className="event__table__tuNgay" title="Ngày bắt đầu" key="from_date" render={(text)=>{
                    return moment(text.from_date, "YYYY-MM-DD").format("DD-MM-YYYY")
                }} />
                <Column className="event__table__denNgay" title="Ngày kết thúc" key="to_date" render={(text)=>{
                    return moment(text.to_date, "YYYY-MM-DD").format("DD-MM-YYYY")
                }} />
                <Column className="event__table__value" title="Giá trị" key="value_event" render={(text)=>{
                    return new Intl.NumberFormat("vi-VN").format(text.value_event * 1000000) + " VNĐ"
                }} />
                <Column className="event__table__thaotac" render={(text) => {
                    return <div className="table__thaotac">
                        <Tooltip title="Chỉnh sửa" color="green" >
                            <MdOutlineModeEditOutline className="style__svg" onClick={() => {
                                dispatch(setDataCustomer(text))
                                dispatch(setIsCreateCustomer(false))
                                navigate(`${uri}/crm/event/${text.id}`)
                            }} />
                        </Tooltip>
                    </div>
                }
                } />
            </Table>
            {/**
                <ModalCustomer
            title="Cập nhật khách hàng"
            isShowModal={isShowModalUpdate}
            setIsShowModalUpdate={setIsShowModalUpdate}
            dataToModal={dataToModal} 
        />
        */}
        </div>
    )
}
