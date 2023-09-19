import { Image, Select, Tooltip, Modal } from "antd";
import React, { useState } from "react";
import { checkMicroFe } from "../../untils/helper";
import { v4 as uuidv4 } from "uuid";
import word from "../../img/doc.png";
import pdf from "../../img/pdf.png";
import image from "../../img/image.png";
import ViewDoc from "../ViewDoc";
import ViewPDF from "../ViewPDF";
import CreateCustomer from "../customer/CreateCustomer";

export default function InforCustomer(props) {
  const {
    renderOption,
    handleChangeValue,
    valueOfField,
    setValueForm,
    valueForm,
    renderOptionOwner,
    valueOfCustomer,
    history,
    customerInfor,
  } = props;
  let uri = checkMicroFe() === true ? "/contract-service" : "";
  let uri_file =
    checkMicroFe() === true
      ? window.location.href.includes("dev")
        ? "https://crmservice-dev.tuoitre.vn/"
        : "https://crmservice-staging.tuoitre.vn/"
      : "http://localhost:3003/";
  const [isShowModalWord, setIsShowModalWord] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [file, setFile] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalCustomer, setIsShowModalCustomer] = useState(false);

  const renderFiles = () => {
    if (customerInfor?.files?.length > 0) {
      return customerInfor?.files?.map((file, indexFile) => {
        let index = file.indexOf("_");
        let name = file.slice(index + 1);
        if (file?.includes("doc") || file?.includes("docx")) {
          return (
            <div className="upload__file" key={uuidv4()}>
              <Tooltip title={name}>
                <img
                  key={uuidv4()}
                  className="file"
                  src={word}
                  alt="xem word"
                  onClick={() => {
                    setIsShowModalWord(true);
                    setFile(uri_file + file);
                  }}
                />
              </Tooltip>
            </div>
          );
        } else if (file?.includes("pdf")) {
          return (
            <div className="upload__file" key={uuidv4()}>
              <Tooltip title={name}>
                <img
                  key={uuidv4()}
                  className="file"
                  src={pdf}
                  alt="xem pdf"
                  onClick={() => {
                    setIsShowModal(true);
                    setFile(uri_file + file);
                  }}
                />
              </Tooltip>
            </div>
          );
        } else {
          return (
            <div className="upload__file" key={uuidv4()}>
              <Tooltip title={name}>
                <img
                  key={uuidv4()}
                  className="file"
                  src={image}
                  alt="Xem ảnh"
                  onClick={() => {
                    setFile(uri_file + file);
                    setImageVisible(true);
                  }}
                />
              </Tooltip>
            </div>
          );
        }
      });
    }
  };

  return (
    <div className="create__contract__inforCustomer border_bottom_3px">
      <p>Thông tin khách hàng</p>
      <div className="field__input field__flex">
        <div className="infor__customer">
          <div className="field__input_2">
            <label>Tên khách hàng</label>
            <Select
              className="style"
              showSearch
              showArrow={false}
              placeholder="Tên khách hàng"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                handleChangeValue("client_ID", +value);
              }}
              value={valueOfField("client_ID")}
            >
              {renderOption()}
            </Select>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                // history.push(`${uri}/crm/customer/create`);
                setIsShowModalCustomer(true);
              }}
            >
              <path
                d="M11 7.32739V14.6537"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 10.9904H7.33337"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                stroke="#35794A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="field__input two__field">
            <div className="contract__field">
              <input
                className="style not__allow"
                type="text"
                disabled
                value={valueOfCustomer("tax_number")}
              />
              <label>Mã số thuế</label>
            </div>
            <div className="contract__field">
              <input
                className="style not__allow"
                type="text"
                disabled
                value={valueOfCustomer("phone")}
              />
              <label>Số điện thoại</label>
            </div>
          </div>
          <div className="field__input two__field">
            <div className="contract__field">
              <input
                className="style not__allow"
                type="text"
                disabled
                value={valueOfCustomer("address")}
              />
              <label>Địa chỉ</label>
            </div>
            <div className="contract__field">
              <input
                className="style not__allow"
                type="text"
                disabled
                value={valueOfCustomer("email")}
              />
              <label>Email</label>
            </div>
          </div>
          <div className="field__input two__field">
            <div className="contract__field">
              <input
                className="style not__allow"
                type="text"
                disabled
                value={valueOfCustomer("daiDien")}
              />
              <label>Người đại diện và chức danh</label>
            </div>
            <div className="contract__field">
              <input
                className="style"
                type="text"
                disabled
                value={valueOfCustomer("lienHe")}
              />
              <label>Người liên hệ và chức danh</label>
            </div>
          </div>
          <div className="client__files" key={uuidv4()}>
            {renderFiles()}
            <ViewDoc
              showModal={isShowModalWord}
              setIsShowModal={setIsShowModalWord}
              word={file}
            />
            <Image
              style={{
                display: "none",
              }}
              preview={{
                visible: imageVisible,
                src: file,
                onVisibleChange: (value) => {
                  setImageVisible(value);
                },
              }}
            />
            <ViewPDF
              key={uuidv4()}
              pdf={file}
              showModal={isShowModal}
              setIsShowModal={setIsShowModal}
            />
          </div>
        </div>
        <div className="infor__owner">
          <div className="field__input_2">
            <label>Người đầu mối</label>
            <Select
              className="style"
              showSearch
              showArrow={false}
              placeholder="Người đầu mối"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value, option) => {
                setValueForm({
                  ...valueForm,
                  owner: +value,
                  owner_name: option.children,
                });
              }}
              value={valueOfField("owner")}
            >
              {renderOptionOwner()}
            </Select>
            <Modal
              title="Thêm Khách hàng"
              closeIcon={
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.61719 6.5L13.4609 11.3438C13.5911 11.474 13.5911 11.6172 13.4609 11.7734L12.5625 12.6719C12.4062 12.8021 12.263 12.8021 12.1328 12.6719L11.3125 11.8125L7.28906 7.82812L2.44531 12.6719C2.3151 12.8021 2.17188 12.8021 2.01562 12.6719L1.11719 11.7734C0.986979 11.6172 0.986979 11.474 1.11719 11.3438L5.96094 6.5L1.11719 1.65625C0.986979 1.52604 0.986979 1.38281 1.11719 1.22656L2.01562 0.328125C2.17188 0.197917 2.3151 0.197917 2.44531 0.328125L7.28906 5.17188L12.1328 0.328125C12.263 0.197917 12.4062 0.197917 12.5625 0.328125L13.4609 1.22656C13.5911 1.38281 13.5911 1.52604 13.4609 1.65625L12.6016 2.47656L8.61719 6.5Z"
                    fill="black"
                  />
                </svg>
              }
              footer={null}
              open={isShowModalCustomer}
              onCancel={() => setIsShowModalCustomer(false)}
            >
              <CreateCustomer
                onCancelMoal={() => {
                  setIsShowModalCustomer(false);
                }}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
