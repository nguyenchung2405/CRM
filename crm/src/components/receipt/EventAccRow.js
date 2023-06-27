import React from 'react'

export default function EventAccRow(props) {
  
    const { convertDate, multiSelect2, setMultiSelect2, data } = props;

    const checked = () => {
        if (multiSelect2.includes(data.id)) {
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
                        setMultiSelect2([...multiSelect2, data.id])
                    } else {
                        let newSelect = [...multiSelect2];
                        let removeSelectedInput = newSelect.filter(acc => acc !== data.id)
                        setMultiSelect2([...removeSelectedInput])
                    }
                }}
                checked={checked()}
            />
            <span>{convertDate}</span>
            <span>{data.desc}</span>
        </div>
  )
}
