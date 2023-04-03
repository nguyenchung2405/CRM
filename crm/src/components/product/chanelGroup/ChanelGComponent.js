import React, { useState } from 'react';
import { Space, Table, Badge, Dropdown } from 'antd';
import { FcPlus } from "react-icons/fc"
import { DownOutlined } from '@ant-design/icons';
const items = [
    {
        key: '1',
        label: 'Action 1',
    },
    {
        key: '2',
        label: 'Action 2',
    },
];
const ChanelGComponent = () => {
    const dataSource = [
        {
            key: '1',
            chanel: 'Mike',
            group: '10 Downing Street',
        },
        {
            key: '2',
            chanel: 'John',
            group: '10 Downing Street',
            description: "abc"
        },
    ];

    const columns = [
        {
            title: 'Kênh sản phẩm',
            dataIndex: 'chanel',
            key: 'chanel',
        },
        {
            title: 'Nhóm sản phẩm',
            dataIndex: 'group',
            key: 'group',
        },
    ];
    const [search, setSearch] = useState({ name: "", tax_number: "" })
    const handleSearchInput = (e) => {
        let { value, name } = e.target;
        setSearch({
            ...search,
            [name]: value
        })
    }
    const expandedRowRender = () => {
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
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <Space size="middle">
                    </Space>
                ),
            },
        ];
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    return (
        <>
            <div className='customer__table content' style={{ color: "red" }}>
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Quản lý kênh</h1>
                        <FcPlus onClick={() => {
                            // setIsShowModal(true)
                        }} />
                        {/* <ModalCustomer
                            title="Khách hàng mới"
                            isShowModal={isShowModal}
                            setIsShowModal={setIsShowModal} /> */}
                    </div>
                    <div className="table__features__search">
                        <input placeholder="Tên kênh" type="text"
                            name="name"
                            onChange={handleSearchInput} />
                        <input placeholder="Nhóm" type="text"
                            name="tax_number"
                            onChange={handleSearchInput}
                        />
                        <div className="table__features__search__btn">
                            <button
                                onClick={() => {
                                    // dispatch({
                                    //     type: SEARCH_CUSTOMER,
                                    //     searchData: search
                                    // })
                                }}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <div className='ant-table-wrapper'>
                    <Table dataSource={dataSource} columns={columns}
                        expandable={{
                            expandedRowRender,
                            rowExpandable: (record) => record.description != undefined,
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default ChanelGComponent;
