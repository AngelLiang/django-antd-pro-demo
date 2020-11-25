import { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect, FormattedMessage } from 'umi';
import { Menu } from 'antd';
import styles from './style.less';
import BaseView from './components/base';

const { Item } = Menu;

class UserProfile extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      base: (
        <FormattedMessage id="accountandsettings.menuMap.basic" defaultMessage="个人信息" />
      ),
      // security: (
      //   <FormattedMessage
      //     id="accountandsettings.menuMap.security"
      //     defaultMessage="Security Settings"
      //   />
      // ),
      // binding: (
      //   <FormattedMessage
      //     id="accountandsettings.menuMap.binding"
      //     defaultMessage="Account Binding"
      //   />
      // ),
      // notification: (
      //   <FormattedMessage
      //     id="accountandsettings.menuMap.notification"
      //     defaultMessage="New Message Notification"
      //   />
      // ),
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrentUser',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }


  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode,
      });
    });
  };
  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };
  selectKey = (key) => {
    this.setState({
      selectKey: key,
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case 'base':
        return <BaseView />;

      // case 'security':
      //   return <SecurityView />;

      // case 'binding':
      //   return <BindingView />;

      // case 'notification':
      //   return <NotificationView />;

      default:
        break;
    }

    return null;
  };

  render() {
    console.log(this.props)

    const { mode, selectKey } = this.state;

    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <BaseView></BaseView>
          </div>
        </div>
      </GridContent>
    );
  }
}


export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(UserProfile);


