import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import { notification } from 'antd';
import { Button, Input, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { queryUser, addUser } from './service';
import CreateForm from './components/CreateForm';

export default () => {
  const [paramState, setParamState] = useState({});
  const actionRef = useRef();
  const addFormRef = useRef();

  const [addForm] = Form.useForm();
  const addFormItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 15,
    }
  };
  const addFormTailItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

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

  const createColumns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
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
        <Form
          form={addForm}
          onFinish={values => {
            console.log('Received values of form: ', values);
            addUser(values).then(response=>{
              // console.log(response);
              if (response.status==='ok') {
                handleModalVisible(false);
                actionRef.current.reload();
              } else if(response.status==='err') {
                notification.error({
                  message: '温馨提示',
                  description: response.none_fields_errors,
                });
              }
            })
          }}
          >
            <Form.Item
              {...addFormItemLayout}
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
            <Input />
          </Form.Item>

          <Form.Item
              {...addFormItemLayout}
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              {...addFormItemLayout}
              name="confirm_password"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认密码',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...addFormTailItemLayout}>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
              <Button type="button" style={{ margin: '0 8px' }} onClick={() => handleModalVisible(false)}>
                取消
              </Button>
            </Form.Item>

        </Form>
      </CreateForm>

    </PageContainer>
    )
  };
