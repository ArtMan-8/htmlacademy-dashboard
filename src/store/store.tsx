import React, { createContext, useReducer } from 'react';
import { normalizeProject } from '../App/normalize';
import { EActionType, IState, TActions } from './types';

const initialState: IState = {
  projectName: '',
  requestLimit: 0,
  projects: [],
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
        const { projectName, projects } = state;
        const createdProjects = action.payload.projects.filter(({ forks }) =>
          forks.nodes[0]?.name.includes(projectName),
        );
        const normalizedProject = createdProjects.map(normalizeProject);

        return {
          ...state,
          projects: [...projects, ...normalizedProject],
        };
      }

      case EActionType.CLEAR_REPOSITORIES: {
        return {
          ...state,
          projects: [],
        };
      }

      default:
        throw new Error(`Unknown action action type`);
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}
