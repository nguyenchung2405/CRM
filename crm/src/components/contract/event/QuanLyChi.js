import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function QuanLyChi(props) {

    const { quanLyChi, setQuanLyChi } = props;
    const dispatch = useDispatch();
    const [chiTieu, setChiTieu] = useState({thongTinChi: "", soTien: ""})
    const [totalChiTieu, setTotalChiTieu] = useState();
    
    useEffect(()=>{
        let total=0;
        for(let item in quanLyChi){
            total += quanLyChi[item]
        }
        if(total > 0){
            setTotalChiTieu(total)
        }
    }, [quanLyChi])

    const handleAddChi = ()=>{
        let key = chiTieu.thongTinChi;
        let value = chiTieu.soTien;
        setQuanLyChi({
            ...quanLyChi,
            [key]: value
        })
        setChiTieu({ thongTinChi: "", soTien: "" })
    }

    const renderChiTieu = ()=>{
        let liArr =[]
        for(let item in quanLyChi){
            liArr.push( <li>{`${item} - ${new Intl.NumberFormat("vi-VN").format(quanLyChi[item])} VNĐ`}</li>)
        }
        return liArr;
    }

  return (
    <div className="create__contract__chiTieu border_bottom_3px">
          <div className="display__flex contract__payment">
            <div className="display__flex">
              <p>Quản lý chi tiêu</p>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleAddChi}
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
          </div>
          <div className="display__flex">
              <input className="style" type="text" placeholder="Thông tin chi"
                  name="thongTinChi"
                  value={chiTieu.thongTinChi}
                  onChange={(e) => {
                      let { value, name } = e.target;
                      setChiTieu({
                          ...chiTieu,
                          [name]: value
                      })
                  }} />
              <input className="style" type="text" placeholder="Số tiền"
                  name="soTien"
                  value={chiTieu.soTien}
                  onChange={(e) => {
                      let { value, name } = e.target;
                      setChiTieu({
                          ...chiTieu,
                          [name]: +value
                      })
                  }} />
          </div>
          <div className="contract__payment__process">
              <ol style={{ paddingLeft: "30px" }}>
                  { renderChiTieu() }
              </ol>
          </div>
          <div className="donate__total padding_30px">
              {
                  totalChiTieu > 0
                      ? <b>Tổng tiền chi: {new Intl.NumberFormat("vi-VN").format(totalChiTieu) + " VNĐ"}</b>
                      : ""
              }
          </div>
      </div>
  )
}
