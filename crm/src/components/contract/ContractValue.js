import { Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'

export default function ContractValue(props) {

    const { handleChangeValue, valueOfField, valueForm, unlockInput, setUnlockInput, setValueForm } = props;
    const [isEdit, setIsEdit] = useState(false)

    useEffect(()=>{
        if (isEdit) {
            let doanhThu = calculateDoanhThu("total_include_VAT")
            setValueForm({
                ...valueForm,
                total_include_VAT: doanhThu
            })
        }
    }, [valueForm.VAT, valueForm.total, isEdit])

    const calculateGTTH = (mode = "display")=>{
        if(valueForm.VAT === 10 || +valueForm.VAT === 10){
            return ""
        } else {
            let originalPrice = valueForm.total / 1.1;
            let newGTTH = originalPrice * (1 + (valueForm.VAT / 100));
            return mode === "number" ? newGTTH : new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(newGTTH);
        }
    }

    const calculateGiaSauChietKhau = (row)=>{
        if(row === 1){
            if(valueForm.discount_by_percent === 0){
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(valueForm.total);
            } else {
                let giaSauChietKhau = valueForm.total - (valueForm.total * valueForm.discount_by_percent / 100);
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(giaSauChietKhau);
            }
        } else if(row === 2){
            if(calculateGTTH("number") === ""){
                return ""
            } else {
                let giaTriThucHien = calculateGTTH("number")
                let giaSauChietKhau = giaTriThucHien - (giaTriThucHien * valueForm.discount_by_percent / 100);
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(giaSauChietKhau);
            }
        }
    }
    const calculateDoanhThu = (row)=>{
        if(row === 1){
            if(valueForm.total_include_VAT >= 0  && !isEdit){
                // console.log("line 45", valueForm.total_include_VAT)
                return new Intl.NumberFormat("vi-VN",).format(valueForm.total_include_VAT * 1000000);
            } else {
                let giaTriTruocThue = valueForm.total / 1000000;
                let VAT = valueForm.VAT;
                let doanhThu = giaTriTruocThue + (giaTriTruocThue * VAT / 100);
                // console.log("line 51")
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(doanhThu.toFixed(4) * 1000000);
            }
            // let giaTriTruocThue = valueForm.total / 1000000;
            // let VAT = valueForm.VAT;
            // let doanhThu = giaTriTruocThue + (giaTriTruocThue * VAT / 100);
            // return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(doanhThu.toFixed(4) * 1000000);
        } else if(row ===2){
            let giaTriTruocThue = valueForm.total / 1000000;
            let VAT = valueForm.VAT;
            let discount = valueForm.discount_by_percent;
            if(discount !== 0){
                let doanhThuRow1 = giaTriTruocThue + (giaTriTruocThue * VAT / 100);
                let doanhThuRow2 = doanhThuRow1 - (doanhThuRow1 * discount / 100)
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(doanhThuRow2.toFixed(4) * 1000000);
            }
            return ""
        } else if(row === "total_include_VAT") {
            let giaTriTruocThue = valueForm.total / 1000000;
            let VAT = valueForm.VAT;
            let doanhThu = giaTriTruocThue + (giaTriTruocThue * VAT / 100);
            return  doanhThu
        }
    }
    
    /** 
     * code cũ 4 ô input
     <div className="create__contract__value border_bottom_3px">
  <p>Giá trị hợp đồng</p>
  <div className="field__input_3">
    <div className="contract__field">
      <input className="style" type="text"
        name="discount_over_contract"
        // disabled
        onChange={(e) => {
          let { value, name } = e.target;
          handleChangeValue(name, +value)
        }}
        value={valueOfField("discount_over_contract")}
      />
      <label>Chiết khấu (VNĐ)</label>
    </div>
    <div className="contract__field">
      <input className="style" type="text"
        name="VAT"
        // onChange={(e) => {
        //   let { value, name } = e.target;
        //   handleChangeValue(name, +value)
        // }}
        value={valueForm.original_total ? showGiaTriGoc("number") : showGiaTriGoc()}
        disabled
      />
      <label>Giá trị gốc</label>
    </div>
    <div className="contract__field">
      <input className="style" type="text"
        name="VAT"
        // onChange={(e) => {
        //   let { value, name } = e.target;
        //   handleChangeValue(name, +value)
        // }}
        value={valueForm.discount_total ? showGiaTriThucHien("number") : showGiaTriThucHien()}
        disabled
      />
      <label>Giá trị thực hiện</label>
    </div>
    <div className="contract__field">
      <Popconfirm
        title="Bạn có muốn chỉnh sửa không?"
        onConfirm={() => { setUnlockInput(false) }}
        // onCancel={cancel}
        okText="Có"
        cancelText="Không"
        disabled={!unlockInput}
      >
        <input
          className="style"
          type="text"
          name="total"
          onChange={(e) => {
            let { value, name } = e.target;
            let newValue = value.replaceAll(".", "");
            handleChangeValue(name, +newValue)
          }}
          value={valueOfField("total")}
          disabled={unlockInput}
        />
        <label className="pink__color">Giá trị hợp đồng</label>
      </Popconfirm>
    </div>
  </div>
</div>
     */

  return (
      <div className="create__contract__value border_bottom_3px">
          <p>Giá trị hợp đồng</p>
          <div className="field__input_3">
              <div className="contract__field">
                  <Popconfirm
                      title="Bạn có muốn chỉnh sửa không?"
                      onConfirm={() => { setUnlockInput(false); setIsEdit(true) }}
                      // onCancel={cancel}
                      okText="Có"
                      cancelText="Không"
                      disabled={!unlockInput}
                  >
                      <input
                          className="style"
                          type="text"
                          name="total"
                          onChange={(e) => {
                              let { value, name } = e.target;
                              let newValue = value.replaceAll(".", "");
                              handleChangeValue(name, +newValue)
                          }}
                          value={valueOfField("total")}
                          disabled={unlockInput}
                      />
                      <label className="pink__color">Giá trị trước thuế</label>
                  </Popconfirm>
              </div>
              <div className="contract__field">
                  <input className="style" type="text"
                      name="VAT"
                      // disabled
                      onChange={(e) => {
                          let { value, name } = e.target;
                          handleChangeValue(name, value)
                      }}
                      value={valueOfField("VAT")}
                  />
                  <label>VAT</label>
              </div>
              <div className="contract__field">
                  <input className="style" type="text"
                      name="VAT"
                      // onChange={(e) => {
                      //   let { value, name } = e.target;
                      //   handleChangeValue(name, +value)
                      // }}
                      value={calculateDoanhThu(1)}
                      disabled
                  />
                  <label>Doanh thu</label>
              </div>
          </div>
          <div className="field__input_3">
              <div className="contract__field">
                  <input className="style" type="text"
                      name="discount_by_percent"
                      // disabled
                      onChange={(e) => {
                          let { value, name } = e.target;
                          handleChangeValue(name, +value)
                      }}
                      value={valueOfField("discount_by_percent")}
                  />
                  <label>Chiết khấu (%)</label>
              </div>
              <div className="contract__field">
                  <input className="style" type="text"
                      name="VAT"
                      // onChange={(e) => {
                      //   let { value, name } = e.target;
                      //   handleChangeValue(name, +value)
                      // }}
                      value={calculateDoanhThu(2)}
                      disabled
                  />
                  <label>Doanh thu sau chiết khấu</label>
              </div>
          </div>
          <div className="contract__value__note">
              <textarea id="note"
                  name="note"
                  onChange={(e) => {
                      let { value, name } = e.target;
                      handleChangeValue(name, value)
                  }}
                  value={valueOfField("note")}
              ></textarea>
              <label>Ghi chú</label>
          </div>
      </div>
  )
}