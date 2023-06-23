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
    createSubGroup
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
channelRouter.put("/dsubg", deleteSubGroup);
channelRouter.post("/csubg", createSubGroup);
module.exports = { channelRouter };
