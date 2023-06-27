const express = require("express");
const {
    getGroupChannel,
    createGroupChannel,
    updateGroupChannel,
    deleteGroupChannel,
    createGroup,
    updateGroup,
    deleteGroup,
    updateSubGroup,
    deleteSubGroup,
    createSubGroup,
    getSubGroup
} = require("../controller/channel.controller");
const channelRouter = express.Router();
// import { RCS } from "../../utils/ConstantRouter";
const { RCS } = require("../../crm/src/untils/ConstantRouter");

channelRouter.get(`/lgc`, getGroupChannel);
channelRouter.post(`/cgc`, createGroupChannel);
channelRouter.post(`/ugc`, updateGroupChannel);
channelRouter.post(`/dgc`, deleteGroupChannel);

channelRouter.post(`/cg`, createGroup);
channelRouter.post(`/ug`, updateGroup);
channelRouter.post(`/dg`, deleteGroup);

channelRouter.put("/usubg", updateSubGroup);
channelRouter.delete("/dsubg", deleteSubGroup);
channelRouter.post("/csubg", createSubGroup);
channelRouter.get("/gsubg", getSubGroup);
module.exports = { channelRouter };
