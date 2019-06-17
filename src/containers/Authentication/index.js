import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button } from 'semantic-ui-react'
import cookies from 'js-cookie';

import {
  startLoginUser,
  startLogoutUser, 
  updateUserLoggedIn,
  getUserInfo
} from './actions'
import { makeSelectUserInfo, makeSelectAuthenticationFetching } from './selectors'

const styles = {
  userName: {
    marginRight: '10px'
  }
}

class AuthenticationContainer extends React.PureComponent {
  componentDidMount() {
    const { updateUserLoggedIn, getUserInfo } = this.props

    const isUserLoggedIn = (/true/i).test(cookies.get('userLoggedIn') || false)
    updateUserLoggedIn(isUserLoggedIn)

    if (isUserLoggedIn === true) getUserInfo()
  }

  handleUserSignIn = (e) => {
    e.preventDefault()

    const { startLoginUser } = this.props
    startLoginUser()
  }

  handleUserSignOut = (e) => {
    e.preventDefault()
    
    const { startLogoutUser } = this.props
    startLogoutUser()
  }
  
  render() {
    const { userInfo, isAuthenticationFetching } = this.props

    return (
      <React.Fragment>
        {userInfo.isLoggedIn === true && userInfo.userName &&
          <span style={styles.userName}>{userInfo.userName}</span>
        }

        <Button
          onClick={userInfo.isLoggedIn === true ? this.handleUserSignOut : this.handleUserSignIn}
          loading={isAuthenticationFetching}
          size='mini'
          primary
        >
          {userInfo.isLoggedIn ? 'Déconnexion' : 'Connexion'}
        </Button>
      </React.Fragment>
    );
  };
};

const mapStateToProps = () => createStructuredSelector({
  userInfo: makeSelectUserInfo(),
  isAuthenticationFetching: makeSelectAuthenticationFetching(),
})

const mapDispatchToProps = dispatch => ({
  startLoginUser: () => dispatch(startLoginUser()),
  startLogoutUser: () => dispatch(startLogoutUser()),
  updateUserLoggedIn: value => dispatch(updateUserLoggedIn(value)),
  getUserInfo: () => dispatch(getUserInfo()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationContainer)
