import { Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react'
import ModalHistory from './ModalHistory';

export default function ContractHistory(props) {

    const {data} = props;
    const {Column} = Table;
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataToModal, setDataToModal] = useState({});

  return (
    <div className="create__contract__payment border_bottom_3px">
      <ModalHistory
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        dataToModal={dataToModal}
      />
      <div className="display__flex contract__payment">
        <div className="display__flex">
          <p>Lịch sử chỉnh sửa</p>
        </div>
      </div>
      <Table
        className="history__table"
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
          let convertDate = moment(new Date(text.created_datetime)).format("HH:mm:ss DD-MM-YYYY");
          return convertDate;
        }} />
        <Column title="Người chỉnh sửa" key="update_user_name" render={(text) => {
          return text.update_user_name;
        }} />
      </Table>
    </div>
  )
}