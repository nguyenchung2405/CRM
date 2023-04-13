import React, { useState } from "react";
import { Table , Space , Modal  , Tooltip , Input , Button , Popconfirm } from "antd";
import { FcPlus } from "react-icons/fc"
import { FaEdit,FaTrash } from "react-icons/fa"
function CustomerTableType() {
    // Show Model
    const [isModalOpen,setIsModalOpen] = useState(false)


    // Delete Type
    const confirmTypeCus = ()=>{

    }
    const columns = [
        {
          key: 1,
          width: "68%",
          title: <div className="title_cus_type" style={{textAlign:"center"}}>Loại</div>,
          render: (item)=>{
            return(
                <div className="" style={{textAlign:"center"}}>
                    <p>Khách hàng loại A</p>
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
                                <Button type="ghost" onClick={()=>{setIsModalOpen(true)}} style={{backgroundColor: "green"}}>
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
                            <Button type="ghost" style={{backgroundColor: "red"}}>
                                <FaTrash style={{color: "white"}}/>
                            </Button>
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                </div>
            )
          }
        },
      ];
    const dataSourd = [
        {
            name: "khang",
            age: "1"
        },
        {
            name: "khang",
            age: "1"
        },
        {
            name: "khang",
            age: "1"
        }
    ]
    return ( 
        <div className="product__table product__TypeAndAtt__table content">
            <Modal title="Thêm loại khách hàng" open={isModalOpen} onOk={"handleOk"} okText="Thêm" cancelText="Hủy" onCancel={()=>{setIsModalOpen(false)}}>
                    <Input style={{height:44}}></Input>
            </Modal>
            <div className="" style={{backgroundColor:"white",padding: "10px", boxSizing:"border-box", display:"flex",justifyContent: "space-between"}} >
                <div className="custumer_type" style={{width:"50%",paddingRight: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại khách hàng</h2>
                        <Tooltip title="Thêm loại khách hàng" >
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } onClick={()=>{setIsModalOpen(true)}} />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input placeholder="Loại khách hàng" style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button type="ghost" style={{height: 44, marginLeft:10 ,backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table className="customerType_table"  columns={columns} dataSource={dataSourd} />
                    </div>
                </div>
                <div className="custumer_type" style={{width:"50%",paddingLeft: 20,boxSizing: "border-box" ,borderRight: 1}}>
                    <div className="custumer_title" >
                        <h2>Quản lý loại khách hàng</h2>
                        <Tooltip title="Thêm loại khách hàng">
                            <FcPlus style={{cursor:"pointer",fontSize:20, marginLeft:5} } />
                        </Tooltip>
                    </div>
                    <div className="custumer_search" style={{display: "flex",justifyContent:""}}>
                        <Input placeholder="Loại khách hàng" style={{padding: 10,boxSizing:"border-box", width:"60%"}}  />
                        <Button type="ghost" style={{height: 44, marginLeft:10, backgroundColor:"#29B171" ,color:"white", fontWeight: "bold" ,boxSizing:"border-box", width:"18%"}} >Tìm kiếm</Button>
                    </div>
                    <div className="customerType" style={{marginTop: 20}}>
                        <Table className="customerType_table"  columns={columns} dataSource={dataSourd} />
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