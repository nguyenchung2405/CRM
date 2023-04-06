import React from 'react'
import { Space, Table, Badge, Dropdown, Button } from 'antd';
import { FcPlus } from "react-icons/fc"
import { Input, Icon } from 'antd';
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
const ChanelGChild = (props) => {
    const { isAdd, groupName, onChangeChild, onPressEnterChild, handleEditG, handleDeleteG } = props;
    const columns = [
        {
            title: 'Nhóm sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (

                <div className="thaoTac">
                    {console.log(record)}
                    {isAdd === true && (typeof (record?.idAdd) === "number" && record.idAdd !== 0) ?
                        <div><Input value={groupName} onChange={onChangeChild} onPressEnter={() => onPressEnterChild(record.idAdd
                            , record.group_channel_ID
                        )} placeholder="Ten kenh" /></div>
                        : _}
                </div>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => (
                <div className="thaoTac">
                    <MdOutlineModeEditOutline
                        onClick={() => handleEditG(_, record.group_channel_ID)}
                    />
                    <MdDelete onClick={() => handleDeleteG(_, record.group_channel_ID)} />
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
    return <div style={{ width: "95%", margin: "0 auto" }}> <Table columns={columns} dataSource={props?.data?.channels} pagination={false} /> </div>;
}

export default ChanelGChild