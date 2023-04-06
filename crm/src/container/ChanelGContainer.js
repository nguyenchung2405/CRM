import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import ChanelGComponent from '../components/product/chanelGroup/ChanelGComponent';
import { GET_GROUP_CHANNEL, local, TOKEN } from "../../src/title/title";
import { message } from 'antd';
const ChanelGContainer = () => {
    const dispatch = useDispatch();
    let { groupChannelList } = useSelector((state) => state.groupChannelReducer)
    console.log(groupChannelList)
    const [search, setSearch] = useState({ name: "", tax_number: "" })
    let [groupChanne, setgroupChanne] = useState([])
    const [groupChannelName, setGroupChannelName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [isAdd, setIsAdd] = useState(false)
    const [isAddChild, setIsAddChild] = useState(false)
    const [rowKeys, setRowKeys] = useState([])
    const [searchChannel, setSearchChannel] = useState("")
    const [searchGroup, setSearchGroup] = useState("")

    useEffect(() => {
        dispatch({
            type: GET_GROUP_CHANNEL,
            data: { page: 1, pageNumber: 1000, name: searchChannel, location_name: searchGroup }
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
            create_date: getNow(),
            locations: []
        };
        if (groupChanne[0].id !== 1000) {
            setgroupChanne([newData, ...groupChanne]);
        }
        //   setCount(count + 1);
    }
    const onPressEnter = async (id) => {
        if (id === -1) {
            let count = 1000;
            let newData = {
                idAdd: 0,
                id: count,
                key: count,
                name: groupChannelName,
                desc: 'mo ta',
                locations: []
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
                message.success("tao thanh cong")
                handleClose()
            } else {
                message.error("tao that bai")
                let arrayForAdd = groupChanne.filter((item) => {
                    return item.idAdd !== 1
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
                locations: []
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
                message.success("cap nhat thanh cong")
                handleClose()
                // setgroupChanne(arrayForAdd)
            } else {
                let arrayForAdd = groupChanne.filter((item) => {
                    return Item.idAdd !== 1
                })
                setgroupChanne(arrayForAdd)
            }
        }
    }
    const onPressEnterChild = async (id, channel_ID) => {
        if (id === -1) {
            let count = 1000;
            let newData = {
                idAdd: 0,
                id: count,
                key: count,
                name: groupName,
                desc: 'mo ta',
                channel_ID,
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
                message.success("tao thanh cong")
                handleClose()
            } else {
                handleClose()
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
                locations: [],
                channel_ID,
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
                message.success("cap nhat thanh cong")
                handleClose()
                // setgroupChanne(arrayForAdd)
            } else {
                handleClose()
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
        if (isAdd === true) {
            message.warning("Bạn hãy đóng form hiện tại")
            return;
        }
        setIsAdd(true)
        let dataStateEdit = groupChanne.map((item) => {
            if (item.id === id) {
                setGroupChannelName(item.name)
                return {
                    ...item,
                    idAdd: item.id
                }

            } else {
                return {
                    ...item,
                    idAdd: 0
                }
            }
        })
        setgroupChanne(dataStateEdit)
    }
    const handleEditG = (id, channel_ID) => {
        if (isAdd === true) {
            message.warning("Bạn hãy đóng form hiện tại")
            return;
        }
        setIsAdd(true)
        console.log(id, channel_ID)
        let dataStateEdit = groupChanne.map((item) => {
            if (item.id === channel_ID) {
                return {
                    ...item, locations: item.locations.map((itemChild) => {
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
            handleClose()
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
            handleClose()
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
        if (isAdd === true) {
            message.warning("Bạn hãy đóng form hiện tại")
            return;
        }
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
                    name: groupName,
                    create_date: getNow(),
                    channel_ID: id
                };
                item.locations = [newData, ...item.locations]
                return item
            } else {
                return item;
            }
        })
        setgroupChanne(newDataAdd);
    }
    const handleSearch = () => {
        handleClose()
    }
    const handleClose = () => {
        dispatch({
            type: GET_GROUP_CHANNEL,
            data: { page: 1, pageNumber: 1000, name: searchChannel, location_name: searchGroup }
        })
        setIsAdd(false)
    }
    const handleSearchInputChannel = (e) => {
        setSearchChannel(e.target.value)
        if (e.target.value === "") {
            alert("Empty")
            handleSearch()
        }
    }
    const handleSearchInputGroup = (e) => {
        if (e.target.value === "") {
            handleSearch()
        }
    }
    const getNow = () => {
        return new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
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
                handleClose={handleClose}

                handleSearchInputChannel={handleSearchInputChannel}
                handleSearchInputGroup={handleSearchInputGroup}
                handleSearch={handleSearch}


            />
        </>

    );
}

export default ChanelGContainer;
