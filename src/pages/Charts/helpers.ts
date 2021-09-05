import { INormalizedProject } from '../../components/DataLoader/helpers';
import { NotFound } from '../../constants';

function getRandomColor(opacity = 1) {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function getDataForDoughnutChart(projects: INormalizedProject[]): Record<any, any> {
  const dataForDoughnutChart = projects.reduce((data: Record<string, number>, project) => {
    const lastPR =
      project.lastPullRequestName === NotFound.TITLE ? NotFound.TITLE : project.lastPullRequestName.split('-')[0];

    return {
      ...data,
      [lastPR]: data[lastPR] ? data[lastPR] + 1 : 1,
    };
  }, {});

  const labels = Object.keys(dataForDoughnutChart).sort();

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Количество проектов по модулям.',
      },
    },
  };

  const data = {
    labels,
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

  return { data, options };
}
