import React, { useEffect, useState } from "react";
import { Table , Space , Modal  , Tooltip , Input , Button , Popconfirm } from "antd";
import { FcPlus } from "react-icons/fc"
import { FaEdit,FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CUSTOMER_TYPE, GET_CUSTOMER_TYPE_LIST } from "../../title/title";
function CustomerTableType() {

    const dispatch = useDispatch();
    // Show Model
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isCreateType,setIsCreateType] = useState(false)
    const [name, setName] = useState("");
    const {customerTypeList} = useSelector(state => state.customerReducer)

    useEffect(()=>{
        dispatch({
            type: GET_CUSTOMER_TYPE_LIST,
            data: { page: 1, page_size: 100}
        })
    }, [dispatch])

    // Delete Type
    const confirmTypeCus = ()=>{

    }
    const columns = [
        {
          key: 1,
          width: "68%",
          title: <div className="title_cus_type" style={{textAlign:"center"}}>Loại khách hàng</div>,
          render: (item)=>{
            return(
                <div className="" style={{textAlign:"center"}}>
                    <p>{item.name}</p>
                </div>
            )
          }
        },
        {
          width: "30%",
          key: 2,
          title:<div className="title_cus_type" style={{textAlign:"center"}}>Chức năng</div>,
          render: (item)=>{
            return (
                <div className="btn_cus_type" style={{textAlign:"center"}}>
                    <Space>
                        <Tooltip title="Chỉnh sửa">
                                <Button type="ghost" onClick={()=>{setIsModalOpen(true); setIsCreateType(false)}} style={{backgroundColor: "green"}}>
                                    <FaEdit style={{color: "white"}} />
                                </Button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Popconfirm
                                title="Bạn có muốn xóa loại khách hàng này?"
                                description={"Bấm xác nhận để xóa quy trình"}
                                onConfirm={confirmTypeCus}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <Button type="ghost" style={{ backgroundColor: "red" }}>
                                    <FaTrash style={{ color: "white" }} />
                                </Button>
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                </div>
            )
          }
        },
    ];

    const columnsJobType = [
        {
          key: 1,
          width: "68%",
          title: <div className="title_cus_type" style={{textAlign:"center"}}>Loại ngành nghề</div>,
          render: (item)=>{
            return(
                <div className="" style={{textAlign:"center"}}>
                    <p>{item.name}</p>
                </div>
            )
          }
        },
        {
          width: "30%",
          key: 2,
          title:<div className="title_cus_type" style={{textAlign:"center"}}>Chức năng</div>,
          render: (item)=>{
            return (
                <div className="btn_cus_type" style={{textAlign:"center"}}>
                    <Space>
                        <Tooltip title="Chỉnh sửa">
                                <Button type="ghost" onClick={()=>{setIsModalOpen(true); setIsCreateType(false)}} style={{backgroundColor: "green"}}>
                                    <FaEdit style={{color: "white"}} />
                                </Button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Popconfirm
                                title="Bạn có muốn xóa loại khách hàng này?"
                                description={"Bấm xác nhận để xóa quy trình"}
                                onConfirm={confirmTypeCus}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <Button type="ghost" style={{ backgroundColor: "red" }}>
                                    <FaTrash style={{ color: "white" }} />
                                </Button>
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                </div>
            )
          }
        },
    ];
    const dataSourd = []

    const handleOKModalType = ()=>{
        if(isCreateType){
            dispatch({
                type: CREATE_CUSTOMER_TYPE,
                data: name
            })
        }
        setIsModalOpen(false)
    }

    return ( 
        <div className="product__table product__TypeAndAtt__table content">
            <Modal title="Thêm loại khách hàng" open={isModalOpen} onOk={handleOKModalType} okText={isCreateType ? "Thêm" : "Cập nhật"} cancelText="Hủy" onCancel={()=>{setIsModalOpen(false)}}>
                    <Input style={{height:44}} onChange={(e)=>{
                        let {value} = e.target;
                        setName(value);
                    }} ></Input>
            </Modal>
            <div className="" style={{backgroundColor:"white",padding: "10px", boxSizing:"border-box", display:"flex",justifyContent: "space-between"}} >
                <div className="custumer_type" style={{width:"50%",paddingRight: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại khách hàng</h2>
                        <Tooltip title="Thêm loại khách hàng" >
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } onClick={()=>{setIsModalOpen(true); setIsCreateType(true)}} />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input placeholder="Loại khách hàng" style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button type="ghost" style={{height: 44, marginLeft:10 ,backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table className="customerType_table"  columns={columns} dataSource={customerTypeList} />
                    </div>
                </div>
                <div className="custumer_type" style={{width:"50%",paddingLeft: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại ngành nghề</h2>
                        <Tooltip title="Thêm loại khách hàng">
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input placeholder="Loại khách hàng" style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button type="ghost" style={{height: 44, marginLeft:10, backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table className="customerType_table"  columns={columnsJobType} dataSource={dataSourd} />
                    </div>
                </div>
                {/* <div className="cusumer_attr">
                    <div className="custumer_title" >
                        <h2>Quản lý loại khách hàng</h2>
                        <Tooltip title="Thêm loại khách hàng">
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } />
                        </Tooltip>
                    </div>
                    <div className="custumer_search">
                        <Input placeholder="Loại khách hàng" />
                        <Button type="ghost" >Tìm kiếm</Button>
                    </div>
                    <div className="">
                        <Table  columns={columns} dataSource={dataSourd} />
                    </div>
                </div> */}
            </div>
        </div>
     );
}

export default CustomerTableType;