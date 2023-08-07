import { Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { getSubContractOfMomContract } from '../../../redux/API/contractAPI';
import { checkMicroFe } from '../../../untils/helper';

export default function ExpandSubContractTable(props) {

    let uri = checkMicroFe() === true ? "/contract-service" : "";
    let {contract_id} = props;
    const { Column } = Table;
    const history = useHistory();
    const [subContractList, setSubContractList] = useState([]);

    useEffect(()=>{
        getSubContractList(contract_id)
    }, [contract_id])

    async function getSubContractList(contract_id){
        const result = await getSubContractOfMomContract(contract_id);
        setSubContractList(result.data.sub_contract)
    };

  return (
      <Table
          dataSource={subContractList}
          pagination={false}
          scroll={{
              x: "max-content",
          }}
          rowKey={record => record.id + record.contract_ID}
      >
          <Column render={text => { console.log(text) }}></Column>
          <Column className="contract__table__nguoiTheoDoi" title="Người theo dõi" key="nguoiTheoDoi" dataIndex="creater_name" />
          <Column className="contract__table__total" fixed="right" title="Giá trị hợp đồng" key="sub__total" render={text => {
              let total = new Intl.NumberFormat("vi-VN").format(+text.total_include_VAT > 1000000 ? +text.total_include_VAT : +text.total_include_VAT * 1000000)
              return total + " VNĐ"
          }} ></Column>
          <Column className="contract__table__thaotac" fixed="right" key="thaoTac" render={(text) => {
            return <div className="table__thaotac">
                <Tooltip title="Chỉnh sửa" color="green">
                    <MdOutlineModeEditOutline className="style__svg" onClick={() => {
                        history.push(`${uri}/crm/subcontract/detail/${text.id}`);
                    }} />
                </Tooltip>
            </div>
        }} />
      </Table>
  )
}