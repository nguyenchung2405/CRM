import React from 'react'
import { Menu } from "antd"
import { MdPeopleOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { BsFileEarmarkFill } from "react-icons/bs"
import { FcDepartment } from "react-icons/fc"

export default function SubMenu() {
    const navigate = useNavigate();

    const getItem = (label, key, icon, children) => {
        return {
            label,
            key,
            icon,
            children
        }
    }

    const items = [
        getItem("Nhân sự", "sub1", <MdPeopleOutline />, [
            getItem("Hồ sơ", "1", <BsFileEarmarkFill />),
            getItem("Bộ phận công tác", "2", <FcDepartment />),
            getItem("Chức danh, chức vụ", "3"),
        ])
    ]

    return (
        <div className="sidebar_SubMenu__XZeb6">
            <Menu
                mode='inline'
                items={items}
                onClick={(e) => {
                    if (e.key === "1") {
                        navigate("/hr/profile")
                    } else if (e.key === "2") {
                        navigate("/hr/department")
                    } else if (e.key === "3") {
                        navigate("/hr/position");
                    }
                }}
            />
        </div>
    )
}
