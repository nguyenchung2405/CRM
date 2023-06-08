import { Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getContractRequestAPI } from '../../redux/API/contractAPI';
import CreateReceiptModal from '../receipt/CreateReceiptModal';

export default function ExpandTableAcceptance(props) {

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

    const getRequestList = async (contract_id)=>{
        const result = await getContractRequestAPI(contract_id)
        let newData = result.data.contract_request.map(item => {
            return {
                ...item,
                key: item.id,
                details: item.details.filter(detail => detail.completed_evidences === null),
                detail_completed: item.details.filter(detail => detail.completed_evidences !== null).length
            }
        })
        setRequestList(newData)
    }

    const renderListDetail = (data)=>{
        return data?.details?.map(detail => {
            let tuNgay = detail.report_date !== null ? moment(new Date(detail.report_date)).format("DD-MM-YYYY") : "";
            return <li key={detail.id}>
                <div>{detail.desc}</div>
                <div>{`${tuNgay}`}</div>
                <div>{detail.completed_evidences?.length > 0 ? detail.completed_evidences[0] : detail.completed_evidences}</div>
            </li>
        })
    }

    function addDetail({request_id, data, detail_id}){
        try {
            let newList = [...requestList]
            if (detail_id) {
                let contractIndex = newList.findIndex(event => event.id === request_id);
                let detailIndex = newList[contractIndex].details.findIndex(detail => detail.id === detail_id);
                newList[contractIndex].details[detailIndex] = data
                setRequestList(newList)
            } else {
                let contractIndex = newList.findIndex(event => event.id === request_id);
                newList[contractIndex].details.unshift(data);
                setRequestList(newList)
            }
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
                  rowExpandable: (record) => record.quality - record.detail_completed > 0 && record.details.length > 0,
              }}
              pagination={false}
          >
              <Column title="Tên quyền lợi" fixed="left" render={(text) => {
                  return text.product_ID.name
              }}></Column>
              <Column title="Số quyền lợi đã thực hiện" dataIndex="detail_completed"></Column>
              <Column title="Số lượng" dataIndex="quality"></Column>
          </Table>
      </>
  )
}