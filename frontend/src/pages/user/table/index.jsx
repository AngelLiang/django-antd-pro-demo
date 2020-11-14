import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { queryUser } from './service';
import CreateForm from './components/CreateForm';

export default () => {
  const [paramState, setParamState] = useState({});
  const actionRef = useRef();
  const addFormRef = useRef();

  const [createModalVisible, handleModalVisible] = useState(false);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '名字',
      dataIndex: 'first_name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '启用',
      dataIndex: 'is_active',
      // valueType: 'boolean',
      search: false,
      valueEnum: {
        true: { text: '启用' },
        false: { text: '禁用' },
      },
    },
    {
      title: '加入时间',
      dataIndex: 'date_joined',
      valueType: 'dateTime',
      search: false,
    },
    // {
    //   title: '最后登录时间',
    //   dataIndex: 'last_login',
    //   valueType: 'dateTime'
    // },
  ]
    return (
      <PageContainer>
        <ProTable 
          params={paramState}
          actionRef={actionRef}
          toolBarRender={() => [
            <Input.Search key='search' style={{marginRight: 20}} placeholder="搜索用户 " onSearch={value => {
              setParamState({
                search: value,
              });
              actionRef.current.reload();
            }} />,
            <Button key='create' type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          rowKey='id'
          columns={columns}
          request={(params, sorter, filter) => queryUser({ ...params, sorter, filter })}
        />

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          type="form"
          formRef={addFormRef}
          rowKey="id"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>

    </PageContainer>
    )
  };
