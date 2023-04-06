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
    let { handleAdd, formatDataChannelList, groupChannelList,
        isAdd, onPressEnter, onChange, groupChannelName,
        handleEditChannelG,
        handleDeleteChannelG,

        handleAddGroup,
        rowKeys,
        onTableRowExpand,
        groupName,
        onChangeChild,
        onPressEnterChild,
        handleEditG,
        handleDeleteG,
        handleClose,

        handleSearch,
        handleSearchInputChannel,
        handleSearchInputGroup

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
            dataIndex: 'create_date',
            key: 'create_date',
        },
        {
            title: '',
            dataIndex: 'desc',
            key: 'desc',
            render: (_, record) => {
                return (
                    <div style={{ textAlign: "end" }}> {isAdd === true && (typeof (record.idAdd) === "number" && record.idAdd !== 0) ? <button className="btn__green" onClick={() => handleClose(_)}>
                        Đóng
                    </button> : ""}
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
                    <button className="btn__green" onClick={() => handleAddGroup(_)}>Thêm nhóm sản phẩm</button>
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
                            onChange={handleSearchInputChannel} />
                        <input placeholder="Nhóm sản phẩm" type="text"
                            name="tax_number"
                            onChange={handleSearchInputGroup}
                        />
                        <div className="table__features__search__btn">
                            <button
                                onClick={() => {
                                    handleSearch()
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
                                    handleClose={handleClose}
                                />
                            },
                            rowExpandable: (record) => record.locations.length != 0,
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
