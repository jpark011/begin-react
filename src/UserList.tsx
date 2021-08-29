import React, { useEffect } from 'react';

export type UserEntity = {
  id: number;
  username: string;
  email: string;
  active: boolean;
};

type UserProps = {
  user: UserEntity;
  onRemove(id: number): void;
  onToggle(id: number): void;
};

const User = React.memo(function ({ user, onRemove, onToggle }: UserProps) {
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
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>{' '}
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

type UserListProps = {
  users: UserEntity[];
  onRemove(id: number): void;
  onToggle(id: number): void;
};

function UserList({ users, onRemove, onToggle }: UserListProps) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
