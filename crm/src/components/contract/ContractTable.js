import React, { useEffect, useState } from 'react'
import { message, Popconfirm, Select, Table, Tooltip } from 'antd';
import { FcPlus } from "react-icons/fc"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { COMPLETED_CONTRACT, GET_CONTRACT_LIST, GET_CONTRACT_TYPE_LIST } from '../../title/title';
import moment from 'moment';
import { checkMicroFe } from '../../untils/helper';
import { setMessage } from '../../redux/features/messageSlice';
import Loading from '../Loading';
import { setIsLoading } from '../../redux/features/loadingSlice';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiFillPlusCircle, AiOutlineFileDone } from 'react-icons/ai';
import AskCreateSubContractModal from './sub_contract/AskCreateSubContractModal';
import ExpandSubContractTable from './sub_contract/ExpandSubContractTable';

export default function ContractTable() {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    const { Column } = Table;
    const history = useHistory();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(10);
    const [search, setSearch] = useState({client_name: "", contract_type_ID: "", owner_name: "", status: ""})
    const [isShowModal, setIsShowModal] = useState(false)
    const [dataToModal, setDataToModal] = useState({})
    const { total, contractList, contractTypeList } = useSelector(state => state.contractReducer);
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
        dispatch({
            type: GET_CONTRACT_TYPE_LIST
        });
    }, []);

    useEffect(() => {
        if(search.client_name !== "" || search.contract_type_ID !== "" || search.owner_name !== "" || search.status !== ""){
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
        if(search.client_name === "" && (search.contract_type_ID === "" || search.contract_type_ID === undefined) && search.owner_name === "" && (search.status === "" || search.status === undefined)){
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
        if(search.client_name !== "" || search.contract_type_ID !== "" || search.owner_name !== "" || search.status !== ""){
            if(page === 1){
                dispatch({
                    type: GET_CONTRACT_LIST,
                    data: { page, pageNumber, search }
                })
                dispatch(setIsLoading(true))
            } else {
                setPage(1)
            }
        }
    }

    const showLoading = () => {
        if (isLoading) {
            return <Loading />
        }
    }

    const confirm = (contract_id)=>{
        dispatch({
            type: COMPLETED_CONTRACT,
            data: {contract_id, page, pageNumber}
        })
    }

    const renderContractTypeOption = ()=>{
        return contractTypeList.map(type => {
            return <Select.Option key={type.id + type.name} value={type.id}>{type.name}</Select.Option>
        })
    }

    return (
        <div className="content contract__table customer__table">
            {showLoading()}
            <AskCreateSubContractModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} data={dataToModal} />
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
                    <Select
                        className="search__select"
                        placeholder="Loại hợp đồng"
                        allowClear
                        onChange={(value) => { setSearch(prev => { return { ...prev, contract_type_ID: value?.toString() } }) }}
                    >
                        {renderContractTypeOption()}
                    </Select>
                    <input placeholder="Người đầu mối" type="text"
                        name="owner_name"
                        value={search.owner_name}
                        onChange={e => {
                            let { name, value } = e.target;
                            setSearch(prev => { return { ...prev, [name]: value } })
                        }}
                    />
                    <Select
                        className="search__select"
                        placeholder="Trạng thái"
                        allowClear
                        onChange={(value) => { setSearch(prev => { return { ...prev, status: value } }) }}>
                        <Select.Option key="Đang chạy" value="Đang chạy">Đang chạy</Select.Option>
                        <Select.Option key="Chưa chạy" value="Chưa chạy">Chưa chạy</Select.Option>
                        <Select.Option key="Quá hạn nhưng chưa thanh lý" value="Quá hạn nhưng chưa thanh lý">Quá hạn nhưng chưa thanh lý</Select.Option>
                        <Select.Option key="Đã thanh lý" value="Đã thanh lý">Đã thanh lý</Select.Option>
                    </Select>
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
                expandable={{
                    showExpandColumn: true,
                    // expandRowByClick: true,
                    expandedRowRender: record => {
                        return <ExpandSubContractTable contract_id={record.id} />
                    },
                    rowExpandable: record => record.has_sub_contract
                }}
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
                    if (text.status.includes("Đã thanh lý")) {
                        return <div className="table__thaotac">
                            <Tooltip title="Xem" color="green">
                                <MdOutlineModeEditOutline className="style__svg" onClick={() => {
                                    history.push(`${uri}/crm/completed/${text.id}`);
                                }} />
                            </Tooltip>
                        </div>
                    } else {
                        return <div className="table__thaotac">
                            <Tooltip title="Chỉnh sửa" color="green">
                                <MdOutlineModeEditOutline className="style__svg" onClick={() => {
                                    history.push(`${uri}/crm/detail/${text.id}`);
                                }} />
                            </Tooltip>
                            <Tooltip title="Tạo hợp đồng con/phụ lục" color="green" >
                                <AiFillPlusCircle className="style__svg" onClick={() => {
                                    setIsShowModal(true)
                                    setDataToModal(text)
                                }} />
                            </Tooltip>
                            <Tooltip title="Thanh lý hợp đồng" color="green" >
                                <Popconfirm
                                    title="Bạn có chắc muốn thanh lý hợp đồng này ?"
                                    onConfirm={() => { confirm(text.id) }}
                                    okText="Có"
                                    cancelText="Không"
                                    placement="topRight"
                                >
                                    <AiOutlineFileDone className="style__svg" />
                                </Popconfirm>
                            </Tooltip>
                        </div>
                    }
                }} />
            </Table>
        </div >
    )
}
