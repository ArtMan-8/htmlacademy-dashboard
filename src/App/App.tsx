import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CircularProgress } from '@material-ui/core';
import { GET_STUDENT_REPOS } from './GetRepos.query';
import { store } from '../store/store';
import { actionCreate, EActionType, EFetchStatus } from '../store/types';
import Layout from '../layouts/Main';
import Table from '../components/Table/Table';
import SelectProjects from '../components/SelectProjects';

export default function App(): JSX.Element {
  const [refetchLimit, setRefetchLimit] = useState(50);
  const [cursor, setCursor] = useState<null | string>(null);
  const { state, dispatch } = useContext(store);
  const { projectName, fetchStatus } = state;

  const { data, loading, error } = useQuery(GET_STUDENT_REPOS, {
    variables: {
      projectName,
      after: cursor,
      first: 10,
    },
    onCompleted() {
      dispatch(actionCreate(EActionType.SET_REQUEST_LIMIT, { requestLimit: data.rateLimit.remaining }));
      dispatch(actionCreate(EActionType.ADD_REPOSITORIES, { projects: data.search.nodes }));

      const hasPage = () => data.search.pageInfo.hasNextPage && refetchLimit > 0;

      if (hasPage()) {
        setCursor(data.search.pageInfo.endCursor);
        setRefetchLimit(refetchLimit - 1);
      }

      if (loading) {
        dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.PENDING }));
      }

      if (error) {
        dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.FAILED }));
      }

      if (!error && !loading && !hasPage()) {
        dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.SUCCEEDED }));
      }
    },
  });

  const isLoading = fetchStatus === EFetchStatus.PENDING;
  const isError = fetchStatus === EFetchStatus.FAILED;
  const isSuccess = fetchStatus === EFetchStatus.SUCCEEDED;

  return (
    <>
      <CssBaseline />
      <Layout>
        {/* <Search /> */}

        <SelectProjects />

        {isLoading && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        )}

        {isError && <div style={{ textAlign: 'center' }}>Error ${error}</div>}

        {isSuccess && <Table />}
      </Layout>
    </>
  );
}
