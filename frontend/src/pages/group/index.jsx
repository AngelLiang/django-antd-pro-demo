import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { notification, message } from 'antd';
import { useRef, useState, useEffect } from 'react';
import { Button, Input, Form, Descriptions, Switch, Transfer } from 'antd';
import { queryGroup, updateGroup, addGroup } from './service';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { dealManyToManyField } from '@/utils/formField'; 
import { queryPermission } from '@/pages/permission/service';

export default () => {
  const [paramState, setParamState] = useState({});
  const actionRef = useRef();
  const addFormRef = useRef();
  const updateFormRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);

  const [permissionsManyToManyList, setPermissionsManyToManyList] = useState([]);
  useEffect(() => {
    queryPermission({'all':1}).then(response => {
      setPermissionsManyToManyList(response);
    });
  }, []);
  const [permissionsTargetList, setPermissionsTargetList] = useState([]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      search: false,
      hideInTable: true,
      renderFormItem: (item, {type, defaultRender}, form) => {
        setPermissionsTargetList(form.getFieldValue('permissions') || [])
        if (type === 'form') {
          // 穿梭框 https://ant.design/components/transfer-cn/
          return (<Transfer
                  showSearch
                  dataSource={permissionsManyToManyList}
                  targetKeys={permissionsTargetList}
                  onChange={(targetKeys, direction, moveKeys) => {
                      console.log(targetKeys, direction, moveKeys);
                      setPermissionsTargetList(targetKeys)
                      form.setFieldsValue({'permissions': targetKeys})
                  }}
                  rowKey={record => record.id}
                  render={item => item.name}
                  oneWay={false}
                  pagination
              />
          );
        }
        return defaultRender(item);

      },
      render: (text, record) => {
          return renderManyToMany(text)
      },
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
            <Input.Search key='search' style={{marginRight: 20}} placeholder="搜索权限组" onSearch={value => {
                setParamState({search: value});
                actionRef.current.reload();
            }} />,
            <Button key='create' type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          rowKey='id'
          columns={columns}
          request={(params, sorter, filter) => queryGroup({ ...params, sorter, filter })}
        />

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
            formRef={addFormRef}
            type="form"
            form={{
              labelCol: {span: 5},
              wrapperCol: {span: 15},
              labelAlign: 'left',
            }}
            rowKey="id"
            columns={columns}
            rowSelection={{}}
            onSubmit={async values => {
              // console.log(values)
              addGroup(values).then(response=>{
                console.log(response)
                handleModalVisible(false);
                message.success('创建成功');
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              })
            }}
          />
      </CreateForm>

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
              updateGroup(updateFormValues.id, values).then(response=>{
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
