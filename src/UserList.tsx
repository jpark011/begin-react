import React from 'react';

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

function User({ user, onRemove, onToggle }: UserProps) {
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
}

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

export default UserList;
