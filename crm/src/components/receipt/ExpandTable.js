import moment from 'moment';
import React, { useState } from 'react'
import HandleFeatures from './HandleFeatures';

export default function ExpandTableReceipt(props) {

    const { data, contract_id } = props;

    const renderListDetail = ()=>{
        return data.map(detail => {
            let tuNgay = moment(new Date(detail.request_date)).format("DD-MM-YYYY");
            let newValue = new Intl.NumberFormat("vi-VN").format(detail.total_value * 1000000)
            let isExistExport = detail.receipts.length > 0 ? true : false;
            let receipt_id = detail?.receipts[0]?.id;
            let isComplete = detail?.receipts[0]?.is_complete;
            return <li key={detail.id}>
                <div>{`${tuNgay}`}</div>
                <div>{newValue}</div>
                <HandleFeatures isComplete={isComplete} payment_ID={detail.id} isExistExport={isExistExport} receipt_id={receipt_id} contract_id={contract_id} />
            </li>
        })
    }

  return (
    <ol className="acceptance__expand__table">
        {renderListDetail()}
    </ol>
  )
}
