import React, { Component } from 'react';

import { firestore, auth, createUserProfileDocument } from '../firebase';

import Posts from './Posts';
import Authentication from './Authentication';
import { collectIdsAndDocs } from '../utilities';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';

class Application extends Component {
  state = {
    posts: [
      // {
      //   id: '1',
      //   title: 'A Very Hot Take',
      //   content:
      //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
      //   user: {
      //     uid: '123',
      //     displayName: 'Bill Murray',
      //     email: 'billmurray@mailinator.com',
      //     photoURL: 'https://www.fillmurray.com/300/300',
      //   },
      //   stars: 1,
      //   comments: 47,
      // },
    ],
    user: null,
    userLoaded: false,
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ posts }, () => console.log(posts));
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      console.log(user);
      this.setState({ user });

      // if (user) {
      // this.setState({ user, userLoaded: true });
      //   localStorage.setItem('user', JSON.stringify(this.state.userLoaded));
      // } else {
      //   this.setState({ ...this.state, user: null, userLoaded: false });
      //   localStorage.setItem('user', JSON.stringify(this.state.userLoaded));
      // }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { posts, user, userLoaded } = this.state;

    // const haveUser = JSON.parse(localStorage.getItem('user'));
    // const userInformation = user ? <CurrentUser {...user} /> : <SignIn />;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        {/* {userLoaded && userInformation} */}
        <Authentication user={user} userLoaded={userLoaded} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
