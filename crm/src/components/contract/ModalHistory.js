import { Modal, Table } from 'antd'
import React from 'react'

export default function ModalHistory(props) {

    const { isShowModal, setIsShowModal, dataToModal } = props;
    const { Column } = Table;

    const handleCancel = () => {
        setIsShowModal(false)
    }

    const convertContractRequest = () => {
        return dataToModal?.requests?.map(request => {
            return {
                quality: request?.quality,
                real_price: request?.price * 1000000,
                custom_price: request?.custom_price * 1000000,
                product: request?.product
            }
        })
    }

    const valueOfField = (name) => {
        if (dataToModal[name] && (name === "total" || name === "discount_over_contract" 
        || name === "original_total" || name ==="discount_total")) {
            return new Intl.NumberFormat("vi-VN").format(dataToModal[name] * 1000000)
        }
        return dataToModal[name]

    }

    return (
        <Modal
            title={<span>Lịch sử chỉnh sửa</span>}
            closeIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z" fill="black" />
            </svg>}
            footer={
                <div className="contract__service__footer">
                    <button type="button" className="ant-btn ant-btn-default btn__cancel" onClick={handleCancel}>
                        <span>Hủy</span>
                    </button>
                </div>
            }
            open={isShowModal}
            onCancel={handleCancel}
            className="history__modal"
            width="1000px"
        >
            <div className="create__contract content history__modal__content">
                <div className="modal__content create__contract__content">
                    <div className="create__contract__term border_bottom_3px">
                        <div className="display__flex">
                            <p>Quyền lợi hợp đồng</p>
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
                                // dataIndex="product_ID"
                                render={(text) => {
                                    return text.product
                                }}
                            />
                            <Column
                                className="donGia"
                                title="Đơn giá"
                                key="price"
                                render={(text) => {
                                    // console.log("text", text)
                                    // let vndCurrency = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(text.real_price)
                                    // return `${text.real_price} VNĐ`;
                                    return `${new Intl.NumberFormat("vi-VN").format(text.real_price)} VNĐ`;
                                }}
                            />
                            <Column
                                className="quality"
                                title="Số lượng"
                                key="quality"
                                render={(text) => {
                                    // let vndCurrency = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(text.real_price)
                                    // return `${text.real_price} VNĐ`;
                                    return `${text.quality}`;
                                }}
                            />
                            <Column
                                className="price"
                                title="Thành tiền"
                                key="price"
                                render={(text) => {
                                    // let vndCurrency = new Intl.NumberFormat("vi-VN",{currency: "VND"}).format(text.real_price)
                                    // return `${text.real_price} VNĐ`;
                                    // return `${new Intl.NumberFormat("vi-VN").format(text.quality * text.price)} VNĐ`;
                                    // console.log(text)
                                    // let newPrice = Number(text.real_price.replaceAll(".",""));
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
                        </Table>
                    </div>
                    <div className="create__contract__value border_bottom_3px">
                        <p>Giá trị hợp đồng</p>
                        <div className="field__input_3">
                            <div className="contract__field">
                                <input className="style" type="text"
                                    name="discount_over_contract"
                                    disabled
                                    value={valueOfField("discount_over_contract")}
                                />
                                <label>Chiết khấu (VNĐ)</label>
                            </div>
                            <div className="contract__field">
                                <input className="style" type="text"
                                    name="VAT"
                                    value={valueOfField("original_total")}
                                    disabled
                                />
                                <label>Giá trị gốc</label>
                            </div>
                            <div className="contract__field">
                                <input className="style" type="text"
                                    name="VAT"
                                    value={valueOfField("discount_total")}
                                    disabled
                                />
                                <label>Giá trị thực hiện</label>
                            </div>
                            <div className="contract__field">
                                <input
                                    className="style"
                                    type="text"
                                    name="total"
                                    value={valueOfField("total")}
                                    disabled
                                />
                                <label className="pink__color">Giá trị hợp đồng</label>
                            </div>
                        </div>
                        <div className="contract__value__note">
                            <textarea id="note"
                                name="note"
                                value={valueOfField("note")}
                                disabled
                            ></textarea>
                            <label>Ghi chú</label>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}