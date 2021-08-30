import React, { createContext, useReducer } from 'react';
import { filteringProjects, normalizeProject } from '../App/helpers';
import { EActionType, EFetchStatus, IState, TActions } from './types';

const initialState: IState = {
  projectName: '',
  requestLimit: 0,
  fetchStatus: EFetchStatus.IDLE,
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

        const createdProjects = action.payload.projects.reduce(filteringProjects(projectName), []);
        const normalizedProject = createdProjects.map(normalizeProject);

        const existsRepositoryUrl = projects.map(({ repoUrl }) => repoUrl);
        const newRepository = normalizedProject.filter(({ repoUrl }) => !existsRepositoryUrl.includes(repoUrl));

        return {
          ...state,
          projects: [...projects, ...newRepository],
        };
      }

      case EActionType.UPDATE_FETCH_STATUS: {
        return {
          ...state,
          ...action.payload,
        };
      }

      case EActionType.CLEAR_REPOSITORIES: {
        return {
          ...state,
          projects: [],
        };
      }

      default:
        throw new Error(`Unknown action type`);
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}
