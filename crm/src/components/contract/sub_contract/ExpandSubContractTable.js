import { Table, Tooltip } from 'antd';
import moment from 'moment';
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

    const filterStatus = [
        {
            text: "Đang chạy",
            value: "Đang chạy"
        },
        {
            text: "Kết thúc",
            value: "Kết thúc"
        },
        {
            text: "Chưa chạy",
            value: "Chưa chạy"
        },
        {
            text: "Quá hạn nhưng chưa thanh lý",
            value: "Quá hạn"
        },
    ]

  return (
      <Table
          dataSource={subContractList}
          pagination={false}
          scroll={{
              x: "max-content",
          }}
          rowKey={record => record.id + record.contract_ID}
      >
          <Column className="contract__table__loaiHopDong" title="Loại hợp đồng" key="loaiHopDong" fixed="left"
              render={(text) => {
                  return text.contract_type_ID.name.toUpperCase()
              }} />
          <Column title="Loại" fixed="left" render={text => {
              if (text.extend_parent_contract) {
                  return "Phụ lục"
              } else if (!text.extend_parent_contract) {
                  return "Hợp đồng con"
              }
          }}></Column>
          <Column className="contract__table__customerName" title="Tên khách hàng" key="customerName" fixed="left"
              render={(text) => {
                  return text?.client_ID?.name
              }}
          />
          <Column className="contract__table__time" title="Thời gian thực hiện" key="time"
              render={(text) => {
                  // let batDau = convertDate(text.begin_date);
                  // let ketThuc = convertDate(text.end_date);
                  let batDau = moment(text.begin_date).format("DD/MM/YYYY");
                  let ketThuc = moment(text.end_date).format("DD/MM/YYYY");
                  return `${batDau} - ${ketThuc}`
              }} />
          <Column className="contract__table__status"
              filters={filterStatus}
              filterSearch={true}
              filterMode="menu"
              onFilter={(value, record) => { return record.status.toLowerCase().includes(value.toLowerCase()) }}
              title="Trạng thái"
              key="status"
              render={(text) => {
                  return <span status={text.status.toLowerCase()}>{text.status}</span>
              }}
            />
          <Column className="contract__table__nguoiDauMoi" title="Người đầu mối" key="nguoiDauMoi" dataIndex="owner_name" />
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