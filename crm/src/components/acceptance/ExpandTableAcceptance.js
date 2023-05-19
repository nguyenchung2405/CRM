import moment from 'moment';
import React from 'react'

export default function ExpandTableAcceptance(props) {

    const { data } = props;

    const renderListDetail = ()=>{
        return data.map(detail => {
            let tuNgay = moment(new Date(detail.from_date)).format("DD-MM-YYYY");
            return <li key={detail.id}>
                <div>{detail.desc}</div>
                <div>{`${tuNgay}`}</div>
                <div>{detail.completed_evidences?.length > 0 ? detail.completed_evidences[0] : detail.completed_evidences}</div>
            </li>
        })
    }

  return (
    <ol className="acceptance__expand__table">
        {renderListDetail()}
    </ol>
  )
}