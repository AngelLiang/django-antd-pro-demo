import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useRef, useState, useEffect } from 'react';
import { notification, message } from 'antd';
import { Button, Input, Form, Descriptions, Switch, Transfer, Divider } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { queryUser, addUser, updateUser, setUserPassword } from './service';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import moment from 'moment';
import { dealManyToManyField, renderManyToMany } from '@/utils/formField'; 
import { queryPermission } from '@/pages/permission/service';
import { queryGroup } from '@/pages/group/service';
import SetPasswordForm from './components/SetPasswordForm';
import KeyOutlined from '@ant-design/icons/lib/icons/KeyOutlined';

export default () => {
  const [paramState, setParamState] = useState({});
  const actionRef = useRef();
  const addFormRef = useRef();
  const updateFormRef = useRef();

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
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);

  const [updateFormValues, setUpdateFormValues] = useState({});

  const [groupsManyToManyList, setGroupsManyToManyList] = useState([]);
  useEffect(() => {
    queryGroup({'all':1}).then(response => {
      setGroupsManyToManyList(response);
    });
  }, []);
  const [groupsTargetList, setGroupsTargetList] = useState([]);

  const [user_permissionsManyToManyList, setUser_permissionsManyToManyList] = useState([]);
  useEffect(() => {
    queryPermission({'all':1}).then(response => {
      setUser_permissionsManyToManyList(response);
    });
  }, []);
  const [userPermissionsTargetList, setUserPermissionsTargetList] = useState([]);

  const [setPassWordModalVisible, handleSetPassWordModalVisible] = useState(false);
  const [setPasswordForm] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return <Descriptions.Item label={rest.label}>{form.getFieldValue('username')}</Descriptions.Item>
        }
        return defaultRender(_);
      }
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
      initialValue: true,
      search: false,
      renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
        const value = form.getFieldValue('is_active');
        if (type === "form" && !value) {
          form.setFieldsValue({'is_active': false});
        }
        return <Switch checked={value} onClick={(checked) => {
          form.setFieldsValue({'is_active': checked});
        }} />;
      },
    },
    {
      title: '人员状态',
      dataIndex: 'is_staff',
      initialValue: false,
      hideInTable: true,
      search: false,
      renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
        const value = form.getFieldValue('is_staff');
        if (type === "form" && !value) {
          form.setFieldsValue({'is_staff': false});
        }
        return <Switch checked={value} onClick={(checked) => {
          form.setFieldsValue({'is_staff': checked});
        }} />;
      },
    },
    {
      title: '超级管理员',
      dataIndex: 'is_superuser',
      initialValue: false,
      hideInTable: true,
      search: false,
      renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
        const value = form.getFieldValue('is_superuser');
        if (type === "form" && !value) {
          form.setFieldsValue({'is_superuser': false});
        }
        return <Switch checked={value} onClick={(checked) => {
          form.setFieldsValue({'is_superuser': checked});
        }} />;
      },
    },
    {
      title: '加入时间',
      dataIndex: 'date_joined',
      valueType: 'dateTime',
      search: false,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return <Descriptions.Item label={rest.label}>{moment(form.getFieldValue('date_joined')).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        }
        return defaultRender(_);
      },
    },
    {
      title: '登录时间',
      dataIndex: 'last_login',
      valueType: 'dateTime',
      hideInTable: true,
      search: false,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return <Descriptions.Item label={rest.label}>{moment(form.getFieldValue('last_login')).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        }
        return defaultRender(_);
      },
    },
    {
      title: '组',
      dataIndex: 'groups',
      hideInTable: true,
      search: false,
      renderFormItem: (item, {type, defaultRender}, form) => {
        setGroupsTargetList(form.getFieldValue('groups') || [])
        if (type === 'form') {
          // 穿梭框 https://ant.design/components/transfer-cn/
          return (<Transfer
                  showSearch
                  dataSource={groupsManyToManyList}
                  targetKeys={groupsTargetList}
                  onChange={(targetKeys, direction, moveKeys) => {
                      console.log(targetKeys, direction, moveKeys);
                      setGroupsTargetList(targetKeys)
                      form.setFieldsValue({'groups': targetKeys})
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
      }
    },
    {
      title: '用户权限',
      dataIndex: 'user_permissions',
      hideInTable: true,
      search: false,
      renderFormItem: (item, {type, defaultRender}, form) => {
        setUserPermissionsTargetList(form.getFieldValue('user_permissions') || [])
        if (type === 'form') {
          // 穿梭框 https://ant.design/components/transfer-cn/
          return (<Transfer
                  showSearch
                  dataSource={user_permissionsManyToManyList}
                  targetKeys={userPermissionsTargetList}
                  onChange={(targetKeys, direction, moveKeys) => {
                      console.log(targetKeys, direction, moveKeys);
                      setUserPermissionsTargetList(targetKeys)
                      form.setFieldsValue({'user_permissions': targetKeys})
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
        <div>
          <EditOutlined title="编辑" className="icon" onClick={async () => {
            setUpdateFormValues(record);
            handleUpdateModalVisible(true);
          }} />
          <Divider type="vertical" />
          <KeyOutlined onClick={() => {
            setUpdateFormValues(record);
            handleSetPassWordModalVisible(true);
          }} />
        </div>
      ),
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
          formRef={addFormRef}
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

      <UpdateForm onCancel={() => handleUpdateModalVisible(false)} modalVisible={updateModalVisible}>
        <ProTable
          formRef={updateFormRef}
          type="form"
          form={{
            initialValues: updateFormValues, 
            // labelCol: {span: 5},
            // wrapperCol: {span: 15},
            labelAlign: 'left',
          }}
          rowKey="id"
          columns={columns}
          rowSelection={{}}
          onSubmit={async values => {
            updateUser(updateFormValues.id, values).then(response=>{
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

      <SetPasswordForm
        updateModalVisible={setPassWordModalVisible}
        onCancel={() => {
          handleSetPassWordModalVisible(false);
        }}
        handleUpdate={() => {
          if (setPasswordForm.getFieldValue('new_password') !== setPasswordForm.getFieldValue('confirm_new_password')) {
            setPasswordForm.setFields([{
              name: 'confirm_new_password',
              errors: ['两次密码不一致'],
            }]);
          } else {
            setPasswordForm.validateFields().then(
              values => {
                setUserPassword(updateFormValues.id, values).then(
                  message.success('密码修改成功'),
                  handleSetPassWordModalVisible(false),
                );
              },
            );
            setPasswordForm.submit;
          }
        }}
        // username={updateFormValues["username"]}
      >
        <Form form={setPasswordForm}>
          <Form.Item
            labelCol={{span: 5,}}
            wrapperCol={{span: 15,}}
            label="新密码"
            name="new_password"
            rules={[
              {
                required: true,
                message: '请输入新密码！',
              },
            ]}
          >
            <Input.Password placeholder="请输入新密码" type="password" />
          </Form.Item>
          <Form.Item
            labelCol={{span: 5,}}
            wrapperCol={{span: 15,}}
            label="重复密码"
            name="confirm_new_password"
            rules={[
              {
                required: true,
                message: '请输入重复密码',
              },
            ]}
          >
            <Input.Password placeholder="请再次输入密码" type="password" />
          </Form.Item>

        </Form>
      </SetPasswordForm>

    </PageContainer>
    )
  };
