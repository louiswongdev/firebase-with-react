import React, { Component } from 'react';

import { firestore } from '../firebase';

import Posts from './Posts';
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
  };

  unsubscribe = null;

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts }, () => console.log(posts));
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  handleCreate = async post => {
    const { posts } = this.state;

    const docRef = await firestore.collection('posts').add(post);
    const doc = await docRef.get();

    const newPost = collectIdsAndDocs(doc);

    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async id => {
    console.log('removed id: ', id);
    const allPosts = this.state.posts;

    await firestore.doc(`posts/${id}`).delete();

    const posts = allPosts.filter(post => post.id !== id);

    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
