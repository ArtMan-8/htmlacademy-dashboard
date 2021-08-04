import { gql } from '@apollo/client';

export const RATE_LIMIT = gql`
  fragment RateLimit on Query {
    rateLimit {
      remaining
    }
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfo on SearchResultItemConnection {
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`;

export const REPO_INFO = gql`
  fragment RepoInfo on Repository {
    id
    name
    url
  }
`;
