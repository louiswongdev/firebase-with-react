import React, { Component } from 'react';

import { firestore, auth } from '../firebase';
import { UserContext } from '../providers/UserProvider';

class AddPost extends Component {
  state = { title: '', content: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, user) => {
    event.preventDefault();

    console.log('context user:', user);
    const { title, content } = this.state;
    // const { uid, displayName, email, photoURL } = auth.currentUser || {};
    const { uid, displayName, email, photoURL } = user;

    // console.log('displayName: ', user);

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      stars: 0,
      comments: 0,
      createdAt: new Date(),
    };

    firestore.collection('posts').add(post);

    this.setState({ title: '', content: '' });
  };

  render() {
    const { title, content } = this.state;
    return (
      <UserContext.Consumer>
        {user => (
          <form
            // onSubmit={this.handleSubmit.bind(this, user)}
            onSubmit={e => this.handleSubmit(e, user)}
            className="AddPost"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="content"
              placeholder="Body"
              value={content}
              onChange={this.handleChange}
            />
            <input className="create" type="submit" value="Create Post" />
          </form>
        )}
      </UserContext.Consumer>
    );
  }
}

export default AddPost;
