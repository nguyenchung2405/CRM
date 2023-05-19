import React, { useEffect, useState } from 'react'
import { BsReceiptCutoff } from "react-icons/bs"
import { NavLink, Link } from 'react-router-dom';
import { checkMicroFe } from '../../untils/helper';
import { MdPeopleOutline } from "react-icons/md"
import { BsFileEarmarkFill } from "react-icons/bs"
import { FcDepartment } from "react-icons/fc"

export default function Sidebar() {
    

    const getItem = (label, key, icon, children) => {
        return {
            label,
            key,
            icon,
            children
        }
    }
    let uri = checkMicroFe() === true ? "contract-service" : "";
    // const items = [
    //     getItem("Hoá đơn", "sub1xxx", [
    //         getItem(<Link to={`${uri}/crm/customer`}>Quản lý khách hàng</Link>, "2xxx",),
    //         getItem(<Link to={`${uri}/crm/contract`}>Quản lý hợp đồng</Link>, "3xxx",),
    //     ])
    // ]

    const items = [
        getItem("Hợp đồng", "sub5", <BsReceiptCutoff />, [
            getItem("Quản lý khách hàng", "10", <BsFileEarmarkFill />,[
                getItem(<Link to={`${uri}/crm/customer/type`}>Loại, Ngành nghề</Link> , "18" , <FcDepartment />),
                getItem(<Link to={`${uri}/crm/customer`}>Khách hàng</Link>, "16", <FcDepartment />),
            ]),
            getItem(<Link to={`${uri}/crm/contract`}>Quản lý hợp đồng</Link>, "11", <FcDepartment />),
            getItem(<Link to={`${uri}/crm/event`}>Quản lý sự kiện</Link>, "20", <FcDepartment />),
            getItem("Quản lý sản phẩm", "12", <FcDepartment />, [
                getItem(<Link to={`${uri}/crm/channel`}>Kênh, nhóm</Link>, "15", <FcDepartment />),
                getItem(<Link to={`${uri}/crm/product/type-att`}>Loại, thuộc tính</Link>, "13", <FcDepartment />),
                getItem(<Link to={`${uri}/crm/product`}>Sản phẩm</Link>, "14", <FcDepartment />),
                getItem(<Link to={`${uri}/crm/product/special`}>Sản phẩm đặc biệt</Link>, "19", <FcDepartment />),
            ]),
            
            getItem(<Link to={`${uri}/crm/receipt`}>Quản lý hóa đơn</Link>, "24", <FcDepartment />),
            getItem("Quản lý nghiệm thu", "21", <FcDepartment />, [
                getItem(<Link to={`${uri}/crm/acceptance/contract`}>Hợp đồng</Link>, "22", <FcDepartment />),
                getItem(<Link to={`${uri}/crm/acceptance/event`}>Sự kiện</Link>, "23", <FcDepartment />),
            ]),
        ])
    ]

    
    const renderSubMenu = () => {
        if (checkMicroFe() === false) {
            return <>
                <div className="sidebar">
                    <div className="sidebar__logo bg_pri_blue">
                        <svg width="131" height="49" viewBox="0 0 131 49" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="131" height="49" fill="url(#pattern0)" />
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_1_1231" transform="translate(0 -0.00198054) scale(0.00421941 0.0112805)" />
                                </pattern>
                                <image id="image0_1_1231" width="237" height="89" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABZCAYAAADSFqPsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA0LTE4VDExOjI5OjM5KzA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA0LTE4VDExOjI5OjM5KzA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNC0xOFQxMToyOTozOSswNzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiOWE2ZDAzNS04NzliLTcxNDgtYWQ1ZC03OTFkMWFkYTRjZDMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmMjJlNjIwNy02MTJlLWJiNGEtYTA1NC03MjMyN2M4ZjA0YTYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2ZDAxMTcxNi00MjkwLWUxNDAtYjhkZS1kOWE5MzFlNzQyZWYiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZkMDExNzE2LTQyOTAtZTE0MC1iOGRlLWQ5YTkzMWU3NDJlZiIgc3RFdnQ6d2hlbj0iMjAyMi0wNC0xOFQxMToyOTozOSswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiOWE2ZDAzNS04NzliLTcxNDgtYWQ1ZC03OTFkMWFkYTRjZDMiIHN0RXZ0OndoZW49IjIwMjItMDQtMThUMTE6Mjk6MzkrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vcyGBAAAto0lEQVR4nO2dd3iUxfbHP2ezm2w2ZROSQAgk9BJ6F7hI2YiCIk1EAUUEFfUiKlhQ+SFyRcCLWFHsiBdFUa9iw5JVuBasoIgoKCBdajaQkMbO7495F5Zl098UMd/n2Sdv5p135kw5U845c0Y4Q+F1OWcCFwJDLW7PjiompwY1CAqlVKm/sVYAHVUOr8vZFogHLi4Nw3pdTisQ4xeUZ3F7Mk0mrwY1KBeksjLyupypABa3Z2NAuB2YBjQv5NN8oADYCrxncXu+LyafeOABwEb38xrK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" />
                            </defs>
                        </svg>
                    </div>
                    <div className="sidebar__personal__information bg_pri_blue">
                        <p>
                            <BsReceiptCutoff />
                            Hợp đồng
                        </p>
                    </div>
                    
                    <div className="sidebar__sub__menu">
                        <ul>
                            <li>
                                <NavLink to="/crm/customer">Quản lý khách hàng</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/customer/type">Quản lý loại và ngành nghề </NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/contract">Quản lý hợp đồng</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/event">Quản lý sự kiện</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/product">Quản lý sản phẩm</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/product/type-att">Quản lý loại, thuộc tính sản phẩm</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/channel">Quản lý kênh</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/product/special">Quản lý sản phẩm đặc biệt</NavLink>
                            </li>
                            
                            <li>
                                <NavLink to="/crm/receipt">Quản lý hóa đơn</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/acceptance/contract">Nghiệm thu HĐ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crm/acceptance/event">Nghiệm thu sự kiện</NavLink>
                            </li>
                        </ul>
                            
                    </div>
                </div>
            </>
        } else {
            return items
        }
    }

    return (
        <>
            {renderSubMenu()}
        </>
    )
}