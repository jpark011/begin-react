import React, {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList, { UserEntity } from './UserList';
import CreateUser from './CreateUser';
import './App.css';
import { useInputs } from './hooks/useInputs';

function countActiveUsers(users: UserEntity[]) {
  console.log('사용자를 세는중...');
  return users.filter((user) => user.active).length;
}

type State = {
  users: UserEntity[];
};

const initialState: State = {
  users: [
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
  ],
};

type Action =
  | { type: 'CHANGE_INPUT'; name: string; value: string }
  | { type: 'CREATE_USER'; user: UserEntity }
  | { type: 'REMOVE_USER'; id: number }
  | { type: 'TOGGLE_USER'; id: number };

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: [...state.users, action.user],
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    const user: UserEntity = {
      id: nextId.current,
      username,
      email,
      active: false,
    };

    reset();
    dispatch({ type: 'CREATE_USER', user });
    nextId.current += 1;
  }, [username, email, reset]);
  const onRemove = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_USER', id });
  }, []);
  const onToggle = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_USER', id });
  }, []);

  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem', // 다른 단위 사용 시 문자열로 설정
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

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
      <div>활성사용자 수: {count}</div>
    </>
  );
}

export default App;
