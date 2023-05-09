import { Table } from 'antd'
import React from 'react'

export default function RequestEvent(props) {

    const { Column } = Table;
    const {productListFull, requestOfEvent} = props;

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

  return (
      <div className="create__contract__inforCustomer border_bottom_3px create__contract__inforContract create__contract__term">
          <p>Quyền lợi chung</p>
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
              return product?.location_ID?.channel_ID?.name + " - " + product?.location_ID?.name + " - " + product?.name
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
            className="price"
            title="Giá hiệu chỉnh"
            key="custom_price"
            render={(text) => {
              if (text.custom_price > 0) {
                return `${new Intl.NumberFormat("vi-VN").format(text.custom_price)} VNĐ`;
              } else {
                return null;
              }
            }}
          />
          <Column
            className="select"
            render={(text)=>{
                console.log(text)
                return <input type="checkbox" checked={true} onChange={(e)=>{
                    // console.log(e.target.checked)
                    // e.target.checked = !e.target.checked
                }} />
            }}
          />
        </Table>
      </div>
  )
}