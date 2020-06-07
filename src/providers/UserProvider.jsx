import React, { Component, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // listen for changes in our authed userRef
        userRef.onSnapshot(onSnapshot => {
          this.setState({
            user: { uid: onSnapshot.id, ...onSnapshot.data() },
          });
        });
      }

      // inital userAuth object on page reload is the full firebase auth object
      // returned from onAuthStateChanged. Once userAuth is passed into
      // createUserProfileDocument, userRef.onSnapshot triggers another
      // setState, this time with our true user object with uid, email,
      // displayName, createdAt and photoURL
      this.setState({ user: userAuth });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
