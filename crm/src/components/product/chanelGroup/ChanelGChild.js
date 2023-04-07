import React from 'react'
import { Space, Table, Badge, Dropdown, Button } from 'antd';
import { FcPlus } from "react-icons/fc"
import { Input, Icon } from 'antd';
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
const ChanelGChild = (props) => {
    const { isAdd, groupName, onChangeChild, onPressEnterChild, handleEditG, handleDeleteG, handleClose } = props;
    const columns = [
        {
            title: 'Nhóm sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (

                <div className="thaoTac">
                    {isAdd === true && (typeof (record?.idAdd) === "number" && record.idAdd !== 0) ?
                        <div><Input value={groupName} onChange={onChangeChild} o
                            // nPressEnter={() => onPressEnterChild(record.idAdd
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
            render: (_, record) => (
                <div className="thaoTac">
                    <MdOutlineModeEditOutline
                        onClick={() => handleEditG(_, record.channel_ID)}
                    />
                    <MdDelete onClick={() => handleDeleteG(_, record.channel_ID)} />
                </div>
            ),
        },
    ];

    // const data = [];
    // for (let i = 0; i < 3; ++i) {
    //     data.push({
    //         key: i.toString(),
    //         group: 'TT ngày',
    //         date: '2014-12-24 23:12:00',
    //         upgradeNum: 'Upgraded: 56',
    //     });
    // }
    // data[1].group = "TTCT"
    // data[2].group = "TT Xuân, Đặc sang 30/4"
    return <div style={{ width: "95%", margin: "0 auto" }}> <Table columns={columns} dataSource={props?.data?.locations} pagination={false} /> </div>;
}

export default ChanelGChild