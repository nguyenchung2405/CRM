const express = require("express");
const {
    getGroupChannel,
    createGroupChannel,
    searchGroupChannel,
    updateGroupChannel,
    getDetailGroupChannel
} = require("../controller/channel.controller");
const channelRouter = express.Router();
// import { RCS } from "../../utils/ConstantRouter";
const { RCS } = require("../../crm/src/untils/ConstantRouter");

channelRouter.get(`/lgc`, getGroupChannel);
channelRouter.post(`/cgc`, createGroupChannel);
channelRouter.post(`/ugc`, updateGroupChannel);
// channelRouter.get(`/school/your-school`, getListYourSchool);
// channelRouter.get(`/school/get-list-school`, getListSchoolWithParams);
module.exports = { channelRouter };
