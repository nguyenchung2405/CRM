const axios = require("axios");
const { local } = require("../untils/title");
const getGroupChannel = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    console.log(`${req.headers.authorization}`)
    try {
        const { data } = await axios.get(
            `${local}/product/groupchannel/list?page_size=10&page=1&sort_by=id&order=desc`,
            config
        );
        res.send(data);
    } catch (error) {
        res.send(error);
    }
    // let data = {
    //     "data": {
    //         "product_group_channel": [
    //             {
    //                 "name": "giấy",
    //                 "desc": "mô tả báo giấy",
    //                 "id": 1,
    //                 "channels": [
    //                     {
    //                         "name": "Nhật báo",
    //                         "desc": "mô tả báo ngày",
    //                         "group_channel_ID": 1,
    //                         "id": 1
    //                     }
    //                 ]
    //             },
    //             {
    //                 "name": "điện tử",
    //                 "desc": "mô tả báo điện tử",
    //                 "id": 2,
    //                 "channels": [
    //                     {
    //                         "name": "TTO",
    //                         "desc": "mô tả báo TTO",
    //                         "group_channel_ID": 2,
    //                         "id": 2
    //                     },
    //                     {
    //                         "name": "TTCO",
    //                         "desc": "mô tả báo TTCO",
    //                         "group_channel_ID": 2,
    //                         "id": 3
    //                     }
    //                 ]
    //             },
    //             {
    //                 "name": "string",
    //                 "desc": "string",
    //                 "id": 3,
    //                 "channels": []
    //             },
    //             {
    //                 "name": "string",
    //                 "desc": "string",
    //                 "id": 4,
    //                 "channels": []
    //             },
    //             {
    //                 "name": "string",
    //                 "desc": "string",
    //                 "id": 5,
    //                 "channels": []
    //             }
    //         ],
    //         "page": 1,
    //         "page_size": 10,
    //         "total_data": 5,
    //         "total_page": 1
    //     }
    // }
    // res.send(data)
};

const createGroupChannel = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name } = req.body;
    let params = {
        name,
        desc: "mo ta"
    }
    try {
        const { data } = await axios.post(
            `${local}/product/groupchannel/create`, params,
            config
        );
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}
const updateGroupChannel = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name, id } = req.body;
    let params = {
        name,
        desc: "mo ta"
    }
    try {
        const { data } = await axios.put(
            `${local}/product/groupchannel/update?id=${id}`, params,
            config
        );
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}
const deleteGroupChannel = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { id } = req.body;
    try {
        const { data } = await axios.delete(
            `${local}/product/groupchannel/disable?id=${id}`,
            config
        );
        res.send(data);
    } catch (error) {
        res.send("error");
    }
}


const createGroup = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name, group_channel_ID } = req.body;
    let params = {
        name,
        desc: "mo ta",
        group_channel_ID
    }
    try {

        const { data } = await axios.post(
            `${local}/product/channel/create`, params,
            config
        );
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}
const updateGroup = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name, id, group_channel_ID } = req.body;
    let params = {
        name,
        desc: "mo ta",
        group_channel_ID
    }
    try {
        const { data } = await axios.put(
            `${local}/product/channel/update?id=${id}`, params,
            config
        );
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}
const deleteGroup = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { id } = req.body;
    try {
        const { data } = await axios.delete(
            `${local}/product/channel/disable?id=${id}`,
            config
        );
        res.send(data);
    } catch (error) {
        res.send("error");
    }
}


module.exports = {
    getGroupChannel,
    createGroupChannel,
    updateGroupChannel,
    deleteGroupChannel,
    createGroup,
    updateGroup,
    deleteGroup
}