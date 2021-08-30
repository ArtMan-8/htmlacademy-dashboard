import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './selectProject.styles';
import { Courses } from '../../App/constants';
import { actionCreate, EActionType, EFetchStatus } from '../../store/types';
import { store } from '../../store/store';

export default function SelectProjects(): JSX.Element {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  const { fetchStatus } = state;

  const [selectedProjects, setProjects] = useState<string[]>([]);
  const [selectedCourse, setCourse] = useState<string>('');
  const [courseNumber, setCourseNumber] = useState<string>('');

  const handleSelectProject = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProjects(event.target.value as string[]);
  };

  const handleChangeCourse = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCourse(event.target.value as string);
    setProjects([]);
  };

  const handleInputCourseNumber = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCourseNumber(event.target.value as string);
  };

  const onQuerySubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sp = selectedProjects.map((project) => `${project}-${courseNumber}`);
    const projectName = sp[0];

    dispatch(actionCreate(EActionType.SET_PROJECT_NAME, { projectName }));
    dispatch(actionCreate(EActionType.CLEAR_REPOSITORIES));
    dispatch(actionCreate(EActionType.UPDATE_FETCH_STATUS, { fetchStatus: EFetchStatus.PENDING }));
  };

  const isLoading = fetchStatus === EFetchStatus.PENDING;

  return (
    <form className={classes.selectProjectContainer} onSubmit={onQuerySubmit}>
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
          value={selectedProjects}
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
          type="number"
          required
          disabled={isLoading}
          value={courseNumber}
          onChange={handleInputCourseNumber}
          className={classes.inputNumber}
        />
      </FormControl>

      <Button
        className={classes.submit}
        type="submit"
        disabled={isLoading}
        variant="contained"
        color="primary"
        endIcon={<SearchIcon />}
      >
        Запустить поиск проектов
      </Button>
    </form>
  );
}
