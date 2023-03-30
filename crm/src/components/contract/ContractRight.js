import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'file' ? 
                            record.file.length > 0 ?
                                <Input />
                            :  <input type="file" /> 
                        : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

function convertLegacyProps(data){
    try {
        return data.map(item => {
            return {
                desc: item.desc,
                file: item?.file,
                from_date: item.from_date,
                key: uuidv4()
            }
        })
    } catch (error) {
        console.log("convertLegacyProps", error)
    }
}

export default function ContractRight(props) {
    const [data, setData] = useState();
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    useEffect(()=>{
      setData(convertLegacyProps(props.data))
    }, [props.data])

    const edit = (record) => {
        form.setFieldsValue({
          ...record,
        });
        setEditingKey(record.key);
      };
      const cancel = () => {
        setEditingKey('');
      };
      const save = async (key) => {
        try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
    const columns = [
        {
          editable: true,
          dataIndex: "from_date",
          title: "Ngày đăng"
        },
        {
            editable: true,
            dataIndex: "desc",
            title: "Mô tả"
        },
        {
            editable: true,
            dataIndex: "file",
            title: "File"
        },
        {
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link
                    onClick={() => save(record.key)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Save
                  </Typography.Link>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
              );
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => {
            return {
                record,
                inputType: col.dataIndex === 'file' ? 'file' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
              }
          }
        };
      });
      console.log(mergedColumns)
  return (
    <Form form={form} component={false}>
        <Table
            className="expand__table"
            components={{
                body: {
                cell: EditableCell,
                },
            }}
            dataSource={data}
            pagination={false}
            showHeader={true}
            columns={mergedColumns}      
        >
           
        </Table>
    </Form>
  )
}
