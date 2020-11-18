import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useRef, useState, useEffect } from 'react';
import { Button, Input, Form, Descriptions, Switch  } from 'antd';
import { queryPermission } from './service';

export default () => {
  const [paramState, setParamState] = useState({});
  const actionRef = useRef();

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
    </PageContainer>
    )
};
