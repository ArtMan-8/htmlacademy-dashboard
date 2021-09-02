import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GET_STUDENT_REPOS } from '../../graphql/GetStudentRepos.query';
import { store } from '../../store/store';
import { actionCreate, EActionType, EFetchStatus } from '../../store/types';
import useStyles from './dataLoader.styles';

/*
  refetchLimit
  заглушка для быстрых тестов
  обрывает запросы
*/

export default function DataLoader(): JSX.Element {
  const classes = useStyles();

  // const [refetchLimit, setRefetchLimit] = useState(0);
  const [cursor, setCursor] = useState<string | null>(null);

  const { state, dispatch } = useContext(store);
  const { selectedProjects, projects, fetchStatus } = state;

  const { data, loading, error } = useQuery(GET_STUDENT_REPOS, {
    variables: {
      projectName: selectedProjects[0],
      after: cursor,
      first: 10,
    },
    onCompleted() {
      dispatch(actionCreate(EActionType.SET_REQUEST_LIMIT, { requestLimit: data.rateLimit.remaining }));
      dispatch(actionCreate(EActionType.ADD_REPOSITORIES, { projects: data.search.nodes }));

      // const hasPage = () => data.search.pageInfo.hasNextPage && refetchLimit > 0;
      const hasPage = () => data.search.pageInfo.hasNextPage;

      if (hasPage()) {
        setCursor(data.search.pageInfo.endCursor);
        // setRefetchLimit(refetchLimit - 1);
      }

      if (!hasPage() && selectedProjects.length) {
        setCursor(null);
        const [_, ...restProjects] = selectedProjects;
        dispatch(actionCreate(EActionType.SET_SELECTED_PROJECTS, { selectedProjects: restProjects }));
      }

      if (loading) {
        dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.PENDING }));
      }

      if (error) {
        dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.FAILED }));
      }

      if (!error && !loading && !hasPage() && selectedProjects.length === 1) {
        dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.SUCCEEDED }));
      }
    },
  });

  const isLoading = fetchStatus === EFetchStatus.PENDING;
  const isError = fetchStatus === EFetchStatus.FAILED;
  const isSuccess = fetchStatus === EFetchStatus.SUCCEEDED;

  return (
    <Paper className={classes.dataLoader}>
      {isLoading && <LinearProgress className={classes.progressBar} />}

      {projects.length > 0 && (
        <Typography align="center">Найдено активных* репозиториев:&nbsp;{projects.length}</Typography>
      )}

      {isError && <Typography align="center">Что-то пошло не так</Typography>}

      {projects.length > 0 && isSuccess && (
        <div style={{ textAlign: 'center' }}>
          <Typography align="center">Выберите вариант просмотра</Typography>

          <Button variant="contained" color="primary" component={Link} to="/table" className={classes.button}>
            таблица
          </Button>

          <Button variant="contained" color="primary" component={Link} to="/charts" className={classes.button}>
            графики
          </Button>

          <Typography align="center" className={classes.note}>
            * Учитываются форкнутые репозитории,
            <br />с наличием пул-реквестов
          </Typography>
        </div>
      )}
    </Paper>
  );
}
