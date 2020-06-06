import React, { Component } from 'react';

import { firestore, auth } from '../firebase';

import Posts from './Posts';
import Authentication from './Authentication';
import { collectIdsAndDocs } from '../utilities';

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

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log(user);
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={this.state.user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
