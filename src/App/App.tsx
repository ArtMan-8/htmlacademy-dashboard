import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CircularProgress } from '@material-ui/core';
import { GET_STUDENT_REPOS } from './GetRepos.query';
import { store } from '../store/store';
import { actionCreate, EActionType } from '../store/types';
import Layout from '../layouts/Main';
import Search from '../components/Search';
import Table from '../components/Table/Table';

export default function App(): JSX.Element {
  const [refetchLimit, setRefetchLimit] = useState(10);
  const [cursor, setCursor] = useState<null | string>(null);
  const { state, dispatch } = useContext(store);
  const { projectName } = state;

  const hasPage = () => data.search.pageInfo.hasNextPage && refetchLimit > 0;

  const { data, loading, error } = useQuery(GET_STUDENT_REPOS, {
    variables: {
      projectName,
      after: cursor,
      first: 100,
    },
    onCompleted() {
      dispatch(actionCreate(EActionType.SET_REQUEST_LIMIT, { requestLimit: data.rateLimit.remaining }));
      dispatch(actionCreate(EActionType.ADD_REPOSITORIES, { projects: data.search.nodes }));

      if (hasPage()) {
        setCursor(data.search.pageInfo.endCursor);
        setRefetchLimit(refetchLimit - 1);
      }
    },
  });

  return (
    <>
      <CssBaseline />
      <Layout>
        <Search />

        {loading && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        )}

        {error && <div style={{ textAlign: 'center' }}>Error ${error}</div>}

        {!loading && !error && !hasPage() && <Table />}
      </Layout>
    </>
  );
}
