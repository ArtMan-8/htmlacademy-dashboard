import { INormalizedProject } from '../../components/DataLoader/helpers';
import { NotFound } from '../../constants';

function getRandomColor(opacity = 1) {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Количество проектов по модулям.',
    },
  },
};

interface IDate {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    hoverOffset: number;
  }[];
}

export function getDataForDoughnutChart(projects: INormalizedProject[]): IDate {
  const dataForDoughnutChart = projects.reduce((data: Record<string, number>, project) => {
    const lastPR =
      project.lastPullRequestName === NotFound.TITLE ? NotFound.TITLE : project.lastPullRequestName.split('-')[0];

    return {
      ...data,
      [lastPR]: data[lastPR] ? data[lastPR] + 1 : 1,
    };
  }, {});

  const labels = Object.keys(dataForDoughnutChart).sort();

  const data = {
    labels: labels.map((label) => `На ${label} - ${dataForDoughnutChart[label]} репозиториев`),
    datasets: [
      {
        label: 'Count projects on modules',
        data: labels.map((label) => dataForDoughnutChart[label]),
        backgroundColor: labels.map(() => getRandomColor(0.5)),
        borderColor: ['white'],
        borderWidth: 2,
        hoverOffset: 3,
      },
    ],
  };

  return data;
}
