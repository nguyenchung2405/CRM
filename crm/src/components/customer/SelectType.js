import React, { useEffect, useState } from 'react'
import { Select } from 'antd';

export default function SelectType(props){
    let { list, mode, setValueForm, valueForm } = props;
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
            value={mode === "multiple" ? [] : valueForm?.client_type_ID}
            showSearch
            allowClear
            filterOption={(input, option) =>
                (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value)=>{
                if(mode === "multiple"){
                    console.log(value)
                } else {
                    setValueForm({
                        ...valueForm,
                        client_type_ID: value
                    })
                }
            }}
        >
            {renderList()}
        </Select>
    )
}