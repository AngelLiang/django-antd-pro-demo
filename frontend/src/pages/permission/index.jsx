import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { message } from 'antd';
import { useRef, useState, useEffect } from 'react';
import { Button, Input, Form, Descriptions, Switch  } from 'antd';
import { queryPermission, updatePermission } from './service';
import { EditOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';

export default () => {
  const [paramState, setParamState] = useState({});
  const actionRef = useRef();
  const updateFormRef = useRef();
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '权限名称',
      dataIndex: 'name',
    },
    {
      title: '权限编码',
      dataIndex: 'codename',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
            return <Descriptions.Item label={rest.label}>{form.getFieldValue('codename')}</Descriptions.Item>
        }
        return defaultRender(_);
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <EditOutlined title="编辑" className="icon" onClick={async () => {
          setUpdateFormValues(record);
          handleUpdateModalVisible(true);
        }} />
      ),
    },
  ]

    return (
    <PageContainer>
        <ProTable 
          params={paramState}
          actionRef={actionRef}
          toolBarRender={() => [
          <Input.Search key='search' style={{marginRight: 20}} placeholder="搜索权限" onSearch={value => {
              setParamState({search: value});
              actionRef.current.reload();
          }} />,
          ]}
          rowKey='id'
          columns={columns}
          request={(params, sorter, filter) => queryPermission({ ...params, sorter, filter })}
        />

        <UpdateForm onCancel={() => handleUpdateModalVisible(false)} modalVisible={updateModalVisible}>
          <ProTable
            formRef={updateFormRef}
            type="form"
            form={{
              initialValues: updateFormValues, 
              labelCol: {span: 5},
              wrapperCol: {span: 15},
              labelAlign: 'left',
            }}
            rowKey="id"
            columns={columns}
            rowSelection={{}}
            onSubmit={async values => {
              updatePermission(updateFormValues.id, values).then(response=>{
              console.log(response)
              handleUpdateModalVisible(false);
              message.success('修改成功');
              if (actionRef.current) {
                  actionRef.current.reload();
              }
              })
            }}
          />
        </UpdateForm>

    </PageContainer>
    )
};
