import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import SearchIcon from '@material-ui/icons/Search';
import { Courses, NotFound } from '../../constants';
import { actionCreate, EActionType, EFetchStatus } from '../../store/types';
import { store } from '../../store/store';
import { generateOriginalCourseUrl, getCourseNumber } from './helpers';
import DataLoader from '../../components/DataLoader';
import useStyles from './search.styles';

export default function Search(): JSX.Element {
  const classes = useStyles();

  const [selectedCourse, setCourse] = useState<string>('');
  const [chosenProjects, setProjects] = useState<string[]>([]);
  const [courseNumber, setCourseNumber] = useState<string>(NotFound.TITLE);

  const { state, dispatch } = useContext(store);
  const { fetchStatus, projects } = state;

  const handleSelectProject = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProjects(event.target.value as string[]);
  };

  const handleChangeCourse = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCourse(event.target.value as string);
    setCourseNumber('определяем номер потока ...');
    setProjects([]);
  };

  const onQuerySubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedProjects = chosenProjects.map((project) => `${project}-${courseNumber}`);

    dispatch(actionCreate(EActionType.CLEAR_REPOSITORIES));
    dispatch(actionCreate(EActionType.SET_SELECTED_PROJECTS, { selectedProjects: selectedProjects }));
    dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.PENDING }));
  };

  useEffect(() => {
    fetch(generateOriginalCourseUrl(selectedCourse))
      .then((response) => response.json())
      .then(({ contents }) => {
        setCourseNumber(getCourseNumber(contents));
      });
  }, [selectedCourse]);

  const isLoading = fetchStatus === EFetchStatus.PENDING;

  return (
    <div className={classes.search}>
      <form className={classes.form} onSubmit={onQuerySubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-course-label">Выберите курс</InputLabel>
          <Select
            labelId="select-course-label"
            id="select-course"
            required
            disabled={isLoading}
            value={selectedCourse}
            onChange={handleChangeCourse}
            label="course"
          >
            {Object.entries(Courses).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="select-project-label">Выберите проект/ы</InputLabel>
          <Select
            labelId="select-project-label"
            id="select-project"
            multiple
            required
            disabled={isLoading}
            value={chosenProjects}
            onChange={handleSelectProject}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
          >
            {Courses[selectedCourse]?.projects.map((project) => (
              <MenuItem key={project} value={project}>
                {project}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            label="Номер потока"
            id="select-course-number"
            disabled={true}
            value={courseNumber}
            className={classes.inputNumber}
          />
        </FormControl>

        <Button
          className={classes.submit}
          type="submit"
          disabled={isLoading || !Number(courseNumber) || !chosenProjects.length}
          variant="contained"
          color="primary"
          endIcon={<SearchIcon />}
        >
          Найти проекты
        </Button>
      </form>

      {(isLoading || projects.length > 0) && <DataLoader />}
    </div>
  );
}
