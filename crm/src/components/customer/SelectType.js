import React, { useEffect, useState } from 'react'
import { Select } from 'antd';

export default function SelectType(props){
    let { list, mode, setValueForm, valueForm } = props;
    let {Option} = Select;
    const [multi, setMulti] = useState([]);

    useEffect(()=>{
        if(valueForm.sectors?.length > 0){
            let newMulti = valueForm.sectors.map(sector => {
                if(sector.id){
                    return sector.id
                } else {
                    return sector
                }
            });
            setMulti(newMulti)
        }
    }, [valueForm])

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
                    setValueForm({
                        ...valueForm,
                        sectors: value
                    })
                } else if(mode === "tags"){
                    console.log(value, option)
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