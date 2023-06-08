import React from 'react'

export default function ContractHistory(props) {

    const {data} = props;
    console.log(data)
    const showHistory = ()=>{
        
    }

  return (
    <div className="create__contract__payment border_bottom_3px">
          <div className="display__flex contract__payment">
            <div className="display__flex">
              <p>Lịch sử chỉnh sửa</p>
            </div>
          </div>
          <div className="contract__payment__process">
            {showHistory()}
          </div>
        </div>
  )
}
