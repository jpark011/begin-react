import React, { useMemo, useReducer } from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList, { UserEntity } from './UserList';
import CreateUser from './CreateUser';
import './App.css';
import produce from 'immer';

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
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case 'REMOVE_USER':
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    case 'TOGGLE_USER':
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);

        if (!user) {
          return;
        }

        user.active = !user.active;
      });
    default:
      return state;
  }
}

export const UserDispatch = React.createContext<React.Dispatch<Action> | null>(
  null
);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

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
      <UserDispatch.Provider value={dispatch}>
        <CreateUser></CreateUser>
        <UserList users={users}></UserList>
        <div>활성사용자 수: {count}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;
