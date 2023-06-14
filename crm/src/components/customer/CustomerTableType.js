import React, { useEffect, useRef, useState } from "react";
import { Table , Space   , Tooltip , Input , Button , Popconfirm, message, Spin } from "antd";
import { FcPlus } from "react-icons/fc"
import { FaEdit,FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/features/loadingSlice";
import { UPDATE_CUSTOMER_TYPE, UPDATE_JOB_TYPE_LIST ,CREATE_CUSTOMER_TYPE, CREATE_JOB_TYPE_LIST , GET_CUSTOMER_TYPE_LIST,DELETE_CUSTOMER_TYPE, GET_JOB_TYPE_LIST, DELETE_JOB_TYPE_LIST } from "../../title/title";
function CustomerTableType() {

    const dispatch = useDispatch();
    // Show Model
    const [isCreateType,setIsCreateType] = useState(false)
    const [isCreateTypeJob,setIsCreateTypeJob] = useState(false)
    const [typeCustomer,setTypeCustomer] = useState("")
    const [descCustomer,setDescCustomer] = useState("")
    const [ jobDesc ,setJobDesc] = useState("")
    const [typeJobName,setTypeJobName] = useState("")
    const [editValueCustomer,setEditValueCustomer] = useState("")
    const [editValueJob,setEditValueJob] = useState("")
    const [searchTypeCustomer,setSearchTypeCustomer] = useState("")
    const [searchTypeJob,setSeacrhTypeJob] = useState("")
    const [editCustomer,setEditCustomer] = useState({
        is_disable: false,
        custumer_id: ""
    })
    const [editJob,setEditJob] = useState({
        is_disable:false,
        job_id : ""
    })
    const [idEdit,setIdEdit] = useState({
        
    })

    const {customerTypeList} = useSelector(state => state.customerReducer)
    const { jobTypeList } = useSelector(state => state.customerReducer)
    const { totalListPage } = useSelector(state => state.customerReducer)
    const { totalListPageTypeCus } = useSelector(state => state.customerReducer)
    const { isLoading } = useSelector(state => state.loadingReducer)
    
    const [pageJobType,setPageJobType] = useState({
        pageCurrent: 1,
        pageSize: 10
    })

    const [pageTypeCus, setPageTypeCus] = useState({
        pageCurrent: 1,
        pageSize: 10,
    })
    const [dataTypeCustomer , setDataTypeCustomer] = useState({ page_size: "10", page: "1", name: "", sort_by: "id", asc_order: false,})
    const [dataTypeJob , setDataTypeJob] = useState({ page_size: "10", page: "1", name: "", sort_by: "id", asc_order: false,})



    const inputJob = useRef(null);

    // <---------------------------------------Type Customer-------------------------------> // 

    // GET DATA CUSTUMER
    const getDataCustumer = ()=>{
        dispatch({
            type:  GET_CUSTOMER_TYPE_LIST, 
            data: {
                ...dataTypeCustomer,
                page_size: pageTypeCus.pageSize,
                page: pageTypeCus.pageCurrent
            }
        })  
    }
    useEffect(()=>{
        getDataCustumer()
    },[pageTypeCus])

    // CREATE DATA CUSTUMER
    const HandelChangeTypeNameCustomer = (e)=>{
        setTypeCustomer(e.target.value)
    }
    
    const HandelCreateTypeNameCustomer = ()=>{
        if(typeCustomer === ""){
            message.error("Vui lòng nhập loại khách hàng")
        }else{
            dispatch({
                type: CREATE_CUSTOMER_TYPE,
                data: {
                    name: typeCustomer,
                    desc: descCustomer
                },
            })
            dispatch(setIsLoading(true))
            setTypeCustomer("")
            setIsCreateType(false)
            
        }
    }
    
    // DELETE TYPE CUSTOMER
    const HandelDeleteTypeNameCustomer = (id)=>{
        if(id){
            dispatch({
                type: DELETE_CUSTOMER_TYPE,
                id
            })
            dispatch(setIsLoading(true))
        }
    }

    // SEARCH TYPE CUSTUMER 
    const HandelChangeSearchTypeCus = (e)=>{
        setSearchTypeCustomer(e.target.value)
        if(e.target.value === ""){
            getDataCustumer()
        }
    }

    const HandelSearchTypeCustomer = ()=>{
        if(searchTypeCustomer === ""){
            message.error("Vui lòng nhập dữ liệu để tìm kiếm")
        }else{
            dispatch({
                type: GET_CUSTOMER_TYPE_LIST,
                data: {
                    ...dataTypeCustomer,
                    name : encodeURI(`${searchTypeCustomer}`)
                }
            })
            dispatch(setIsLoading(true))
        }
    }
    

    const HandelKeyPressCus = (e)=>{
        if(e.key === "Enter"){
            HandelSearchTypeCustomer()
            dispatch(setIsLoading(true))
        }
    }
  //<---------------------------------------------------TYPE JOB----------------------------------------> //

   const getDataTypeJob = ()=>{
        dispatch({
            type: GET_JOB_TYPE_LIST,
            data: {
                ...dataTypeJob,
                page_size: pageJobType.pageSize,
                page: pageJobType.pageCurrent
            }
        })
   }    

   // GET DATA TYPE JOB
   useEffect(()=>{
        getDataTypeJob()
   },[pageJobType])

   // CREATE DATA TYPE JOB
   const HandelChangeTypeJobList = (e)=>{
       setTypeJobName(e.target.value)
   }
   const HandelCreateTypeJob = ()=>{
        if(typeJobName === ""){
            message.error("Vui lòng nhập dữ liệu để tạo")
        }else{
            dispatch({
                type: CREATE_JOB_TYPE_LIST,
                data: {
                    name: encodeURI(`${typeJobName}`),
                    desc: jobDesc
                }
            })
            dispatch(setIsLoading(true))
            setTypeJobName("")
            setIsCreateTypeJob(false)
        }
    }

    // DELETE TYPE JOB
    const HandelDeleteTypeList = (id)=>{
        if(id){
            dispatch({
                type: DELETE_JOB_TYPE_LIST,
                id
            })
            dispatch(setIsLoading(true))
        }
    }

    // SEARCH TYPE JOB
    const HandelChangeSearchJob = ()=>{
        if(searchTypeJob === ""){
            message.warn("Vui lòng nhập thông tin để tìm kiếm")
        }else{
            dispatch({
                type: GET_JOB_TYPE_LIST,
                data: {
                    ...dataTypeJob,
                    name: encodeURI(`${searchTypeJob}`)
                }
            })
            dispatch(setIsLoading(true))
        }
    }

    // HANDEL ENTER
    const HandelKeyPressJob = (e)=>{
        if(e.key === "Enter"){
            HandelChangeSearchJob()  
            dispatch(setIsLoading(true)) 
        }
    }

    const HandelChangeSearchTypeJob = (e)=>{
        setSeacrhTypeJob(e.target.value)
        if(e.target.value === ""){
            getDataTypeJob()
        }
    }
    

    // HANDEL EDIT TYPE CUSTOMER
    const HandelEditTypeCus = (item)=>{
        setEditCustomer({
            ...editCustomer,
            custumer_id: item.id,
            is_disable : true
        })
        setEditValueCustomer(item?.name)
    }

    // UPDATE CUSTOMER 
    const HandelUpdateTypeCustomer = (item)=>{
        dispatch({
            type: UPDATE_CUSTOMER_TYPE,
            data: {
                ...item,
                name: editValueCustomer
            }
        })
        setEditCustomer({
            ...editCustomer,
            custumer_id: "",
            is_disable : false
        })
        setEditValueCustomer("")
    }

    // UPDATE JOB
    const HandelEditJob = (item)=>{
        setEditJob({
            ...editJob,
            is_disable: true,
            job_id: item.id
        })
        setEditValueJob(item.name)
    }

    const HandelUpdateJob = (item)=>{
        dispatch({
            type: UPDATE_JOB_TYPE_LIST,
            data: {
                ...item,
                name: editValueJob
            }
        })
        setEditJob({
            ...editJob,
            is_disable: false,
            job_id: "1"
        })
    }
    const columns = [
        {
          key: 1,
          width: "68%",
          title: <div className="title_cus_type" style={{textAlign:"center"}}>Loại khách hàng</div>,
          render: (item)=>{
            return(
                <>
                    {isCreateType && item?.create ?
                        <>
                            <div className="" style={{display:"flex",width: "100%",textAlign:"center"}} >
                                    <Input placeholder="Nhập loại khách hàng" onChange={(e)=>{HandelChangeTypeNameCustomer(e)}} value={typeCustomer} style={{width:"100%" , marginTop: "0", height: 40}} />
                            </div>
                        </>
                        : editCustomer.is_disable && editCustomer.custumer_id === item.id ? (
                            <div className="" style={{display:"flex",width: "100%",textAlign:"center"}} >
                                    <Input onChange={(e)=>{setEditValueCustomer(e.target.value)}}  value={editValueCustomer} style={{width:"100%" , marginTop: "0", height: 40}} />
                            </div>
                        ) 
                        :
                        (    
                            <div className="" style={{textAlign:"center"}}>
                                <p>{item.name}</p>
                            </div>
                        )
                    }
                </>
            )
          }
        },
        {
          width: "30%",
          key: 2,
          title:<div className="title_cus_type" style={{textAlign:"center"}}>Chức năng</div>,
          render: (item)=>{
            return (
                <>
                    {isCreateType && item?.create ? (
                        <>
                            <div className="" style={{width:"0%" , marginTop: "0", height: 40,display: "flex", textAlign:"center" } }>
                                <Button style={{height: 35 , border:"none" , padding:5, marginRight: 10}} onClick={()=>{HandelCreateTypeNameCustomer()}} >Lưu</Button>
                                <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                            </div>
                        </>
                    ) : editCustomer.is_disable && editCustomer.custumer_id === item.id ? 
                            (
                                <div className="" style={{width:"0%" , marginTop: "0", height: 40,display: "flex", textAlign:"center" } }>
                                    <Button style={{height: 35 , border:"none" , padding:5, marginRight: 10}} onClick={()=>{HandelUpdateTypeCustomer(item)}}  >Lưu</Button>
                                    <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                                </div>
                            )

                            :
                        <div className="btn_cus_type" style={{textAlign:"center"}}>
                            <Space>
                                <Tooltip title="Chỉnh sửa">
                                        <Button type="ghost" onClick={()=>HandelEditTypeCus(item)} style={{backgroundColor: "green"}}>
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
                    }
                </>
            )
          }
        },
    ];
    
    const columnsJobType = [
        {
          key: 1,
          width: "68%",
          title: <div className="title_cus_type" style={{textAlign:"center"}}>Loại ngành nghề</div>,
          render: (item,index)=>{
            
            return(
                <>
                    {isCreateTypeJob && item?.create ? 
                        (
                            <div className="" style={{display:"flex",width: "100%"}} >
                                <Input placeholder="Nhập loại ngành nghề" onChange={(e)=>{HandelChangeTypeJobList(e)}} value={typeJobName} style={{width:"100%" , marginTop: "0", height: 40}} />
                            </div>
                        )
                        : editJob.is_disable && editJob.job_id === item.id ? 
                        ( 
                            <div className="" style={{display:"flex",width: "100%"}} >
                                <Input onChange={(e)=>{setEditValueJob(e.target.value)}} value={editValueJob} style={{width:"100%" , marginTop: "0", height: 40}} />
                            </div>
                        )
                        :
                        (
                            <div className="" style={{textAlign:"center"}}>
                                <p>{item.name}</p>
                            </div>
                        )
                    }
                </>
                
            )
          }
        },
        {
          width: "30%",
          key: 2,
          title:<div className="title_cus_type" style={{textAlign:"center"}}>Chức năng</div>,
          render: (item)=>{
            return (
                <>
                    {isCreateTypeJob && item?.create ? 
                        (
                            <div className="" style={{width:"60%" , marginTop: "0" , marginLeft: 10, height: 35,display: "flex",} }>
                                <Button style={{height: 35 , border:"none" , padding:5, marginRight:10}} onClick={()=>{HandelCreateTypeJob()}} >Lưu</Button>
                                <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                            </div>
                        )
                        : editJob.is_disable && editJob.job_id === item.id ? 
                        (
                            <div className="" style={{width:"60%" , marginTop: "0" , marginLeft: 10, height: 35,display: "flex",} }>
                                <Button style={{height: 35 , border:"none" , padding:5, marginRight:10}} onClick={()=>HandelUpdateJob(item)} >Lưu</Button>
                                <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                            </div>
                        )
                        :
                        (
                            <div className="btn_cus_type" style={{textAlign:"center"}}>
                                <Space>
                                    <Tooltip title="Chỉnh sửa">
                                            <Button type="ghost" onClick={()=>{HandelEditJob(item)}} style={{backgroundColor: "green"}}>
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
                </>
            )
          }
        },
    ];

    const HandelClose = ()=>{
        setIsCreateType(false)
        setIsCreateTypeJob(false)
        setEditCustomer({
            ...editCustomer,
            is_disable: false,
            custumer_id: ""
        })
        setEditJob({
            ...editJob,
            is_disable: false,
            job_id: ""
        })
    }

    return ( 
        <div className="product__table product__TypeAndAtt__table content" style={{position:"relative",}}>
            <Spin spinning={isLoading}>
            <div className="" style={{backgroundColor:"white",padding: "10px", boxSizing:"border-box", display:"flex",justifyContent: "space-between"}} >
                <div className="custumer_type" style={{width:"50%",paddingRight: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại khách hàng</h2>
                        <Tooltip title="Thêm loại khách hàng" >
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } onClick={()=>{setIsCreateType(true);}} />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input ref={inputJob} onKeyPress={(e)=>HandelKeyPressCus(e)} onChange={(e)=>(HandelChangeSearchTypeCus(e))} value={searchTypeCustomer} placeholder="Loại khách hàng"  style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button onClick={()=>{HandelSearchTypeCustomer()}} type="ghost" style={{height: 44, marginLeft:10 ,backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div className="" >
                        {false && 
                            <>
                                <div className="" style={{display:"flex",width: "100%"}} >
                                    <Input placeholder="Nhập loại khách hàng" onChange={(e)=>{HandelChangeTypeNameCustomer(e)}} value={typeCustomer} style={{width:"60%" , marginTop: "20px", height: 40}} />
                                    <div className="" style={{width:"60%" , marginTop: "20px" , marginLeft: 10, height: 35,display: "flex",} }>
                                        <Button style={{height: 35 , border:"none" , padding:5}} onClick={()=>{HandelCreateTypeNameCustomer()}} >Lưu</Button>
                                        <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                                    </div>
                                </div>
                                <div className="" style={{width: '100%'}}>
                                    <Input className="textarea-desc" value={descCustomer} onChange={(e)=>{setDescCustomer(e.target.value)}} style={{width: "100%",marginTop: 20,height: 40, paddingLeft: 10 }} placeholder="Mô tả" />
                                </div>
                            </>
                            
                        }
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table 
                            className="customerType_table"  
                            columns={columns} 
                            pagination={{ 
                                defaultPageSize: 10,
                                total: totalListPageTypeCus.total_data,
                                pageSizeOptions: [10,20,30,50,100],
                                defaultCurrent: 1,
                                showSizeChanger:true,
                                position: ["bottomRight"],
                                onChange: (pageTable,pageNumber)=>{
                                    setPageTypeCus({
                                        ...pageTypeCus,
                                        pageCurrent: pageTable,
                                        pageSize: pageNumber
                                    })
                                },
                            }} 
                            dataSource={ isCreateType ? [{ create: true } ,...customerTypeList] : [...customerTypeList]} />
                            {/* dataSource={ customerTypeList  } /> */}
                    </div>
                </div>
                <div className="custumer_type" style={{width:"50%",paddingLeft: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại ngành nghề</h2>
                        <Tooltip title="Thêm loại khách hàng"  >
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } onClick={()=>{ setIsCreateTypeJob(true);}} />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input onKeyPress={(e)=>{HandelKeyPressJob(e)}} placeholder="Loại ngành nghề" value={searchTypeJob} onChange={(e)=>{HandelChangeSearchTypeJob(e)}} style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button onClick={()=>{HandelChangeSearchJob()}} type="ghost" style={{height: 44, marginLeft:10, backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div>
                        {false && 
                            <>
                                <div className="" style={{display:"flex",width: "100%"}} >
                                    <Input placeholder="Nhập loại ngành nghề" onChange={(e)=>{HandelChangeTypeJobList(e)}} value={typeJobName} style={{width:"60%" , marginTop: "20px", height: 40}} />
                                    <div className="" style={{width:"60%" , marginTop: "20px" , marginLeft: 10, height: 35,display: "flex",} }>
                                        <Button style={{height: 35 , border:"none" , padding:5}} onClick={()=>{HandelCreateTypeJob()}} >Lưu</Button>
                                        <Button style={{height: 35,border:"none", color:"red",padding:5}} onClick={()=>HandelClose()} >Hủy</Button>
                                    </div>
                                </div>
                                <div className="" style={{width: '100%'}}>
                                    <Input className="textarea-desc" value={jobDesc} onChange={(e)=>{setJobDesc(e.target.value)}} style={{width: "100%",marginTop: 20,height: 40, paddingLeft: 10}} placeholder="Mô tả" />
                                </div>
                            </>
                        }
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table 
                            className="customerType_table" 
                            pagination={{ 
                                defaultPageSize: 10,
                                total:totalListPage?.total_data, 
                                pageSizeOptions: [10,20,30,50,100],
                                defaultCurrent: 1,
                                showSizeChanger:true,
                                position: ["bottomRight"],
                                onChange: (pageTable,pageNumber)=>{
                                    // console.log({pageTable,pageNumber})
                                    setPageJobType({
                                        ...pageJobType,
                                        pageCurrent: pageTable,
                                        pageSize: pageNumber
                                    })
                                },
                            }}
                            columns={columnsJobType} 
                            dataSource={ isCreateTypeJob ? [{ create: true } ,...jobTypeList] : jobTypeList} 
                        />
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
            </Spin>
        </div>
     );
}

export default CustomerTableType;