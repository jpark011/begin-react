import React, { useMemo, useReducer, useState } from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList, { UserEntity } from './UserList';
import CreateUser from './CreateUser';
import ErrorBoundary from './ErrorBoundary';
import Button from './components/Button';
import Dialog from './components/Dialog';
import './App.css';
import produce from 'immer';
import styled from '@emotion/styled';
import { Theme, ThemeProvider } from '@emotion/react';

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

const theme: Theme = {
  palette: {
    blue: '#228be6',
    gray: '#495057',
    pink: '#f06595',
  },
};

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

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

declare module '@emotion/react' {
  interface Theme {
    palette: {
      [color: string]: string;
    };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };
  const onConfirm = () => {
    console.log('확인');
    setVisible(false);
  };
  const onCancel = () => {
    console.log('취소');
    setVisible(false);
  };

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
    <ErrorBoundary>
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
      <ThemeProvider
        theme={{
          palette: {
            blue: '#228be6',
            gray: '#495057',
            pink: '#f06595',
          },
        }}
      >
        <>
          <AppBlock>
            <ButtonGroup>
              <Button size="large">BUTTON</Button>
              <Button>BUTTON</Button>
              <Button size="small">BUTTON</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button color="gray" size="large">
                BUTTON
              </Button>
              <Button color="gray">BUTTON</Button>
              <Button color="gray" size="small">
                BUTTON
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button color="pink" size="large">
                BUTTON
              </Button>
              <Button color="pink">BUTTON</Button>
              <Button color="pink" size="small">
                BUTTON
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button size="large" fullWidth>
                BUTTON
              </Button>
              <Button size="large" color="gray" fullWidth>
                BUTTON
              </Button>
              <Button onClick={onClick} size="large" color="pink" fullWidth>
                BUTTON
              </Button>
            </ButtonGroup>
          </AppBlock>
          <Dialog
            title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            visible={visible}
            onConfirm={onConfirm}
            onCancel={onCancel}
          >
            데이터를 정말로 삭제하시겠습니까?
          </Dialog>
        </>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
