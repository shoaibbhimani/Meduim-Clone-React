import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

//Components
import Header from "./Header";
import CreatePost from "./CreateEditPost";
import PostList from "./PostList/index";
import PostDetails from "./PostDetails";
import PrivateRoute from "../UIComponent/PrivateRoute";
import UserSetting from "./UserSetting";

import * as actions from "../action-creators";
import * as UtilityMethod from "../UtilityMethod";

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isAuthenticating: state.user.isAuthenticating
});

class App extends Component {
  state = {
    isAuthenticating: true
  };

  componentDidMount() {
    // If user data exist sent request to get updated user data
    const userData = UtilityMethod.getLocalStorage();

    if (userData) {
      UtilityMethod.setGlobalAxiosHeader(userData.jwt);
      this.props.getUserData(
        {
          googleId: userData.user.googleId
        },
        () => {
          this.toggleAuthentication(false);
        }
      );
    } else {
      this.toggleAuthentication(false);
    }
  }

  toggleAuthentication = value => {
    this.setState({
      isAuthenticating: value
    });
  };

  render() {
    const { isAuthenticated, setUserData } = this.props;
    const { isAuthenticating } = this.state;
    return (
      <div>
        <Header
          setUserData={setUserData}
          toggleAuthentication={this.toggleAuthentication}
        />

        {!isAuthenticating && (
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/allblog" />} />
            <Route path="/:posts(allblog|myblogs)" component={PostList} />
            <PrivateRoute
              exact
              path="/create_post"
              {...this.props}
              isAuthenticated={isAuthenticated}
              component={CreatePost}
            />
            <PrivateRoute
              exact
              path="/setting"
              {...this.props}
              isAuthenticated={isAuthenticated}
              component={UserSetting}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
