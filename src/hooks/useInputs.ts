import { useCallback, useReducer } from 'react';

export type Form = {
  username: string;
  email: string;
};

type Action =
  | { type: 'CHANGE_INPUT'; name: string; value: string }
  | { type: 'RESET' };

const initialState: Form = {
  username: '',
  email: '',
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
}

export function useInputs(initialForm: Form) {
  const [form, dispatch] = useReducer(reducer, initialForm);
  // change
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_INPUT', name, value });
  }, []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return [form, onChange, reset] as const;
}
