import { normalizeProject } from '../components/DataLoader/helpers';
import { EActionType, IState, TActions } from './types';

export default function reducer(state: IState, action: TActions): IState {
  switch (action.type) {
    case EActionType.SET_SELECTED_PROJECTS:
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
      const { projects } = state;

      const filteredProjects = action.payload.projects.filter(
        ({ url, pullRequests, forks }) => url.includes('htmlacademy') && pullRequests.nodes[0] && forks.nodes[0],
      );

      const normalizedProject = filteredProjects.map(normalizeProject);
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
}
