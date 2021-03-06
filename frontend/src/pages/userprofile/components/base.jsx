import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { Button, Input, Select, Upload, Form, Descriptions } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="userprofile.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage
            id="userprofile.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload>
  </>
);


const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

class BaseView extends Component {
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = (ref) => {
    this.view = ref;
  };
  handleFinish = (values) => {
    console.log(values)
    const { dispatch } = this.props
    dispatch({
      type: 'user/updateCurrentUser',
      payload: values,
    })
    message.success(
      formatMessage({
        id: 'userprofile.basic.update.success',
      }),
    );
  };

  render() {
    const { currentUser } = this.props;
    console.log(currentUser)
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >

            <Form.Item
                name="username"
                disabled
                label={formatMessage({
                  id: 'userprofile.basic.username',
                })}
              >
                <Input disabled/>
              </Form.Item>

            <Form.Item
              name="first_name"
              label={formatMessage({
                id: 'userprofile.basic.firstname',
              })}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="last_name"
              label={formatMessage({
                id: 'userprofile.basic.lastname',
              })}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label={formatMessage({
                id: 'userprofile.basic.email',
              })}
              // rules={[
              //   {
              //     required: true,
              //     message: formatMessage(
              //       {
              //         id: 'userprofile.basic.email-message',
              //       },
              //       {},
              //     ),
              //   },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="profile"
              label={formatMessage({
                id: 'userprofile.basic.profile',
              })}
            >
              <Input.TextArea
                placeholder={formatMessage({
                  id: 'userprofile.basic.profile-placeholder',
                })}
                rows={4}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="userprofile.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(BaseView);
