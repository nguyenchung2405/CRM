import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { GET_PRODUCT_LIST, SEARCH_CUSTOMER } from '../../title/title';
import Loading from "../../components/Loading"
import { setIsLoading } from '../../redux/features/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { setDataCustomer, setIsCreateCustomer } from '../../redux/features/customer.feature';
import { setMessage } from '../../redux/features/messageSlice';
import { checkMicroFe } from '../../untils/helper';
import { MdOutlineModeEditOutline } from 'react-icons/md';

export default function ProductTable() {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const { Column } = Table;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {isLoading} = useSelector(state => state.loadingReducer);
    const {productList, totalProduct} = useSelector(state => state.productReducer);
    const {messageAlert} = useSelector(state => state.messageReducer);
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [search, setSearch] = useState({name: "", tax_number: "", brief_name: ""})

    useEffect(()=>{
        if(search?.name === "" && search?.tax_number === "" && search?.brief_name === ""){
            dispatch({
                type: GET_PRODUCT_LIST,
                data: {page, pageSize: pageNumber}
            });
            dispatch(setIsLoading(true))
            dispatch(setMessage({}))
        }
    }, [search])

    useEffect(()=>{
        // if(search?.name === "" && search?.tax_number === "" && search?.brief_name === ""){
        //     dispatch({
        //         type: GET_PRODUCT_LIST
        //       });
        //     dispatch(setIsLoading(true))
        // }
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
    <div className="customer__table content product__table">
        {showLoading()}
        <div className="table__features">
            <div className="table__features__add">
                <h1>Quản lý sản phẩm</h1>
                <FcPlus onClick={()=>{
                   
                }} />
            </div>
            <div className="table__features__search">
                <input placeholder="Kênh sản phẩm" type="text" 
                name="name"
                // onChange={handleSearchInput} 
                />
                <input placeholder="Nhóm sản phẩm" type="text" 
                name="tax_number"
                // onChange={handleSearchInput} 
                />
                <input placeholder="Tên sản phẩm" type="text" 
                name="brief_name"
                // onChange={handleSearchInput} 
                />
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
            dataSource={productList}
            pagination={{
                position: ["bottomLeft"],
                defaultPageSize: 10,
                locale: { items_per_page: "" },
                defaultCurrent: 1,
                showSizeChanger: true,
                total: totalProduct,
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
            <Column className="product__table__kenhSP" title="Kênh sản phẩm" key="brief_name" render={(text)=>{
                return text.location_ID?.channel_ID.name
            }} />
            <Column className="product__table__nhomSP" title="Nhóm sản phẩm" key="name" render={text => {
                return text.location_ID?.name
            }} />
            <Column className="product__table__tenSP" title="Tên sản phẩm" key="address" dataIndex="name" />
            <Column className="product__table__loaiSP" title="Loại sản phẩm" render={text => {
                return text.type_ID?.name
            }} />
            <Column className="product__table__price" title="Giá" key="masothue" render={text => {
                return new Intl.NumberFormat("vi-VN").format(text.price?.price * 1000000) + " VNĐ"
            }} />
            <Column className="product__table__thaotac" render={(text)=>{
                return <div className="table__thaotac">
                {/**
                <button onClick={()=>{
                    // Khi trước thêm khách hàng mới bằng Modal giờ làm component chứ ko dùng modal nữa khi nào xài modal lại thì mở ra 2 dòng dưới
                    // setIsShowModalUpdate(true);
                    // setDataToModal({...text})
                    
                    // Code thêm KH bằng component
                    dispatch(setDataCustomer(text))
                    dispatch(setIsCreateCustomer(false))
                    navigate(`${uri}/crm/customer/update`)
                }}>Chỉnh sửa</button>
            */}
                <MdOutlineModeEditOutline className="style__svg" onClick={()=>{
                    
            }} />
            </div>
                }
            } />
        </Table>
    </div>
  )
}
