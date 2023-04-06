const axios = require("axios");
const { local } = require("../untils/title");
const getGroupChannel = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name, location_name } = req.query
    console.log(req.query)
    console.log(req.params)
    try {
        const { data } = await axios.get(
            // `${local}/product/groupchannel/list?page_size=10&page=1&sort_by=id&order=desc`,
            `${local}/product/channel/list?page_size=20&page=1&sort_by=id&order=desc&name=${name}&location_name=${location_name}`,
            config
        );
        res.send(data);
    } catch (error) {
        res.send(error);
    }
};

const createGroupChannel = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name } = req.body;
    let params = {
        name,
        desc: "mo ta",
        group_channel_ID: "1"
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
const updateGroupChannel = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name, id } = req.body;
    let params = {
        name,
        desc: "mo ta",
        group_channel_ID: "1"
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
const deleteGroupChannel = async (req, res) => {
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


const createGroup = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { name, channel_ID } = req.body;
    let params = {
        name,
        desc: "mo ta",
        channel_ID
    }
    try {

        const { data } = await axios.post(
            `${local}/product/location/create`, params,
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
    let { name, id, channel_ID } = req.body;
    let params = {
        name,
        desc: "mo ta",
        channel_ID
    }
    try {
        const { data } = await axios.put(
            `${local}/product/location/update?id=${id}`, params,
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
            `${local}/product/location/disable?id=${id}`,
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