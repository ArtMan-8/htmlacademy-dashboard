import React, { createContext, useReducer } from 'react';

interface IState {
  projectName: string;
  requestLimit: number;
  repositories: {
    id: string;
    name: string;
    url: string;
  }[];
}

interface IAction {
  type: string;
  payload: Record<any, any>;
}

const initialState: IState = {
  projectName: '',
  requestLimit: 0,
  repositories: [],
};

interface IContext {
  state: IState;
  dispatch: React.Dispatch<any>;
}

export const store = createContext<IContext>({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = store;

interface IStateProvider {
  children: React.ReactNode;
}

export default function StateProvider({ children }: IStateProvider): JSX.Element {
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>((state, { type, payload }) => {
    switch (type) {
      case 'SET_PROJECT_NAME':
        return {
          ...state,
          ...payload,
        };

      case 'SET_REQUEST_LIMIT': {
        return {
          ...state,
          ...payload,
        };
      }

      case 'ADD_REPOSITORIES': {
        return {
          ...state,
          repositories: [...state.repositories, ...payload.repositories],
        };
      }

      case 'CLEAR_REPOSITORIES': {
        return {
          ...state,
          repositories: [],
        };
      }

      default:
        throw new Error(`Unknown action ${type}`);
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}
