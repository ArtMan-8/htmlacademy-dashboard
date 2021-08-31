import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core';
import { GET_STUDENT_REPOS } from './GetRepos.query';
import { store } from '../store/store';
import { actionCreate, EActionType, EFetchStatus } from '../store/types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './app.styles';

export default withStyles(styles)(function App(): JSX.Element {
  const [refetchLimit, setRefetchLimit] = useState(0);
  const [cursor, setCursor] = useState<null | string>(null);
  const { state, dispatch } = useContext(store);
  const { projectName, fetchStatus } = state;

  const { data, loading, error } = useQuery(GET_STUDENT_REPOS, {
    variables: {
      projectName,
      after: cursor,
      first: 20,
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
      <Header />
      <Footer />
    </>
  );
});
