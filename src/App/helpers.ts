export interface INormalizedPullRequest {
  branchName: string;
  branchUrl: string;
  merged: boolean;
  mentorName?: string;
  mentorUrl?: string;
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
  forks: IForks;
  pullRequests: IPullRequest;
}

export function filteringProjects(
  projectName: string,
): (filteredProjects: IProject[], project: IProject) => IProject[] {
  return function (filteredProjects, project) {
    const urls = filteredProjects.map(({ forks }) => forks.nodes[0].name);
    const uniqUrls = [...new Set(urls)];

    const fork = project.forks.nodes[0];

    if (!fork || (fork.url && uniqUrls.includes(fork.url))) {
      return filteredProjects;
    }

    return fork?.name.includes(projectName) ? filteredProjects.concat(project) : filteredProjects;
  };
}

export function normalizeProject({ forks, pullRequests }: IProject): INormalizedProject {
  const authorName = forks.nodes[0].assignableUsers.nodes[0].name;
  const authorLogin = forks.nodes[0].assignableUsers.nodes[0].login;

  const normalazidPullRequestList = pullRequests.nodes.reduce(
    (pullRequestList: INormalizedPullRequest[], pullRequest) => {
      const mentor = pullRequest.participants.nodes
        .map(({ name, url, login }) => ({ name, url, login }))
        .filter(({ login }) => login !== 'keksobot' && login !== authorLogin);

      const mentorName = mentor[0]?.name;
      const mentorLogin = mentor[0]?.login;

      return pullRequestList.concat({
        branchName: pullRequest.headRefName,
        branchUrl: pullRequest.url,
        merged: pullRequest.merged,
        mentorName: mentorName ? `${mentorName} aka ${mentorLogin}` : mentorLogin,
        mentorUrl: mentor[0]?.url,
      });
    },
    [],
  );

  const pullRequestsFiltered = normalazidPullRequestList
    .filter(({ branchName }) => branchName && branchName !== 'master')
    .map(({ branchName, branchUrl, merged }) => ({
      branchName,
      branchUrl,
      merged,
    }));

  const lastPullRequest = pullRequestsFiltered[pullRequestsFiltered.length - 1] || {
    branchName: 'not found',
    branchUrl: 'https://github.com/404',
    merged: false,
  };

  return {
    id: forks.nodes[0].id,
    repoUrl: forks.nodes[0].url,
    repoName: forks.nodes[0].name,
    authorName: authorName ? `${authorName} aka ${authorLogin}` : authorLogin,
    authorUrl: forks.nodes[0].assignableUsers.nodes[0].url,
    mentorName: normalazidPullRequestList.find(({ mentorName }) => mentorName)?.mentorName || 'not found',
    mentorUrl: normalazidPullRequestList.find(({ mentorName }) => mentorName)?.mentorUrl || 'https://github.com/404',
    lastCommit: forks.nodes[0].pushedAt.slice(0, 10),
    lastPullRequestName: lastPullRequest.merged
      ? `${lastPullRequest.branchName} - merged`
      : `${lastPullRequest.branchName} - open`,
    lastPullRequestUrl: lastPullRequest.branchUrl,
    pullRequests: pullRequestsFiltered,
  };
}
