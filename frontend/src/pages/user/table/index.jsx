import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
    return (
      <PageContainer>
        <ProTable 
          toolBarRender={() => [
            <Button type="primary">
              <PlusOutlined /> 新建
            </Button>,
          ]}
        />
    </PageContainer>
    )
  };
