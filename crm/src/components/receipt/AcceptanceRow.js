import React from 'react'

export default function AcceptanceRow(props) {

    const { ngayNghiemThu, multiSelect, setMultiSelect, data } = props;

    const checked = ()=>{
        if(multiSelect.includes(data.id)){
          return true
        } else {
          return false
        }
      }

  return (
      <div className="acceptance__row">
          <input type="checkbox"
              onChange={() => {
                  if (!checked()) {
                      setMultiSelect([...multiSelect, data.id])
                  } else {
                      let newSelect = [...multiSelect];
                      let removeSelectedInput = newSelect.filter(acc => acc !== data.id)
                      setMultiSelect([...removeSelectedInput])
                  }
              }}
              checked={checked()}
          />
          <span>{ngayNghiemThu}</span>
          <span>{data.desc}</span>
          <span>{new Intl.NumberFormat("vi-VN").format(data.price * 1000000)} VNĐ</span>
      </div>
  )
}