import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default () => {

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      tip: '用户名',
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
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
        />
    </PageContainer>
    )
  };
