import { Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEventInforAPI } from '../../redux/API/eventAPI';

export default function ExpandEventAcceptance(props) {

    const { data } = props;
    const dispatch = useDispatch();
    const {Column} = Table;
    const [requestList, setRequestList] = useState([]);
    const { acceptanceJustCreated } = useSelector(state => state.acceptanceReducer)
    
    useEffect(()=>{
        getRequestList(data.id)
    }, [data])

    useEffect(()=>{
        addDetail(acceptanceJustCreated)
    }, [acceptanceJustCreated])

    const getRequestList = async (event_id)=>{
        const result = await getEventInforAPI(event_id)
        let newData = result.data.event_management[0].details.map(item => {
            return {
                ...item, 
                key: item.id,
                executive_details: item.executive_details.filter(detail => detail.completed_evidences === null),
                detail_completed: item.executive_details.filter(detail => detail.completed_evidences !== null).length
            }
        });
        setRequestList(newData)
    }

    const renderListDetail = (data)=>{
        return data?.executive_details?.map(detail => {
            let tuNgay = detail.from_date !== null ? moment(new Date(detail.from_date)).format("DD-MM-YYYY") : "";
            return <li key={detail.id}>
                <div>{detail.desc}</div>
                <div>{`${tuNgay}`}</div>
                <div>{detail.completed_evidences?.length > 0 ? detail.completed_evidences[0] : detail.completed_evidences}</div>
            </li>
        })
    }
    
    function addDetail({ data, detail_id}){
        try {
            let newList = [...requestList]
            let eventIndex = newList.findIndex(detail => detail.id === detail_id);
            newList[eventIndex].executive_details.push(data);
            setRequestList(newList)
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <>
          <Table
              dataSource={requestList}
              expandable={{
                  showExpandColumn: true,
                  // expandRowByClick: true,
                  expandedRowRender: record => {
                      return <ol className="acceptance__expand__table">
                          {renderListDetail(record)}
                      </ol>
                  },
                  rowExpandable: (record) => record.quantity - record.detail_completed > 0 && record.executive_details.length > 0,
              }}
              pagination={false}
          >
              <Column title="Tên quyền lợi" fixed="left" dataIndex="product_name"></Column>
              <Column title="Số quyền lợi đã thực hiện" dataIndex="detail_completed"></Column>
              <Column title="Số lượng" dataIndex="quantity"></Column>
              {/**
              <Column fixed="right" render={(text) => {
                  return <div className="table__thaotac">
                      <Tooltip title="Tạo quyết toán" color="green" >
                          <AiFillPlusCircle className="style__svg" onClick={() => {
                                setIsShowCreateModal(true)
                                setDataToCreateModal({
                                    contract_id: text.contract_ID,
                                    details: text.details,
                                    event_id: text.event_ID,
                                    // real_time_total: text.real_time_total,
                                    // total_completed_payments: text.total_completed_payments,
                                    // total_created_payments: text.total_created_payments
                                })
                          }} />
                      </Tooltip>
                  </div>
              }}></Column>
            */}
          </Table>
      </>
  )
}