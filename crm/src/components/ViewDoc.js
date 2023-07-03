import { Modal } from "antd"
import React, { useRef, useState } from "react"
// import "./fileModal.less"
import { useEffect } from "react"
import * as doc from "docx-preview"
import axios from "axios";
import { local } from "../title/title";
// import { read , utils , writeFileXLSX } from "xlsx"
export default function ViewDoc(props) {
    const { word, showModal, setIsShowModal } = props;
    const panel = useRef(null)
    const [base64URL, setBase64URL] = useState();
 
    useEffect(() => {
        if(base64URL !== "" && base64URL?.length > 0){
            fetch(base64URL).then((res) => {
                const template = res.arrayBuffer();
                doc
                .renderAsync(template, panel.current)
                .then((x) => console.log("docx: finished"))
                .catch(err => console.log(err))
                // console.log("buffer: ", template, panel.current)
            });
        }
      }, [base64URL]);

      useEffect(()=>{
        if(word.includes("doc") || word.includes("docx")){
            const handlePreview = axios({
                url: `${local}/api/contract/get-file?link=${word}`,
                method: "GET",
            });
            handlePreview.then(resolve => {
                // console.log(`data:${resolve?.data?.type};base64,${resolve?.data?.link}`)
                setBase64URL(`data:${resolve?.data?.type};base64,${resolve?.data?.link}`)
            })
        }
      }, [word])

      const handleOk = () => {
        setIsShowModal(false);
      };
      const handleCancel = () => {
        setIsShowModal(false);
      };

    return (
        <div className="file_model">
            <Modal className="view__doc" width="900px" open={showModal} onOk={handleOk} onCancel={handleCancel} footer={null} closable={false} >
                <div
                    style={{
                        height: "90vh",
                        width: "100%",
                        overflowX: "hidden"
                    }}
                >
                    
                        <div
                            ref={panel}
                            id="panel-section"
                            style={{ height: "100%",width:"100%" , overflowY: "visible" }}
                        />
                    
                </div>
            </Modal>
        </div>
    )
}
