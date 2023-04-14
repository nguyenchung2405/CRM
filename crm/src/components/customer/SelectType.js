import React, { useEffect, useState } from 'react'
import { Select } from 'antd';

export default function SelectType(props){
    let { list, mode, setValueForm, valueForm } = props;
    let {Option} = Select;
    const [multi, setMulti] = useState([]);

    const renderList = ()=>{
        return list?.map( item => {
            return <Option key={item.id} value={item.id}>{item.name}</Option>
        })
    };

    return (
        <Select
            className="customer__select style"
            mode={mode}
            value={mode === "multiple" ? multi : valueForm?.client_type_ID}
            showSearch
            allowClear
            filterOption={(input, option) =>
                (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value, option)=>{
                if(mode === "multiple"){
                    setMulti(value)
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