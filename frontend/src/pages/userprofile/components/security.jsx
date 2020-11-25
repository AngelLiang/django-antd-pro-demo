import { FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import { List } from 'antd';


const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="userprofile.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="userprofile.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="userprofile.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'userprofile.security.password',
        },
        {},
      ),
      description: (
        <>
          {formatMessage({
            id: 'userprofile.security.password-description',
          })}
          ：{passwordStrength.strong}
        </>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage id="userprofile.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  
    {
      title: formatMessage(
        {
          id: 'userprofile.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'userprofile.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="userprofile.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  ];

  render() {
    const data = this.getData();
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default SecurityView;
