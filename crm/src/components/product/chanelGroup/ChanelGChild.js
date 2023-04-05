import React from 'react'
import { Space, Table, Badge, Dropdown, Button } from 'antd';
import { FcPlus } from "react-icons/fc"
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
const ChanelGChild = (props) => {
    // console.log(props.data)
    const columns = [
        {
            title: 'Nhóm sản phẩm',
            dataIndex: 'group',
            key: 'group',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'create_group',
            key: 'create_group',
        },
        {
            title: 'Thao tác',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
            render: (_, record) => (
                <div className="thaoTac">
                    <MdOutlineModeEditOutline />
                    <MdDelete />
                </div>
            ),
        },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            group: 'TT ngày',
            date: '2014-12-24 23:12:00',
            upgradeNum: 'Upgraded: 56',
        });
    }
    data[1].group = "TTCT"
    data[2].group = "TT Xuân, Đặc sang 30/4"
    return <div style={{ width: "95%", margin: "0 auto" }}> <Table columns={columns} dataSource={data} pagination={false} /> </div>;
}

export default ChanelGChild