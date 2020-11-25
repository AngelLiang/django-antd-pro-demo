import { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';
import BaseView from './components/base';

class UserProfile extends Component {

  render() {
    console.log(this.props)

    return (
      <GridContent>
        <div className={styles.leftMenu}>
        </div>
        <div className={styles.right}>
          <BaseView></BaseView>
        </div>
      </GridContent>
    );
  }
}


export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(UserProfile);


