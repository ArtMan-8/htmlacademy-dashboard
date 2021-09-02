import { gql } from '@apollo/client';
import { RATE_LIMIT } from './fragment';

export const GET_RATE_LIMIT = gql`
  ${RATE_LIMIT}
  query {
    ...RateLimit
  }
`;
