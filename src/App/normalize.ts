export interface INormalizedProject {
  id: string;
  url: string;
  created: string;
  pushed: string;
  authorName: string;
  authorLogin: string;
}

export function normalizeProject(project: Record<any, any>): INormalizedProject {
  return {
    id: project.forks.nodes[0].id,
    url: project.forks.nodes[0].url,
    created: project.forks.nodes[0].createdAt,
    pushed: project.forks.nodes[0].pushedAt,
    authorName: project.forks.nodes[0].assignableUsers.nodes[0].name,
    authorLogin: project.forks.nodes[0].assignableUsers.nodes[0].login,
  };
}
