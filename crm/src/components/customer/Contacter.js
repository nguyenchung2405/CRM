import React from 'react'

export default function Contacter(props) {

  const { handleChangeInput, valueOfField } = props;

  return (
    <div className="client__contacter">
      <div className="modal__two__field">
        <div className="field__input width__241">
          <input type="text" name="contact"
            value={valueOfField("contact")}
            onChange={handleChangeInput}
          />
          <label>Người liên hệ</label>
        </div>
        <div className="field__input width__241">
          <input type="text" name="contact_position"
            value={valueOfField("contact_position")}
            onChange={handleChangeInput}
          />
          <label>Chức vụ</label>
        </div>
      </div>
      <div className="modal__field">
        <input type="text" name="contact_addr"
          value={valueOfField("contact_addr")}
          onChange={handleChangeInput}
        />
        <label>Địa chỉ (người liên hệ)</label>
      </div>
      <div className="modal__field">
        <input type="text" name="contact_phone"
          value={valueOfField("contact_phone")}
          //   onBlur={regexValue}
          onChange={handleChangeInput}
        />
        <label>Số điện thoại (người liên hệ)</label>
        {/*validateForm?.represent_phone ? showRemind("represent_phone") : "" */}
      </div>
      <div className="modal__field">
        <input type="text" name="contact_email"
          value={valueOfField("contact_email")}
          //   onBlur={regexValue}
          onChange={handleChangeInput}
        />
        <label>Email (người liên hệ)</label>
        {/*validateForm?.represent_email ? showRemind("represent_email") : "" */}
      </div>
    </div>
  )
}