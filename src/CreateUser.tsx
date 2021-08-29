import React, { useCallback, useContext, useRef } from 'react';
import { UserDispatch } from './App';
import { useInputs } from './hooks/useInputs';
import { UserEntity } from './UserList';

function CreateUser() {
  const dispatch = useContext(UserDispatch);
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: '',
  });

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user: UserEntity = {
      id: nextId.current,
      username,
      email,
      active: false,
    };

    reset();
    dispatch?.({ type: 'CREATE_USER', user });
    nextId.current += 1;
  }, [username, email, reset, dispatch]);

  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);
