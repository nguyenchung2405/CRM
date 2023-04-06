import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import ChanelGComponent from '../components/product/chanelGroup/ChanelGComponent';
import { GET_GROUP_CHANNEL, local, TOKEN } from "../../src/title/title";
import { message } from 'antd';
const ChanelGContainer = () => {
    const dispatch = useDispatch();
    let { groupChannelList } = useSelector((state) => state.groupChannelReducer)
    const [search, setSearch] = useState({ name: "", tax_number: "" })
    let [groupChanne, setgroupChanne] = useState([])
    const [groupChannelName, setGroupChannelName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [isAdd, setIsAdd] = useState(false)
    const [isAddChild, setIsAddChild] = useState(false)
    const [rowKeys, setRowKeys] = useState([])

    useEffect(() => {
        dispatch({
            type: GET_GROUP_CHANNEL,
            data: { page: 1, pageNumber: 1000 }
        })
    }, [dispatch]);
    useEffect(() => {
        setgroupChanne(groupChannelList)
    }, [groupChannelList])
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
        return;
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
    const onPressEnterChild = async (id, group_channel_ID) => {
        if (id === -1) {
            let count = 1000;
            let newData = {
                idAdd: 0,
                id: count,
                key: count,
                name: groupName,
                desc: 'mo ta',
                group_channel_ID,
            }
            const result = await axios({
                url: `${local}/api/cg`,
                method: "POST",
                headers: {
                    Authorization: "Bearer " + TOKEN
                },
                data: newData
            });
            if (result?.status === 200) {
                alert("tao thanh cong")
                dispatch({
                    type: GET_GROUP_CHANNEL,
                    data: { page: 1, pageNumber: 1000 }
                })

            } else {
                dispatch({
                    type: GET_GROUP_CHANNEL,
                    data: { page: 1, pageNumber: 1000 }
                })
                // let arrayForAdd = groupChanne.filter((item) => {
                //     return Item.idAdd !== 1
                // })
                // setgroupChanne(arrayForAdd)
            }
        } else {
            let newData = {
                idAdd: 0,
                id,
                key: id,
                name: groupName,
                desc: 'mo ta',
                channels: [],
                group_channel_ID,
            }
            const result = await axios({
                url: `${local}/api/ug`,
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
                dispatch({
                    type: GET_GROUP_CHANNEL,
                    data: { page: 1, pageNumber: 1000 }
                })
                // let arrayForAdd = groupChanne.filter((item) => {
                //     return Item.idAdd !== 1
                // })

                // setgroupChanne(arrayForAdd)
            }
        }
    }
    const onChange = (e) => {
        setGroupChannelName(e.target.value);
    }
    const onChangeChild = (e) => {
        setGroupName(e.target.value);
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
    const handleEditG = (id, group_channel_ID) => {
        setIsAdd(true)
        console.log(id, group_channel_ID)
        let dataStateEdit = groupChanne.map((item) => {
            if (item.id === group_channel_ID) {
                return {
                    ...item, channels: item.channels.map((itemChild) => {
                        if (itemChild.id === id) {
                            setGroupName(itemChild.name)
                            return {
                                idAdd: itemChild.id,
                                ...itemChild
                            }
                        }
                        return itemChild
                    })
                }
            }
            return item
        })
        console.log(dataStateEdit)
        setgroupChanne(dataStateEdit)
    }
    const handleDeleteChannelG = async (id) => {
        let newData = {
            id
        }
        const result = await axios({
            url: `${local}/api/dgc`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newData
        });
        if (result.status === 200) {
            message.success("Xoa thanh cong")
            dispatch({
                type: GET_GROUP_CHANNEL,
                data: { page: 1, pageNumber: 1000 }
            })
        } else {
            message.error("Xoa that bai")
        }
    }
    const handleDeleteG = async (id) => {
        let newData = {
            id
        }
        const result = await axios({
            url: `${local}/api/dg`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + TOKEN
            },
            data: newData
        });
        if (result.status === 200) {
            message.success("Xoa thanh cong")
            dispatch({
                type: GET_GROUP_CHANNEL,
                data: { page: 1, pageNumber: 1000 }
            })
        } else {
            message.error("Xoa that bai")
        }
    }
    const onTableRowExpand = (expanded, record) => {
        var keys = [];
        if (expanded) {
            keys.push(record.id); // I have set my record.id as row key. Check the documentation for more details.
        }
        setRowKeys(keys)
        // this.setState({ expandedRowKeys: keys });
    }
    // function support


    // child
    const handleAddGroup = (id) => {
        setIsAdd(true)
        let count = 1000;
        setIsAddChild(true)
        setRowKeys([...rowKeys, id])
        let arrayClone = JSON.parse(JSON.stringify(groupChanne));
        let newDataAdd = arrayClone.map((item) => {
            if (item.id === id) {
                const newData = {
                    idAdd: -1,
                    id: count,
                    key: count,
                    // name: "",
                    name: groupName,
                    desc: '32',
                    group_channel_ID: id
                };
                item.channels = [newData, ...item.channels]
                return item
            } else {
                return item;
            }
        })
        console.log(newDataAdd)
        setgroupChanne(newDataAdd);
    }
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
                handleDeleteChannelG={handleDeleteChannelG}

                handleAddGroup={handleAddGroup}
                rowKeys={rowKeys}
                setRowKeys={setRowKeys}
                onTableRowExpand={onTableRowExpand}
                groupName={groupName}
                onChangeChild={onChangeChild}
                onPressEnterChild={onPressEnterChild}
                handleEditG={handleEditG}
                handleDeleteG={handleDeleteG}


            />
        </>

    );
}

export default ChanelGContainer;
