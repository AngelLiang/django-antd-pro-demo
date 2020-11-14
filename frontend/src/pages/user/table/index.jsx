import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { queryUser } from './service';

export default () => {

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
          toolBarRender={() => [
            <Button type="primary">
              <PlusOutlined /> 新建
            </Button>,
          ]}
          columns={columns}
          request={(params, sorter, filter) => queryUser({ ...params, sorter, filter })}
        />
    </PageContainer>
    )
  };
