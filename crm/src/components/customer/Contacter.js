import React from 'react'

export default function Contacter(props) {



  return (
      <div className="client__contacter">
          <div className="modal__two__field">
              <div className="field__input width__241">
                  <input type="text" name="representative"
                    //   value={valueOfField("representative")}
                    //   onChange={handleChangeInput}
                  />
                  <label>Người liên hệ</label>
              </div>
              <div className="field__input width__241">
                  <input type="text" name="represent_position"
                    //   value={valueOfField("represent_position")}
                    //   onChange={handleChangeInput}
                  />
                  <label>Chức vụ</label>
              </div>
          </div>
          <div className="modal__field">
              <input type="text" name="represent_phone"
                //   value={valueOfField("represent_phone")}
                //   onBlur={regexValue}
                //   onChange={handleChangeInput}
              />
              <label>Số điện thoại (người liên hệ)</label>
              {/*validateForm?.represent_phone ? showRemind("represent_phone") : "" */}
          </div>
          <div className="modal__field">
              <input type="text" name="represent_email"
                //   value={valueOfField("represent_email")}
                //   onBlur={regexValue}
                //   onChange={handleChangeInput}
              />
              <label>Email (người liên hệ)</label>
              {/*validateForm?.represent_email ? showRemind("represent_email") : "" */}
          </div>
      </div>
  )
}