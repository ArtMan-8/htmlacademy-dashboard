import { GridColDef } from '@material-ui/data-grid';
import { NotFound } from '../../constants';
import { INormalizedProject } from '../../components/DataLoader/helpers';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '№',
    width: 100,
    align: 'center',
  },
  {
    field: 'mentor',
    headerName: 'Ментор',
    width: 400,
  },
  {
    field: 'students',
    headerName: 'Студенты',
    description: 'Количество студентов у ментора',
    type: 'number',
    width: 150,
    align: 'center',
  },
  {
    field: 'githubProfile',
    headerName: 'Gihub',
    description: 'Github ментора',
    sortable: false,
    width: 400,
  },
];

interface IRow {
  id: number;
  mentor: string;
  students: number;
  githubProfile: string;
}

interface IMentor {
  mentorName: string;
  mentorUrl: string;
  studendCount: number;
}

export default function getRowsForDataGrid(projects: INormalizedProject[]): IRow[] {
  const dataForGrid = projects.reduce((data: Record<string, IMentor>, item) => {
    const { mentorName, mentorUrl } = item;

    return {
      ...data,
      [mentorName]: {
        mentorName,
        mentorUrl,
        studendCount: data[mentorName] ? data[mentorName].studendCount + 1 : 1,
      },
    };
  }, {});

  const rows: IRow[] = Object.values(dataForGrid)
    .map((mentor, index) => ({
      id: index + 1,
      mentor: mentor.mentorName,
      students: mentor.studendCount,
      githubProfile: mentor.mentorUrl,
    }))
    .sort(({ mentor }) => (mentor === NotFound.TITLE ? 1 : -1));

  return rows;
}
