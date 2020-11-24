import React from 'react';
import { Modal } from 'antd';


const SetPasswordForm = props => {
  const {updateModalVisible, onCancel, handleUpdate, username} = props;
  return (
    <Modal
      destroyOnClose
      title={`设置用户 ${username} 的密码`}
      visible={updateModalVisible}
      onOk={handleUpdate}
      onCancel={() => onCancel()}
    >
      {props.children}
    </Modal>
  );
};

export default SetPasswordForm;
