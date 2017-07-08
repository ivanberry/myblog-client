import React from 'react';

const UsersList = (props) => {
  debugger;
  return (
    <div>
      <h1>All Users</h1>
      {
        props.users.map((user) => {
          return <h4 key={ user.id } className="well"><strong>{ user.username }</strong> - <em>{ user.created_at }</em></h4>
        })
      }
    </div>
  )
}
export default UsersList;
