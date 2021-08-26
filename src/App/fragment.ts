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

export const REPO_STUDENT_INFO = gql`
  fragment RepoStudentInfo on Repository {
    forks(first: 1) {
      nodes {
        ... on Repository {
          id
          url
          name
          pushedAt
          assignableUsers(first: 1) {
            nodes {
              ... on User {
                name
                login
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const REPO_ACADEMY_INFO = gql`
  fragment RepoAcademyInfo on Repository {
    pullRequests(last: 25) {
      nodes {
        headRefName
        url
        merged
        participants(first: 5) {
          nodes {
            ... on User {
              name
              login
              url
            }
          }
        }
      }
    }
  }
`;
