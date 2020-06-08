import React, { Component } from 'react';

import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

class PostPage extends Component {
  state = { post: null, comments: [] };

  render() {
    return <div>Post page</div>;
  }
}

export default PostPage;
