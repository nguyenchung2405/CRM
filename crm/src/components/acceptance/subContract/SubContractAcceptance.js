import { Table, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { GET_SUB_CONTRACT_LIST } from "../../../title/title";
import CreateReceiptModal from "../../receipt/CreateReceiptModal";
import ReportModalSub from "./ReportModalSub";
import { AiFillPlusCircle } from "react-icons/ai";
import ExpandRequestTable from "./ExpandRequestTable";
export default function SubContractAcceptance() {
  const { Column } = Table;
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const [list, setList] = useState([]);
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  const [dataToCreateModal, setDataToCreateModal] = useState({});
  const [search, setSearch] = useState({
    client_name: "",
    sub_contract_number: "",
    contract_number: "",
    owner_name: "",
  });
  const { total, subContractList } = useSelector(
    (state) => state.contractReducer
  );

  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: GET_SUB_CONTRACT_LIST,
      data: { page, pageNumber, status: "Đang chạy" },
    });
  }, [page, pageNumber]);

  useEffect(() => {
    if (subContractList?.length > 0) {
      let newList = subContractList.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setList(newList);
    } else {
      setList([]);
    }
  }, [subContractList]);
  const handleSubmitSearch = () => {
    setPage(1);
    setPageNumber(10);
    dispatch({
      type: GET_SUB_CONTRACT_LIST,
      data: { page, pageNumber, status: "Đang chạy", search },
    });
  };
  return (
    <div className="acceptance__table content">
      <ReportModalSub
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
      <div className="content reciept__table customer__table">
        <div className="table__features">
          <div className="table__features__add">
            <h1>Theo dõi thực hiện quyền lợi hợp đồng con/phụ lục</h1>
            <Tooltip title="Tạo nghiệm thu" color="green">
              <FcPlus
                style={{ marginRight: "5px" }}
                onClick={() => {
                  setIsShowModal(true);
                }}
              />
            </Tooltip>
          </div>
          <div className="table__features__search">
            <input
              style={{ padding: "10px" }}
              placeholder="Tên khách hàng"
              type="text"
              value={search.client_name}
              onChange={(value) => {
                setSearch({ ...search, client_name: value.target.value });
              }}
            />
            <input
              style={{ padding: "10px" }}
              placeholder="Số hợp đồng cha"
              type="text"
              value={search.contract_number}
              onChange={(value) => {
                setSearch({ ...search, contract_number: value.target.value });
              }}
            />
            <input
              style={{ padding: "10px" }}
              placeholder="Số hợp đồng con/phụ lục"
              type="text"
              value={search.sub_contract_number}
              onChange={(value) => {
                setSearch({
                  ...search,
                  sub_contract_number: value.target.value,
                });
              }}
            />

            <input
              style={{ padding: "10px", marginLeft: "20px" }}
              placeholder="Người đầu mối"
              type="text"
              value={search.owner_name}
              onChange={(value) => {
                setSearch({ ...search, owner_name: value.target.value });
              }}
            />

            <div className="table__features__search__btn">
              <button onClick={handleSubmitSearch}>Tìm kiếm</button>
            </div>
          </div>
        </div>
        <CreateReceiptModal
          isShowModal={isShowCreateModal}
          setIsShowModal={setIsShowCreateModal}
          dataToCreateModal={dataToCreateModal}
        />
        <Table
          dataSource={list}
          pagination={{
            position: ["bottomLeft"],
            defaultPageSize: 10,
            locale: { items_per_page: "" },
            defaultCurrent: 1,
            showSizeChanger: true,
            total: total,
            pageSizeOptions: [10, 50, 100],
            onChange: (page, pageNumber) => {
              setPageNumber(pageNumber);
              setPage(page);
            },
            showTotal: (total) => {
              if (pageNumber * page < total) {
                return `Hiển thị ${pageNumber * page} trong ${total}`;
              }
              return `Hiển thị ${total} trong ${total}`;
            },
          }}
          rowKey={(record) => record.id}
          expandable={{
            showExpandColumn: true,
            expandedRowRender: (record) => {
              return <ExpandRequestTable data={record} />;
            },
            // rowExpandable: record => record.has_sub_contract
          }}
        >
          <Column
            className="contract__table__loaiHopDong"
            title="Số hợp đồng con/phụ lục"
            key="soHopDongCon"
            fixed="left"
            render={(text) => {
              return text.sub_contract_number.toUpperCase();
            }}
          />
          <Column
            className="contract__table__loaiHopDong"
            title="Loaị hợp đồng"
            key="loaiHopDong"
            fixed="left"
            render={(text) => {
              return text.contract_type_ID?.name.toUpperCase();
            }}
          />
          <Column
            title="Loại"
            fixed="left"
            render={(text) => {
              if (text.extend_parent_contract) {
                return "Phụ lục";
              } else if (!text.extend_parent_contract) {
                return "Hợp đồng con";
              }
            }}
          ></Column>
          <Column
            className="contract__table__customerName"
            title="Tên khách hàng"
            key="customerName"
            fixed="left"
            render={(text) => {
              return text?.client_ID?.name;
            }}
          />
          <Column
            className="contract__table__time"
            title="Thời gian thực hiện"
            key="time"
            render={(text) => {
              // let batDau = convertDate(text.begin_date);
              // let ketThuc = convertDate(text.end_date);
              let batDau = moment(text.begin_date).format("DD/MM/YYYY");
              let ketThuc = moment(text.end_date).format("DD/MM/YYYY");
              return `${batDau} - ${ketThuc}`;
            }}
          />
          <Column
            className="contract__table__status"
            onFilter={(value, record) => {
              return record.status.toLowerCase().includes(value.toLowerCase());
            }}
            title="Trạng thái"
            key="status"
            render={(text) => {
              return (
                <span status={text.status.toLowerCase()}>{text.status}</span>
              );
            }}
          />
          <Column
            className="contract__table__nguoiDauMoi"
            title="Người đầu mối"
            key="nguoiDauMoi"
            dataIndex="owner_name"
          />
          <Column
            className="contract__table__nguoiTheoDoi"
            title="Người theo dõi"
            key="nguoiTheoDoi"
            dataIndex="creater_name"
          />
          <Column
            className="contract__table__total"
            fixed="right"
            title="Giá trị hợp đồng"
            key="sub__total"
            render={(text) => {
              let total = new Intl.NumberFormat("vi-VN").format(
                +text.total_include_VAT > 1000000
                  ? +text.total_include_VAT
                  : +text.total_include_VAT * 1000000
              );
              return total + " VNĐ";
            }}
          ></Column>
          <Column
            fixed="right"
            render={(text) => {
              return (
                <div className="table__thaotac">
                  <Tooltip title="Tạo quyết toán" color="green">
                    <AiFillPlusCircle
                      className="style__svg"
                      onClick={() => {
                        setIsShowCreateModal(true);
                        setDataToCreateModal({
                          sub_contract_id: text.id,
                          contract_id: text.contract_ID,
                        });
                      }}
                    />
                  </Tooltip>
                </div>
              );
            }}
          ></Column>
        </Table>
      </div>
    </div>
  );
}
