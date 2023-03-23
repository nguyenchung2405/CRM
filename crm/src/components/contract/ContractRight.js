import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import React, { useState } from 'react'

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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
                price: item.price_ID.price,
                from_date: item.from_date,
                to_date: item.to_date
            }
        })
    } catch (error) {
        console.log("convertLegacyProps", error)
    }
}

export default function ContractRight(props) {
    const [data, setData] = useState(convertLegacyProps(props.data));
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    console.log(data)
    const edit = (record) => {
        form.setFieldsValue({
            desc: '',
            from_date: '',
            to_date: '',
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
          const newData = [...props.data];
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
            dataIndex: "desc"
        },
        {
            editable: true,
            dataIndex: "price"
        },
        {
            editable: true,
            dataIndex: "from_date"
        },
        {
            editable: true,
            dataIndex: "to_date"
        },
        {
            title: 'operation',
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
                // inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
              }
          }
        };
      });

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
            showHeader={false}
            columns={mergedColumns}      
        >
           
        </Table>
    </Form>
  )
}
