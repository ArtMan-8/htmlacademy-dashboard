import { gql } from '@apollo/client';
import { PAGE_INFO, RATE_LIMIT, REPO_INFO } from './fragment';

export const GET_REPOS = gql`
  ${RATE_LIMIT}
  ${PAGE_INFO}
  ${REPO_INFO}
  query GetRepos($projectName: String!, $after: String, $first: Int!) {
    ...RateLimit
    search(query: $projectName, type: REPOSITORY, after: $after, first: $first) {
      ...PageInfo
      nodes {
        ... on Repository {
          ...RepoInfo
        }
      }
    }
  }
`;
