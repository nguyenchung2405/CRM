import React, { useEffect, useRef, useState } from "react";
import { Table , Space , Modal  , Tooltip , Input , Button , Popconfirm, message } from "antd";
import { FcPlus } from "react-icons/fc"
import { FaEdit,FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CUSTOMER_TYPE, CREATE_JOB_TYPE_LIST , GET_CUSTOMER_TYPE_LIST,DELETE_CUSTOMER_TYPE, GET_JOB_TYPE_LIST, DELETE_JOB_TYPE_LIST } from "../../title/title";
function CustomerTableType() {

    const dispatch = useDispatch();
    // Show Model
    const [renderDisPath,setRenderDisPath] = useState(false)
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isCreateType,setIsCreateType] = useState(false)
    const [isCreateTypeJob,setIsCreateTypeJob] = useState(false)
    const [typeCustomer,setTypeCustomer] = useState("")
    const [descCustomer,setDescCustomer] = useState("")
    const [ jobDesc ,setJobDesc] = useState("")
    const [typeJobName,setTypeJobName] = useState("")
    const [searchTypeCustomer,setSearchTypeCustomer] = useState("")
    const [searchTypeJob,setSeacrhTypeJob] = useState("")
    const {customerTypeList} = useSelector(state => state.customerReducer)
    const { jobTypeList } = useSelector(state => state.customerReducer)
    // Get 
    useEffect(()=>{
        dispatch({
            type:  GET_CUSTOMER_TYPE_LIST, 
            data: {}
        })        
        dispatch({
            type: GET_JOB_TYPE_LIST,
            data:{}
        })
    },[dispatch,renderDisPath])

    // Create type Customer
    const HandelChangeTypeNameCustomer = (e)=>{
        setTypeCustomer(e.target.value)
    }
    const HandelCreateTypeNameCustomer = ()=>{
        if(typeCustomer === ""){
            message.error("Nhập loại khách hàng!")
        }else{
            dispatch({
                type: CREATE_CUSTOMER_TYPE,
                data: {
                    name: typeCustomer,
                    desc: descCustomer
                }
            })   
            setTypeCustomer("")
            setIsCreateType(false)
            setRenderDisPath(!renderDisPath)
        }
    }

    // Delete type Customer
    const HandelDeleteTypeNameCustomer = (id)=>{
        dispatch({
            type: DELETE_CUSTOMER_TYPE,
            id
        })
        setRenderDisPath(!renderDisPath)
    }
    

    // Delete List Job
    const HandelDeleteTypeList = (id)=>{
        dispatch({
            type: DELETE_JOB_TYPE_LIST,
            id
        })
        setRenderDisPath(!renderDisPath)
    }

    // Handel create List Job
    const HandelChangeTypeJobList = (e)=>{
        setTypeJobName(e.target.value)
    }
    const HandelCreateTypeJob = ()=>{
        if(typeJobName !== ""){
            dispatch({
                type: CREATE_JOB_TYPE_LIST,
                data: {
                    name: typeJobName,
                    desc: jobDesc
                }
            })
            setTypeJobName("")
            setIsCreateTypeJob(false)
            setRenderDisPath(!renderDisPath)
        }else{
            message.error("Loại ngành nghề bị rỗng")
        }
    }

    // Search Customer
   const HandelSearchTypeCustomer = ()=>{
        if(searchTypeCustomer  !== ""){
            dispatch({
                type: GET_CUSTOMER_TYPE_LIST,
                data: {
                    name : searchTypeCustomer
                }
            })
        }else{
            message.error("Chưa có dữ liệu để tìm kiếm")
        }
   }

   // Empty Seacrh
   useEffect(()=>{
        if(searchTypeCustomer === ""){
            dispatch({
                type: GET_CUSTOMER_TYPE_LIST,
                data: {}
            })
        }
   },[searchTypeCustomer])
   const HandelChangeSearchJob = ()=>{
        if(searchTypeJob !== ""){
            dispatch({
                type: GET_JOB_TYPE_LIST,
                data: {
                    name: searchTypeJob
                }
            })
        }else{
            message.error("Chưa có dữ liệu để tìm kiếm")
        }
   }
   useEffect(()=>{
        if(searchTypeJob !== ""){
            dispatch({
                type: GET_JOB_TYPE_LIST,
                data: {}
            })
        }
   },[searchTypeJob])
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
                                <Button type="ghost" style={{backgroundColor: "green"}}>
                                    <FaEdit style={{color: "white"}} />
                                </Button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Popconfirm
                                title="Bạn có muốn xóa loại khách hàng này?"
                                description={"Bấm xác nhận để xóa quy trình"}
                                onConfirm={( )=>HandelDeleteTypeNameCustomer(item?.id)}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <Button type="ghost" style={{ backgroundColor: "red" }} >
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
                                <Button type="ghost" onClick={()=>{}} style={{backgroundColor: "green"}}>
                                    <FaEdit style={{color: "white"}} />
                                </Button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Popconfirm
                                title="Bạn có muốn xóa loại khách hàng này?"
                                description={"Bấm xác nhận để xóa quy trình"}
                                onConfirm={()=>HandelDeleteTypeList(item?.id)}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <Button type="ghost" style={{ backgroundColor: "red" }}  >
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

    const HandelClose = ()=>{
        setIsCreateType(false)
        setIsCreateTypeJob(false)
    }
    return ( 
        <div className="product__table product__TypeAndAtt__table content">
            {/* <Modal title="Thêm loại khách hàng" open={isModalOpen} onOk={handleOKModalType} okText={isCreateType ? "Thêm" : "Cập nhật"} cancelText="Hủy" onCancel={()=>{setIsModalOpen(false)}}>
                    <Input style={{height:44}} onChange={(e)=>{
                        let {value} = e.target;
                        setName(value);
                    }} ></Input>
            </Modal> */}
            <div className="" style={{backgroundColor:"white",padding: "10px", boxSizing:"border-box", display:"flex",justifyContent: "space-between"}} >
                <div className="custumer_type" style={{width:"50%",paddingRight: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại khách hàng</h2>
                        <Tooltip title="Thêm loại khách hàng" >
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } onClick={()=>{setIsCreateType(true)}} />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input onChange={(e)=>(setSearchTypeCustomer(e.target.value))} placeholder="Loại khách hàng"  style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button onClick={()=>{HandelSearchTypeCustomer()}} type="ghost" style={{height: 44, marginLeft:10 ,backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div className="" >
                        {isCreateType && 
                            <>
                                <div className="" style={{display:"flex",width: "100%"}} >
                                    <Input placeholder="Nhập loại khách hàng" onChange={(e)=>{HandelChangeTypeNameCustomer(e)}} value={typeCustomer} style={{width:"60%" , marginTop: "20px", height: 40}} />
                                    <div className="" style={{width:"60%" , marginTop: "20px" , marginLeft: 10, height: 35,display: "flex",} }>
                                        <Button style={{height: 35 , border:"none" , padding:5}} onClick={()=>{HandelCreateTypeNameCustomer()}} >Lưu</Button>
                                        <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                                    </div>
                                </div>
                                <div className="" style={{width: '100%'}}>
                                    <textarea className="textarea-desc" value={descCustomer} onChange={(e)=>{setDescCustomer(e.target.value)}} style={{width: "100%",marginTop: 20,height: 150, paddingLeft: 10 , paddingTop: 10}} placeholder="Mô tả" />
                                </div>
                            </>
                            
                        }
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table className="customerType_table"  columns={columns} dataSource={customerTypeList} />
                    </div>
                </div>
                <div className="custumer_type" style={{width:"50%",paddingLeft: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại ngành nghề</h2>
                        <Tooltip title="Thêm loại khách hàng"  >
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } onClick={()=>{setIsCreateTypeJob(true)}} />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input placeholder="Loại ngành nghề" value={searchTypeJob} onChange={(e)=>{(setSeacrhTypeJob(e.target.value))}} style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button onClick={()=>{HandelChangeSearchJob()}} type="ghost" style={{height: 44, marginLeft:10, backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div>
                        {isCreateTypeJob && 
                            <>
                                <div className="" style={{display:"flex",width: "100%"}} >
                                    <Input placeholder="Nhập loại ngành nghề" onChange={(e)=>{HandelChangeTypeJobList(e)}} value={typeJobName} style={{width:"60%" , marginTop: "20px", height: 40}} />
                                    <div className="" style={{width:"60%" , marginTop: "20px" , marginLeft: 10, height: 35,display: "flex",} }>
                                        <Button style={{height: 35 , border:"none" , padding:5}} onClick={()=>{HandelCreateTypeJob()}} >Lưu</Button>
                                        <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                                    </div>
                                </div>
                                <div className="" style={{width: '100%'}}>
                                    <textarea className="textarea-desc" value={jobDesc} onChange={(e)=>{setJobDesc(e.target.value)}} style={{width: "100%",marginTop: 20,height: 150, paddingLeft: 10 , paddingTop: 10}} placeholder="Mô tả" />
                                </div>
                               
                            </>
                        }
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table className="customerType_table"  columns={columnsJobType} dataSource={jobTypeList} />
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