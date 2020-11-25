import { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';
import BaseView from './components/base';

class UserProfile extends Component {

  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'userProfile/fetchCurrentUser',
  //   });
  //   // window.addEventListener('resize', this.resize);
  //   // this.resize();
  // }

  render() {
    console.log(this.props)
    // console.log(this.state)

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


