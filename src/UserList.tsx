import React, { useContext, useEffect } from 'react';
import { UserDispatch } from './App';

export type UserEntity = {
  id: number;
  username: string;
  email: string;
  active: boolean;
};

type UserProps = {
  user: UserEntity;
};

const User = React.memo(function ({ user }: UserProps) {
  const dispatch = useContext(UserDispatch);

  useEffect(() => {
    console.log('USER COMPONENT');

    return () => {
      console.log('USER COMPONENT DESTROYED');
    };
  }, []);
  useEffect(() => {
    console.log('USER CHANGED', user);

    return () => {
      console.log('USER ABOUT TO CHANGE', user);
    };
  }, [user]);

  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => dispatch?.({ type: 'TOGGLE_USER', id: user.id })}
      >
        {user.username}
      </b>{' '}
      <span>({user.email})</span>
      <button onClick={() => dispatch?.({ type: 'REMOVE_USER', id: user.id })}>
        삭제
      </button>
    </div>
  );
});

type UserListProps = {
  users: UserEntity[];
};

function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
