import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import { EFetchStatus, IState, TActions } from './types';

const initialState: IState = {
  selectedProjects: [],
  requestLimit: 0,
  fetchStatus: EFetchStatus.IDLE,
  projects: [],
};

interface IStore {
  state: IState;
  dispatch: React.Dispatch<any>;
}

export const store = createContext<IStore>({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = store;

export default function StoreProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer<React.Reducer<IState, TActions>>(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}
