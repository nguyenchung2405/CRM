import React, { useState, useEffect } from 'react';
import { Space, Table, Badge, Dropdown, Button } from 'antd';
import { Input, Icon } from 'antd';
import { FcPlus } from "react-icons/fc"
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ChanelGChild from "./ChanelGChild"
import "./ChanelGComponent.css"
import CustomExpandIcon from "./CustomExpandIcon"
const ChanelGComponent = (props) => {
    let { handleAdd, formatDataChannelList, groupChannelList, handleSearchInput,
        isAdd, onPressEnter, onChange, groupChannelName,
        handleEditChannelG,
        handleDeleteChannelG,

        handleAddGroup,
        rowKeys,
        setRowKeys,
        onTableRowExpand,
        groupName,
        onChangeChild,
        onPressEnterChild,
        handleEditG,
        handleDeleteG
    } = props
    const columns = [
        {
            title: 'Kênh sản phẩm',
            dataIndex: 'name',
            key: 'id',
            render: (_, record) => (
                <div className="thaoTac">
                    {isAdd === true && (typeof (record.idAdd) === "number" && record.idAdd !== 0) ?
                        <div><Input value={groupChannelName} onChange={onChange} onPressEnter={() => onPressEnter(record.idAdd)} placeholder="Ten kenh" /></div>
                        : _}
                </div>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => (
                <div className="thaoTac">
                    <button className="btn__green" onClick={() => handleAddGroup(_)}>Thêm nhóm</button>
                    <MdOutlineModeEditOutline
                        onClick={() => handleEditChannelG(_)}
                    />
                    <MdDelete onClick={() => handleDeleteChannelG(_)} />
                </div>
            ),
        },
    ];
    return (
        <>
            <div className='customer__table content channel' style={{ color: "red" }}>
                <div className="table__features">
                    <div className="table__features__add">
                        <h1>Quản lý kênh</h1>
                        <FcPlus onClick={() => {
                            handleAdd()
                        }} />
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
                                }}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <div className='ant-table-wrapper'>
                    <Table
                        expandedRowKeys={rowKeys}
                        onExpand={onTableRowExpand}
                        rowkey="id"
                        dataSource={formatDataChannelList(groupChannelList)} columns={columns}
                        expandable={{
                            expandedRowRender: (record) => {
                                return <ChanelGChild data={record} isAdd={isAdd}
                                    onChangeChild={onChangeChild} onPressEnterChild={onPressEnterChild}
                                    groupName={groupName}
                                    handleEditG={handleEditG}
                                    handleDeleteG={handleDeleteG}
                                />
                            },
                            rowExpandable: (record) => record.channels.length != 0,
                            defaultExpandAllRows: true
                        }}
                    // expandIcon={p => <CustomExpandIcon
                    //     {...p}
                    //     setRowKeys={setRowKeys}
                    // />}
                    />
                </div>
            </div>
        </>
    );
}

export default ChanelGComponent;
