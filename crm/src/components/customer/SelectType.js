import React, { useEffect, useState } from 'react'
import { Select } from 'antd';

export default function SelectType(props){
    let { list, mode } = props;
    let {Option} = Select;

    const renderList = ()=>{
        return list?.map( item => {
            return <Option value={item.id}>{item.name}</Option>
        })
    };

    return (
        <Select
            className="customer__select style"
            mode={mode}
            showSearch
            allowClear
            filterOption={(input, option) =>
                (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
            }
        >
            {renderList()}
        </Select>
    )
}