import React, { useState } from 'react'
import { Space, Table, Badge, Dropdown, Button } from 'antd';
import { FcPlus } from "react-icons/fc"
import { Input, Icon } from 'antd';
import { MdDelete, MdOutlineModeEditOutline, } from "react-icons/md";
import { } from "react-icons/fa"
import ChanelSubChild from './ChanelSubChild';

const ChanelGChild = (props) => {
    const { isAdd, groupName, onHandelRerenderComponient, onChangeChild, onPressEnterChild, handleEditG, handleDeleteG, handleClose } = props;

    const [isAddSubChild,setIsAddSubChild] = useState(false);
    const [idLocation,setIdLocation] = useState(0);
    const [showRowKey,setShowRowKey] = useState(false);
    const [data,setData] = useState(props?.data?.locations.map((x,index)=>{return {key: index+1,...x}}) || []);
    const [expendKeys, setExpended] = useState();
    // const data = props?.data?.locations.map((x,index)=>{return {key: index+1,...x}})

    const expend = async (i) => {
        const index = i + 1

        if (expendKeys === index){
            setExpended(undefined);  
        }else{
           await setExpended(index);
           await setIsAddSubChild(true);
        } 

            
    };


    const columns = [
        {
            title: 'Nhóm sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (

                <div className="thaoTac">
                    {isAdd === true && (typeof (record?.idAdd) === "number" && record.idAdd !== 0) ?
                        <div><Input value={groupName} onChange={onChangeChild}
                            // onPressEnter={() => onPressEnterChild(record.idAdd
                            //     , record.channel_ID
                            // )}
                            placeholder="Ten kenh" /></div>
                        : _}
                </div>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'create_date',
            key: 'create_date',
            render: (_, record) => (
                <div>
                    {props.toDDMMYY(_)}
                </div>
            ),
        },
        {
            title: '',
            dataIndex: 'desc',
            key: 'desc',
            render: (_, record) => {
                return (
                    <div style={{ textAlign: "end" }}> {isAdd === true && (typeof (record?.idAdd) === "number" && record.idAdd !== 0) ?
                        <div>
                            <button style={{ marginRight: "6px" }} className="btn__green" onClick={() => onPressEnterChild(record.idAdd, record.channel_ID)}>
                                OK
                            </button>
                            <button className="btn__green" onClick={() => handleClose(_)}>
                                Đóng
                            </button>
                        </div> : ""}
                    </div>
                )
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (_, record,index) => (
                <div className="thaoTac">
                    <button className="btn__green" onClick={() => expend(index)}>Thêm nhánh sản phẩm</button>
                    <MdOutlineModeEditOutline
                        onClick={() => handleEditG(_, record.channel_ID)}
                    />
                    <MdDelete onClick={() => handleDeleteG(_, record.channel_ID)} />
                </div>
            ),
        },
    ];

    const showExpandIcon = (record,index)=>{
          
            const { expanded, onExpand } = record;
            
            if(expanded){
                return <div onClick={(e) => onExpand(record)}>-</div>
            }
            else{
                return <div onClick={(e) => onExpand(record)}>+</div>
            }
    }

    const onHandelExpand = (expanded, record)=>{
        if(expanded){
            setExpended(undefined);
            setIsAddSubChild(false)
        }else{
            setExpended(record?.record.key);
        }
    }

    // console.log({expended});
    return <div style={{ width: "95%", margin: "0 auto" }}> 
                <Table 
                    expandedRowKeys={[expendKeys]}
                    onExpand={onHandelExpand}
                    columns={columns} 
                    dataSource={data} 
                    pagination={false} 
                    expandable={{
                        rowExpandable: (record) => true,
                        expandedRowRender: (recode)=>{
                            return (
                                <ChanelSubChild 
                                    data={recode} 
                                    onHandelRerenderComponient={onHandelRerenderComponient}
                                    isAddSubChild={isAddSubChild}
                                    idLocation={idLocation}
                                    setIsAddSubChild={setIsAddSubChild}
                                />
                            )
                        },
                    }}
                    // defaultExpandAllRows: true
                    expandIcon={record=>showExpandIcon(record)}
                    
                /> 
        </div>;
}

export default ChanelGChild