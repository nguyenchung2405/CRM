import { Modal } from "antd"
import React, { useRef, useState } from "react"
import "./fileModal.less"
import { useEffect } from "react"
import * as doc from "docx-preview"
// import { read , utils , writeFileXLSX } from "xlsx"
export default function ViewDoc(props) {
    const { fileUrl, ...restProps } = props
    const {extName, linkUrl } = fileUrl 
    const docx = ["doc","docx"];
    const panel = useRef(null)
    
    useEffect(() => {
        if(docx.includes(extName)){
            fetch(linkUrl).then((res) => {
              const template = res.arrayBuffer();
              doc
                .renderAsync(template, panel.current)
                .then((x) => console.log("docx: finished"));
              console.log("buffer: ", template);
            });
        }
      }, [linkUrl]);

    return (
        <div className="file_model">
            <Modal {...restProps}>
                <div
                    style={{
                        height: "90vh",
                        width: "100%",
                        overflowX: "hidden"
                    }}
                >
                    {docx.includes(extName) &&
                        <div
                            ref={panel}
                            id="panel-section"
                            style={{ height: "100%", overflowY: "visible" }}
                        />
                    }
                </div>
            </Modal>
        </div>
    )
}
