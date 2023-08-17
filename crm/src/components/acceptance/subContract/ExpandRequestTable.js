import { Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getSubContractRequestAPI } from '../../../redux/API/contractAPI';

export default function ExpandRequestTable(props) {

    const {data} = props;
    const {Column} = Table;
    const [requests, setRequests] = useState([])
    const { acceptanceJustCreated } = useSelector(state => state.acceptanceReducer)

    useEffect(()=>{
        getRequest(data.contract_ID, data.id)
    }, [data])

    useEffect(()=>{
        addDetail(acceptanceJustCreated)
    }, [acceptanceJustCreated])

    const getRequest = async (contract_ID, sub_contract_id)=>{
        const result = await getSubContractRequestAPI(contract_ID, sub_contract_id);
        let newData = result.data.contract_request.map(item => {
            return {
                ...item,
                key: item.id,
                details: item.details.filter(detail => detail.completed_evidences === null),
                detail_completed: item.details.filter(detail => detail.completed_evidences !== null).length
            }
        })
        setRequests(newData)
    }

    const renderListDetail = (data)=>{
        return data?.details?.map(detail => {
            let tuNgay = detail.from_date !== null ? moment(new Date(detail.from_date)).format("DD-MM-YYYY") : "";
            return <li key={detail.id}>
                <div>{detail.desc}</div>
                <div>{`${tuNgay}`}</div>
                <div>{detail.completed_evidences?.length > 0 ? detail.completed_evidences[0] : detail.completed_evidences}</div>
            </li>
        })
    }

    function addDetail({request_id, data, detail_id}){
        try {
            let newList = [...requests]
            if (detail_id) {
                let contractIndex = newList.findIndex(event => event.id === request_id);
                let detailIndex = newList[contractIndex].details.findIndex(detail => detail.id === detail_id);
                newList[contractIndex].details[detailIndex] = data
                setRequests(newList)
            } else {
                let contractIndex = newList.findIndex(event => event.id === request_id);
                newList[contractIndex].details.unshift(data);
                setRequests(newList)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <>
          <Table
              dataSource={requests}
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
              <Column title="Tên quyền lợi" fixed="left" width="33%" render={(text) => {
                  return text.product_ID.name
              }}></Column>
              <Column title="Số quyền lợi đã thực hiện" width="33%" dataIndex="detail_completed"></Column>
              <Column title="Số lượng" width="33%" dataIndex="quality"></Column>
          </Table>
      </>
  )
}