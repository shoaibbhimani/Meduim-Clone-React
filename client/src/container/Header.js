import React from "react";
import { GoogleLogin } from "react-google-login-component";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import styled from "styled-components";
import * as t from "prop-types";

import * as actions from "../action-creators";
import * as CSSConstant from "../CSSConstant";

const NavBar = styled.nav`
  background: none;
  font-family: ${props => props.theme.raleway};
  & a {
    color: black;
  }
  box-shadow: 0 0 30px rgba(7, 51, 84, 0.17);
`;

const GoogleContainer = styled.li`
  & button {
    padding: 9px;
    background: #3C7AFC;
    border: none;
    border-radius: 3px;
    color: white;
  }
`;

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

class Header extends React.Component {
  onSuccess = googleUser => {
    const { getUserData, history, toggleAuthentication } = this.props;
    getUserData(
      {
        googleId: googleUser.getId(),
        firstName: googleUser.getBasicProfile().getGivenName(),
        lastName: googleUser.getBasicProfile().getFamilyName(),
        email: googleUser.getBasicProfile().getEmail()
      },
      () => {
        toggleAuthentication(false);
        history.push("/myblogs");
      }
    );
  };

  logout = evt => {
    evt && evt.preventDefault();
    this.props.forgetUser();
    this.props.history.push("/allblog");
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <NavBar>
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo center">
            <h5>Medium Clone</h5>
          </NavLink>
          <ul className="left hide-on-med-and-down">
            <li>
              <NavLink activeClassName="active" to="/allblog">
                All Blog
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <GoogleContainer key={0}>
                <GoogleLogin
                  socialId={
                    "83911294138-5vtlktil0du2ihh2lipki6jmtmefbc2l.apps.googleusercontent.com"
                  }
                  scope="profile"
                  fetchBasicProfile={true}
                  responseHandler={this.onSuccess}
                  buttonText="Login With Google"
                />
              </GoogleContainer>
            ) : (
              [
                <li key={1}>
                  <NavLink to="/myblogs">My Blogs</NavLink>
                </li>,
                <li key={3}>
                  <NavLink to="/setting">Setting</NavLink>
                </li>,
                <li key={4}>
                  <NavLink to="/create_post">Add Post</NavLink>
                </li>,
                <li key={5} onClick={this.logout}>
                  <a>Log Out</a>
                </li>
              ]
            )}
          </ul>
        </div>
      </NavBar>
    );
  }
}

Header.propTypes = {
  toggleAuthentication: t.func.isRequired,
  isAuthenticated: t.bool.isRequired,
  history: t.object,
  getUserData: t.func.isRequired
};

export default withRouter(connect(mapStateToProps, actions)(Header));
