import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { store } from '../../store/store';
import { GET_REPOS } from './GetRepos.query';
import { actionCreate, EActionType } from '../../store/types';

function Table(): JSX.Element {
  const [refetchLimit, setRefetchLimit] = useState(10);
  const [cursor, setCursor] = useState<null | string>(null);
  const { state, dispatch } = useContext(store);
  const { projectName, repositories } = state;

  const { data, loading, error } = useQuery(GET_REPOS, {
    variables: {
      projectName,
      after: cursor,
      first: 100,
    },
    onCompleted() {
      dispatch(actionCreate(EActionType.SET_REQUEST_LIMIT, { requestLimit: data.rateLimit.remaining }));
      dispatch(actionCreate(EActionType.ADD_REPOSITORIES, { repositories: data.search.nodes }));

      if (data.search.pageInfo.hasNextPage && refetchLimit > 0) {
        setCursor(data.search.pageInfo.endCursor);
        setRefetchLimit(refetchLimit - 1);
      }
    },
  });

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center' }}>Error ${error}</div>;
  }

  return <div style={{ textAlign: 'center' }}>repo count: {repositories.length}</div>;
}

export default Table;
