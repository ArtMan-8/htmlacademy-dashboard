import React, { createContext, useReducer } from 'react';
import { EActionType, IState, TActions } from './types';

const initialState: IState = {
  projectName: '',
  requestLimit: 0,
  repositories: [],
};

export const store = createContext<{ state: IState; dispatch: React.Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = store;

export default function StateProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer<React.Reducer<IState, TActions>>((state, action) => {
    switch (action.type) {
      case EActionType.SET_PROJECT_NAME:
        return {
          ...state,
          ...action.payload,
        };

      case EActionType.SET_REQUEST_LIMIT: {
        return {
          ...state,
          ...action.payload,
        };
      }

      case EActionType.ADD_REPOSITORIES: {
        const { projectName } = state;
        const repositories = action.payload.repositories.filter(({ name }) => name.includes(projectName));
        return {
          ...state,
          repositories: [...state.repositories, ...repositories],
        };
      }

      case EActionType.CLEAR_REPOSITORIES: {
        return {
          ...state,
          repositories: [],
        };
      }

      default:
        throw new Error(`Unknown action action type`);
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}
