import { INormalizedProject } from '../../App/helpers';

export type Order = 'asc' | 'desc';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export function generateRows(projects: INormalizedProject[]): {
  authorName: string;
  authorUrl: string;
  repoName: string;
  repoUrl: string;
  mentorName: string;
  mentorUrl: string;
  lastPullRequestName: string;
  lastPullRequestUrl: string;
  lastCommit: string;
}[] {
  return projects.map(
    ({
      authorName,
      authorUrl,
      repoName,
      repoUrl,
      mentorName,
      mentorUrl,
      lastPullRequestName,
      lastPullRequestUrl,
      lastCommit,
    }) => ({
      authorName,
      authorUrl,
      repoName,
      repoUrl,
      mentorName,
      mentorUrl,
      lastPullRequestName,
      lastPullRequestUrl,
      lastCommit,
    }),
  );
}

export interface IheadCells {
  id: 'authorName' | 'repoName' | 'lastCommit' | 'mentorName' | 'lastPullRequestName';
  align: 'left' | 'center' | 'right';
  padding: 'none' | 'normal';
  label: string;
}

export const headCells: IheadCells[] = [
  { id: 'authorName', align: 'left', padding: 'normal', label: 'Автор' },
  { id: 'repoName', align: 'left', padding: 'normal', label: 'Репозиторий' },
  { id: 'lastCommit', align: 'center', padding: 'normal', label: 'Последний commit' },
  { id: 'mentorName', align: 'left', padding: 'normal', label: 'Наставник' },
  { id: 'lastPullRequestName', align: 'left', padding: 'normal', label: 'Последний PullRquest' },
];
