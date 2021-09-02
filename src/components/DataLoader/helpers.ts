import { NotFound } from '../../constants';

export interface INormalizedPullRequest {
  branchName: string;
  branchUrl: string;
  merged: boolean;
  mentorName: string;
  mentorUrl: string;
}

export interface INormalizedProject {
  id: string;
  repoUrl: string;
  repoName: string;
  authorName: string;
  authorUrl: string;
  mentorName: string;
  mentorUrl: string;
  lastCommit: string;
  lastPullRequestName: string;
  lastPullRequestUrl: string;
  pullRequests: INormalizedPullRequest[];
}

export interface IUser {
  login: string;
  name: string;
  url: string;
}

export interface IForks {
  nodes: {
    id: string;
    name: string;
    url: string;
    pushedAt: string;
    assignableUsers: {
      nodes: IUser[];
    };
  }[];
}

export interface IPullRequest {
  nodes: {
    headRefName: string;
    url: string;
    merged: boolean;
    participants: {
      nodes: IUser[];
    };
  }[];
}

export interface IProject {
  url: string;
  forks: IForks;
  pullRequests: IPullRequest;
}

export function normalizeProject({ forks, pullRequests }: IProject): INormalizedProject {
  const fork = forks.nodes[0];
  const authorName = fork.assignableUsers.nodes[0].name;
  const authorLogin = fork.assignableUsers.nodes[0].login;

  const filteredPullRequests = pullRequests.nodes.filter(({ headRefName }) => headRefName.includes('module'));

  const normalizedPullRequests = filteredPullRequests.reduce(
    (pullRequestList: INormalizedPullRequest[], pullRequest) => {
      const mentor = pullRequest.participants.nodes
        .filter(({ login }) => login !== 'keksobot' && login !== authorLogin)
        .map(({ name, url, login }) => ({ name, url, login }));

      const mentorName = mentor[0]?.name || '';
      const mentorLogin = mentor[0]?.login || NotFound.TITLE;
      const mentorLink = mentor[0]?.url || NotFound.URL;

      return pullRequestList.concat({
        branchName: pullRequest.headRefName,
        branchUrl: pullRequest.url,
        merged: pullRequest.merged,
        mentorName: mentorName ? `${mentorName} aka ${mentorLogin}` : mentorLogin,
        mentorUrl: mentorLink,
      });
    },
    [],
  );

  const lastPullRequest = normalizedPullRequests[normalizedPullRequests.length - 1] || {
    branchName: NotFound.TITLE,
    branchUrl: NotFound.URL,
    merged: false,
  };

  const pullRequestInfo = normalizedPullRequests.filter(({ mentorName }) => mentorName !== NotFound.TITLE)[0];

  return {
    id: fork.id,
    repoUrl: fork.url,
    repoName: fork.name,

    authorName: authorName ? `${authorName} aka ${authorLogin}` : authorLogin,
    authorUrl: fork.assignableUsers.nodes[0].url,
    mentorName: pullRequestInfo?.mentorName || NotFound.TITLE,
    mentorUrl: pullRequestInfo?.mentorUrl || NotFound.URL,

    lastCommit: fork.pushedAt.slice(0, 10),
    lastPullRequestName: lastPullRequest.merged
      ? `${lastPullRequest.branchName} - merged`
      : `${lastPullRequest.branchName} - open`,
    lastPullRequestUrl: lastPullRequest.branchUrl,
    pullRequests: normalizedPullRequests,
  };
}
