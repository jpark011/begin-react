import React, { useRef, useState } from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList, { UserEntity } from './UserList';
import CreateUser from './CreateUser';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState<UserEntity[]>([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);
  const nextId = useRef(4);
  const onCreate = () => {
    const user: UserEntity = {
      id: nextId.current,
      username,
      email,
      active: false,
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };
  const onRemove = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const onToggle = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem', // 다른 단위 사용 시 문자열로 설정
  };

  return (
    <>
      <Wrapper>
        <Hello />
        <Hello isSpecial name={name} />
      </Wrapper>
      <div>
        <div className="gray-box" style={style}>
          {name}
        </div>
        <div className="gray-box"></div>
      </div>
      <Counter></Counter>
      <InputSample></InputSample>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      ></CreateUser>
      <UserList
        users={users}
        onRemove={onRemove}
        onToggle={onToggle}
      ></UserList>
    </>
  );
}

export default App;
