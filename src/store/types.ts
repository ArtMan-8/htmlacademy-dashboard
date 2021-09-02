import { IProject, INormalizedProject } from '../components/DataLoader/helpers';

export enum EActionType {
  SET_SELECTED_PROJECTS = 'SET_SELECTED_PROJECTS',
  SET_REQUEST_LIMIT = 'SET_REQUEST_LIMIT',
  ADD_REPOSITORIES = 'ADD_REPOSITORIES',
  UPDATE_FETCH_STATUS = 'UPDATE_FETCH_STATUS',
  CLEAR_REPOSITORIES = 'CLEAR_REPOSITORIES',
}

export enum EFetchStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export interface IState {
  selectedProjects: string[];
  requestLimit: number;
  fetchStatus: EFetchStatus;
  projects: INormalizedProject[];
}

export interface IActions {
  [EActionType.SET_SELECTED_PROJECTS]: {
    selectedProjects: string[];
  };
  [EActionType.SET_REQUEST_LIMIT]: {
    requestLimit: number;
  };
  [EActionType.ADD_REPOSITORIES]: {
    projects: IProject[];
  };
  [EActionType.UPDATE_FETCH_STATUS]: {
    fetchStatus: EFetchStatus;
  };
  [EActionType.CLEAR_REPOSITORIES]: undefined;
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type TActions = ActionMap<IActions>[keyof ActionMap<IActions>];

function createAction<Obj extends { [index: string]: any }>() {
  return function <Key extends keyof Obj>(name: Key, ...args: Obj[Key] extends undefined ? [] : [Obj[Key]]) {
    return args.length > 0 ? { type: name, payload: args[0] } : { type: name };
  };
}

export const actionCreate = createAction<IActions>();
