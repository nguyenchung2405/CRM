import React, { useState } from 'react'
import { Space, Table, Badge, Dropdown, Button, message } from 'antd';
import { FcPlus } from "react-icons/fc"
import { Input, Icon } from 'antd';
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { local,UPDATE_SUB_CHANEL,DELETE_SUB_CHANEL,GET_SUB_CHANAL,CREATE_SUB_CHANEL  } from '../../../title/title';
import { setGroupChannelSubList } from '../../../redux/features/groupChannelSlice';
import axios from "axios"
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';

const ChanelSubChild = ({data,isAddSubChild,onHandelRerenderComponient,setIsAddSubChild}) => {
    const dispatch = useDispatch()
    const [isEdit,setIsEdit] = useState(false);
    const [dataS,setDataS] = useState( data?.sub_locations || [])
    const [addSubChild,setAddSubChild] = useState("");
    const [addData,setAddData] = useState({
            name: "",
            desc: "",
            location_ID: 0
    })
    // const [dataSource,setDataSourch] = useState([])
    useEffect(()=>{
        dispatch({type: GET_SUB_CHANAL, data: {location_id:data?.id}})
    },[])
    
    var { groupChannelSubList } = useSelector((state) => state.groupChannelReducer)
    




    let dataSource
    if(isAddSubChild){
        groupChannelSubList = [addData,...groupChannelSubList]
        // dataSource = [ addData,...data?.sub_locations];
    }else{
        // dataSource = [...data?.sub_locations];
    }


    const [dataEdit,setDataEdit] = useState({
        isEdit: false,
        id : "",
        value: ""
    })


    const handleEditSub = async (record)=>{
        // dataEdit
        setDataEdit({
            ...dataEdit,
            isEdit: true,
            id: record.id,
            value: record.name,
            location_ID: record.location_ID
        })
    }

    const HandelEditSub = (v)=>{
        setDataEdit({
            ...dataEdit,
            value: v
        })
        
    }

    const HandelSaveEdit = async ()=>{
        if(isEdit !== ""){
            const dataUpdate = {
                id: dataEdit.id,
                name : dataEdit.value,
                desc : dataEdit.value,
                location_ID: dataEdit.location_ID,
            }

            const subLocationsData = dataS.map((x)=>{
                return x.id === dataEdit.id ? dataUpdate : x;
            })

            await  dispatch({
                type: UPDATE_SUB_CHANEL,
                data : dataUpdate
            })

            setDataS(subLocationsData)
            
            // await dispatch({
            //     type: GET_GROUP_CHANNEL,
            //     data: { page: 1, pageNumber: 1000, name: "", location_name: "" }
            // })
            onHandelRerenderComponient()
            
            setDataEdit({...dataEdit,isEdit: false})

        }else{
            message.error("Dữ liệu trống");
        }
    }

    const handleDeleteSub = (id)=>{
        if(!id){
            // 
        }else{
            dispatch({
                type : DELETE_SUB_CHANEL,
                data : id,
            })
        }
    }

    const HandelChangeAddSubChild = (e)=>{
        setAddSubChild(e.target.value)
    }
    const HandelSaveAddSubChild = async ()=>{
        if(addSubChild === ""){
            message.warning("Nhập tên nhánh sản phẩm")
        }else{
           await dispatch({type:CREATE_SUB_CHANEL, data: { name: addSubChild , desc: addSubChild, location_ID: data?.id }})
        //    await dispatch({ type: GET_GROUP_CHANNEL, data: { page: 1, pageNumber: 1000, name: "", location_name: "" }})
         
           setAddSubChild("");
           
        }
    }


    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (

                <div className="thaoTac">
                    {isAddSubChild ?
                            <>
                                {record?.name === "" 
                                    ?
                                    <Input placeholder='Tên nhánh sản phẩm' value={addSubChild} onChange={(e)=> HandelChangeAddSubChild(e)} />
                                    :
                                    <p>{record.name}</p>
                                }
                            </>
                        :
                        <>
                            {/* <p>{record.name}</p> */}
                         {dataEdit.isEdit === true && dataEdit.id === record.id ?
                                <div><Input value={dataEdit.value} onChange={(e)=>{HandelEditSub(e.target.value)}} o
                                    // nPressEnter={() => onPressEnterChild(record.idAdd
                                    //     , record.channel_ID
                                    // )}
                                    placeholder="Tên nhánh kênh" /></div>
                                : <p>{record?.name}</p>}
                        
                        </>

                    }
                </div>
            ),
        },
        // {
        //     title: 'Ngày tạo',
        //     dataIndex: 'create_date',
        //     key: 'create_date',
        //     render: (_, chanel) => (
        //         <div>
                    
        //         </div>
        //     ),
        // },
        {
            title: '',
            dataIndex: 'desc',
            key: 'desc',
            render: (_, record) => {
                return (
                    <>
                        {isAddSubChild  && record.location_ID === 0 ? 
                            <div style={{ textAlign: "end" }}>
                                <div>
                                    <button style={{ marginRight: "6px" }} onClick={()=>HandelSaveAddSubChild()} className="btn__green" >
                                        Lưu
                                    </button>
                                    <button className="btn__green" onClick={()=>{setIsAddSubChild(false)}}>
                                        Đóng
                                    </button>
                                </div>
                            </div>
                            :
                            <div style={{ textAlign: "end" }}> {dataEdit.isEdit === true && dataEdit.id === record.id ?
                                <div>
                                    <button style={{ marginRight: "6px" }} onClick={()=>{HandelSaveEdit()}} className="btn__green" >
                                        OK
                                    </button>
                                    <button className="btn__green" onClick={()=>{setDataEdit({...dataEdit, isEdit: false})}}>
                                        Đóng
                                    </button>
                                </div> : ""}
                            </div>
                        }
                    
                    </>
                )
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => (
                <div className="thaoTac">
                    <MdOutlineModeEditOutline
                        onClick={() => handleEditSub(record)}
                    />
                    <MdDelete 
                        onClick={() => handleDeleteSub(record.id)} 
                    />
                </div>
            ),
        },
    ];


    return <div style={{ width: "95%", margin: "0 auto" }}> 
                <Table 
                
                    columns={columns} 
                    dataSource={groupChannelSubList} 
                    // dataSource={dataSource} 
                    pagination={false} 

                    // expandable={{
                    //     expandedRowRender: (recode)=>{
                    //         console.log({recode}); // get componient cua data
                            
                    //     }

                    // }}
                /> 
        </div>;
}

export default ChanelSubChild