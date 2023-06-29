import { Popconfirm } from 'antd';
import React, { useEffect } from 'react'

export default function ContractValue(props) {

    const { handleChangeValue, valueOfField, valueForm, unlockInput, setUnlockInput } = props;

    useEffect(()=>{
        
    }, [valueForm.VAT, valueForm.total])

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
            if(valueForm.discount_over_contract === 0){
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(valueForm.total);
            } else {
                let giaSauChietKhau = valueForm.total - (valueForm.total * valueForm.discount_over_contract / 100);
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(giaSauChietKhau);
            }
        } else if(row === 2){
            if(calculateGTTH("number") === ""){
                return ""
            } else {
                let giaTriThucHien = calculateGTTH("number")
                let giaSauChietKhau = giaTriThucHien - (giaTriThucHien * valueForm.discount_over_contract / 100);
                return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(giaSauChietKhau);
            }
        }
    }

  return (
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
                  <label>Chiết khấu (%)</label>
              </div>
              {
                  /**
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
                   */
              }
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
                      <label className="pink__color">Giá trị thực hiện</label>
                  </Popconfirm>
              </div>
              <div className="contract__field">
                  <input className="style" type="text"
                      name="VAT"
                      // onChange={(e) => {
                      //   let { value, name } = e.target;
                      //   handleChangeValue(name, +value)
                      // }}
                      value={calculateGiaSauChietKhau(1)}
                      disabled
                  />
                  <label>Giá trị sau chiết khấu</label>
              </div>
          </div>
          <div className="field__input_3">
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
                  <input
                      className="style"
                      type="text"
                      name="total"
                      //   onChange={(e) => {
                      //       let { value, name } = e.target;
                      //       let newValue = value.replaceAll(".", "");
                      //       handleChangeValue(name, +newValue)
                      //   }}
                      value={calculateGTTH("display")}
                      disabled={unlockInput}
                  />
                  <label className="pink__color">Giá trị thực hiện</label>
              </div>
              <div className="contract__field">
                  <input className="style" type="text"
                      name="VAT"
                      // onChange={(e) => {
                      //   let { value, name } = e.target;
                      //   handleChangeValue(name, +value)
                      // }}
                      value={calculateGiaSauChietKhau(2)}
                      disabled
                  />
                  <label>Giá trị sau chiết khấu</label>
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