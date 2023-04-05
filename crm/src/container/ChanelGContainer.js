import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import ChanelGComponent from '../components/product/chanelGroup/ChanelGComponent';
import { GET_GROUP_CHANNEL, local, TOKEN } from "../../src/title/title";
const ChanelGContainer = () => {
    const dispatch = useDispatch();
    let { groupChannelList } = useSelector((state) => state.groupChannelReducer)
    const [search, setSearch] = useState({ name: "", tax_number: "" })
    let [groupChanne, setgroupChanne] = useState([])
    const [groupChannelName, setGroupChannelName] = useState("");
    const [isAdd, setIsAdd] = useState(false)
    useEffect(() => {
        dispatch({
            type: GET_GROUP_CHANNEL,
            data: { page: 1, pageNumber: 1000 }
        })
    }, [dispatch]);
    useEffect(() => {
        setgroupChanne(groupChannelList)
    }, [groupChannelList])
    const handleSearchInput = (e) => {
        let { value, name } = e.target;
        setSearch({
            ...search,
            [name]: value
        })
    }

    const formatDataChannelList = (data) => {
        return data.map((obj) => {
            return {
                ...obj,
                key: obj.id
            }
        })
    }
    const handleAdd = () => {
        let count = 1000;
        setIsAdd(true)
        const newData = {
            idAdd: -1,
            id: count,
            key: count,
            name: groupChannelName,
            desc: '32',
            channels: []
        };
        setgroupChanne([newData, ...groupChanne]);
        //   setCount(count + 1);
    }
    const onPressEnter = async (id) => {
        alert(id);
        if (id === -1) {
            let count = 1000;
            let newData = {
                idAdd: 0,
                id: count,
                key: count,
                name: groupChannelName,
                desc: 'mo ta',
                channels: []
            }
            const result = await axios({
                url: `${local}/api/cgc`,
                method: "POST",
                headers: {
                    Authorization: "Bearer " + TOKEN
                },
                data: newData
            });
            if (result?.status === 200) {
                alert("tao thanh cong")
                let id = getIDNumber(result?.data?.data.data)
                let arrayForAdd = [...groupChanne]
                arrayForAdd[0] = newData;
                arrayForAdd[0].id = id;
                arrayForAdd[0].key = id;
                setgroupChanne(arrayForAdd)
            } else {
                let arrayForAdd = groupChanne.filter((item) => {
                    return Item.idAdd !== 1
                })
                setgroupChanne(arrayForAdd)
            }
        } else {
            let newData = {
                idAdd: 0,
                id,
                key: id,
                name: groupChannelName,
                desc: 'mo ta',
                channels: []
            }
            const result = await axios({
                url: `${local}/api/ugc`,
                method: "POST",
                headers: {
                    Authorization: "Bearer " + TOKEN
                },
                data: newData
            });
            if (result?.status === 200) {
                alert("cap nhat thanh cong")
                dispatch({
                    type: GET_GROUP_CHANNEL,
                    data: { page: 1, pageNumber: 1000 }
                })
                // setgroupChanne(arrayForAdd)
            } else {
                let arrayForAdd = groupChanne.filter((item) => {
                    return Item.idAdd !== 1
                })
                setgroupChanne(arrayForAdd)
            }
        }


    }
    const onChange = (e) => {
        setGroupChannelName(e.target.value);
    }

    const handleEditChannelG = (id) => {
        setIsAdd(true)
        let dataStateEdit = groupChanne.map((item) => {
            if (item.id === id) {
                setGroupChannelName(item.name)
                return {
                    ...item,
                    idAdd: item.id
                }

            }
            return item
        })
        setgroupChanne(dataStateEdit)
    }
    // function support

    function getIDNumber(str) {
        // Tìm vị trí của kí tự "ID" trong chuỗi
        const idIndex = str.indexOf("ID");

        // Nếu không tìm thấy kí tự "ID" thì trả về null
        if (idIndex === -1) {
            return null;
        }

        // Tìm vị trí đầu tiên của số sau kí tự "ID"
        const numIndex = idIndex + 3;

        // Tìm vị trí cuối cùng của số sau kí tự "ID"
        const endIndex = str.indexOf(")", numIndex);

        // Lấy chuỗi con chứa số sau kí tự "ID"
        const numStr = str.substring(numIndex, endIndex);

        // Chuyển đổi chuỗi số thành số nguyên và trả về kết quả
        return parseInt(numStr, 10);
    }
    return (
        <>
            <ChanelGComponent
                handleAdd={handleAdd}
                formatDataChannelList={formatDataChannelList}
                groupChannelList={groupChanne}

                isAdd={isAdd}
                groupChannelName={groupChannelName}
                onPressEnter={onPressEnter}
                onChange={onChange}

                handleEditChannelG={handleEditChannelG}

                handleSearchInput={handleSearchInput}
            />
        </>

    );
}

export default ChanelGContainer;
