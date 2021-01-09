import React from 'react';

function Users(props) {
  return (
    <ul>
      {props.users.map(
        user => (
          <li>
            {user.firstName}{user.userName}

          </li>
        )
      )}
    </ul>
  );
}

export default Users;