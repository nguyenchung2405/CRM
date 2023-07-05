import { Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ModalHistory from './ModalHistory';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

export default function ContractHistory(props) {

    const {data, VAT} = props;
    const {Column} = Table;
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataToModal, setDataToModal] = useState({});
    const [isExpand, setIsExpand] = useState(false)

  const showIconExpand = () => {
    if (data?.length > 5) {
      if (isExpand) {
        return <MdOutlineExpandLess onClick={() => { setIsExpand(false) }} />
      } else {
        return <MdOutlineExpandMore onClick={() => { setIsExpand(true) }} />
      }
    }
  }

  const setClassName = () => {
    if (data?.length > 5) {
      if (isExpand) {
        return "history__table table__expand__more"
      } else {
        return "history__table table__expand__less"
      }
    } else {
      return "history__table"
    }
  }

  return (
    <div className="create__contract__payment border_bottom_3px">
      <ModalHistory
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        dataToModal={dataToModal}
        VAT={VAT}
      />
      <div className="display__flex contract__payment">
        <div className="display__flex">
          <p>Lịch sử chỉnh sửa</p>
        </div>
      </div>
      <Table
        className={setClassName()}
        dataSource={data}
        pagination={false}
        onRow={record => {
          return {
            onClick: ()=>{
              setIsShowModal(true)
              setDataToModal(record)
            }
          }
        }}
      >
        <Column title="STT" key="STT" 
        render={(text, record, index) => {
          return index + 1
        }} />
        <Column title="Thời gian chỉnh sửa" key="created_datetime" render={(text) => {
          let convertDate = moment(new Date(text.created_datetime)).format("DD-MM-YYYY HH:mm:ss");
          return convertDate;
        }} />
        <Column title="Người chỉnh sửa" key="update_user_name" render={(text) => {
          return text.update_user_name;
        }} />
      </Table>
      <div className="expand__more">
        {showIconExpand()}
      </div>
    </div>
  )
}