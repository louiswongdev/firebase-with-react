import React from 'react';

import { firebase, signOut } from '../firebase';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CurrentUser = ({ displayName, photoURL, email, createdAt, children }) => {
  return (
    <div>
      {createdAt && (
        <section className="CurrentUser">
          <div className="CurrentUser--profile">
            {photoURL && <img src={photoURL} alt={displayName} />}
            <div className="CurrentUser--information">
              <Link to="/profile">
                <h2>{displayName}</h2>
              </Link>
              <p className="email">{email}</p>
              <p className="created-at">
                {createdAt &&
                  new Date(createdAt.seconds * 1000).toLocaleDateString(
                    'en-US',
                  )}
                {/* {moment(createdAt).calendar()} */}
              </p>
            </div>
          </div>
          <div>
            <div>{children}</div>
            <button onClick={signOut}>Sign Out</button>
          </div>
        </section>
      )}
    </div>
  );
};

// CurrentUser.defaultProps = {
//   displayName: 'Bill Murray',
//   email: 'billmurray@mailinator.com',
//   photoURL: 'https://www.fillmurray.com/300/300',
//   createdAt: new Date(),
// };

export default CurrentUser;
