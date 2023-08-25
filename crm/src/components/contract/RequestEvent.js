import { Table, Tooltip } from 'antd'
import React from 'react'
import InforIMG from "../../img/information.png"

export default function RequestEvent(props) {

    const { Column } = Table;
    const {productListFull, requestOfEvent, selectGeneralRequest, setSelectGeneralRequest} = props;

    const convertContractRequest = () => {
      return requestOfEvent?.map(request => {
        return {
          key: request?.id,
          id: request?.id,
          price_ID: request.price_ID,
          product_ID: request.product_ID,
          quality: request.quantity,
          real_price: request.value_detail * 1000000,
          custom_price: 0
        }
      })
    }

    const checked = (data)=>{
      if(selectGeneralRequest.includes(data.id)){
        return true
      } else {
        return false
      }
    }

  return (
      <div className="create__contract__inforCustomer border_bottom_3px create__contract__inforContract create__contract__term">
          <div className="display__flex">
            <p>Quyền lợi chung</p>
            <Tooltip title="Nếu khách hàng đồng ý với quyền lợi chung nào của Sự kiện thì tick vào ô vuông ngoài cùng bên phải.">
              <img src={InforIMG} alt="question" />
            </Tooltip>
          </div>
          <Table
          className="term__table"
          dataSource={convertContractRequest()}
          pagination={false}
        >
          <Column
            className="item"
            title="Sản phẩm"
            key="item"
            render={(text) => {
              let product = productListFull.find(product => product.id === text.product_ID)
              return product?.channel?.name + " - " + product?.location?.name + " - " + product?.name
            }}
          />
          <Column
            className="donGia"
            title="Đơn giá"
            key="price"
            render={(text) => {
              return `${new Intl.NumberFormat("vi-VN").format(text.real_price)} VNĐ`;
            }}
          />
          <Column
            className="quality"
            title="Số lượng"
            key="quality"
            render={(text) => {
              return `${text.quality}`;
            }}
          />
          <Column
            className="price"
            title="Thành tiền"
            key="price"
            render={(text) => {
              return `${new Intl.NumberFormat("vi-VN").format(text.real_price * text.quality)} VNĐ`;
            }}
          />
          <Column
            className="select"
            render={(text)=>{
                return <input type="checkbox" checked={checked(text)} onChange={()=>{
                    if(!checked(text)){
                      setSelectGeneralRequest([...selectGeneralRequest, text.id])
                    } else {
                      let newSelect = [...selectGeneralRequest];
                      let removeSelectedInput = newSelect.filter(request => request !== text.id)
                      setSelectGeneralRequest([...removeSelectedInput])
                    }
                }} />
            }}
          />
        </Table>
      </div>
  )
}