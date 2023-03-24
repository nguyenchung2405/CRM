import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd';
import { FcPlus } from "react-icons/fc"
import ModalCustomer from '../modal/ModalCustomer';
import { useDispatch, useSelector } from "react-redux"
import { GET_CUSTOMER_LIST, SEARCH_CUSTOMER } from '../../title/title';
import Loading from "../../components/Loading"
import { setIsLoading } from '../../redux/features/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { setDataCustomer, setIsCreateCustomer } from '../../redux/features/customer.feature';
import { setMessage } from '../../redux/features/messageSlice';
import { checkMicroFe } from '../../untils/helper';

export default function CustomerTable() {

    let uri = checkMicroFe() === true ? "contract-service" : "";
    const { Column } = Table;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {isLoading} = useSelector(state => state.loadingReducer);
    const {customerList, totalCustomer} = useSelector(state => state.customerReducer);
    const {messageAlert} = useSelector(state => state.messageReducer);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [dataToModal, setDataToModal] = useState({});
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [search, setSearch] = useState({name: "", tax_number: "", brief_name: ""})

    useEffect(()=>{
        if(search?.name === "" && search?.tax_number === "" && search?.brief_name === ""){
            dispatch({
                type: GET_CUSTOMER_LIST,
                data: {page, pageNumber}
            });
            dispatch(setIsLoading(true))
            dispatch(setMessage({}))
        }
    }, [search])

    useEffect(()=>{
        if(search?.name === "" && search?.tax_number === "" && search?.brief_name === ""){
            dispatch({
                type: GET_CUSTOMER_LIST,
                data: {page, pageNumber}
            });
            dispatch(setIsLoading(true))
        }
    }, [page, pageNumber])

    useEffect(()=>{
        let {type, msg} = messageAlert;
        if(type === "thành công"){
            message.success(msg)
        } else if (type === "thất bại") {
            message.error(msg)
        }
    }, [messageAlert])

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
    <div className="customer__table content">
        {showLoading()}
        <div className="table__features">
            <div className="table__features__add">
                <h1>Quản lý khách hàng</h1>
                <FcPlus onClick={()=>{
                    // setIsShowModal(true)
                    dispatch(setIsCreateCustomer(true))
                    dispatch(setDataCustomer({}))
                    if(checkMicroFe()){
                        navigate("/create")
                    } else {
                        navigate(`${uri}/crm/customer/create`, { replace: true })
                    }
                }} />
               {/**
                     <ModalCustomer
                title="Khách hàng mới"
                isShowModal={isShowModal}
                setIsShowModal={setIsShowModal} />
                */}
            </div>
            <div className="table__features__search">
                <input placeholder="Tên khách hàng" type="text" 
                name="name"
                onChange={handleSearchInput} />
                <input placeholder="Mã số thuế" type="text" 
                name="tax_number"
                onChange={handleSearchInput} />
                <input placeholder="Tên viết tắt" type="text" 
                name="brief_name"
                onChange={handleSearchInput} />
                <div className="table__features__search__btn">
                    <button onClick={()=>{
                        if(search?.name === "" && search?.tax_number === "" && search?.brief_name === ""){
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
            dataSource={customerList}
            pagination={{
                position: ["bottomLeft"],
                defaultPageSize: 10,
                locale: { items_per_page: "" },
                defaultCurrent: 1,
                showSizeChanger: true,
                total: totalCustomer,
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
            <Column className="customer__table__name" title="Tên khách hàng" key="name" dataIndex="name" />
            <Column className="customer__table__address" title="Địa chỉ" key="address" dataIndex="address" />
            <Column className="customer__table__masothue" title="Mã số thuế" key="masothue" dataIndex="tax_number" />
            <Column className="customer__table__phone" title="Số điện thoại" key="phone" dataIndex="phone" />
            <Column className="customer__table__tenviettat" title="Tên viết tắt" key="brief_name" dataIndex="brief_name" />
            <Column className="customer__table__nguoiphutrach" title="Người phụ trách" key="nguoiphutrach" render={()=>{
                return "Nguyễn Văn Chương"
            }} />
            <Column className="customer__table__thaotac" render={(text)=>{
                if(text.name === "Công ty HYOSUNG"){
                        return <div className="table__thaotac">
                        <button disabled>Chỉnh sửa</button>
                        <button disabled>Đã ẩn</button>
                    </div>
                } else {
                    return <div className="table__thaotac">
                        <button onClick={()=>{
                            // Khi trước thêm khách hàng mới bằng Modal giờ làm component chứ ko dùng modal nữa khi nào xài modal lại thì mở ra 2 dòng dưới
                            // setIsShowModalUpdate(true);
                            // setDataToModal({...text})
                            
                            // Code thêm KH bằng component
                            dispatch(setDataCustomer(text))
                            dispatch(setIsCreateCustomer(false))
                            if(checkMicroFe()){
                                navigate("/update")
                            } else {
                                navigate(`${uri}/crm/customer/update`, { replace: true })
                            }
                        }}>Chỉnh sửa</button>
                    </div>
                }
            }} />
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
