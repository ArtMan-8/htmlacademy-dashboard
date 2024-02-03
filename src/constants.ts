export const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

export const Author = {
  NAME: 'ArtMan-8',
  URL: 'https://github.com/ArtMan-8',
};

export const NotFound = {
  TITLE: 'не определён',
  URL: 'https://github.com/404',
};

interface ICourses {
  [key: string]: {
    organization: string;
    description: string;
    projects: string[];
  };
}

export const Courses: ICourses = {
  htmlCss1: {
    organization: `htmlacademy-htmlcss`,
    description: 'HTML и CSS. Профессиональная вёрстка сайтов',
    projects: ['device', 'gllacy', 'nerds', 'sedona', 'technomart'],
  },
  htmlCss2: {
    organization: `htmlacademy-adaptive`,
    description: 'HTML и CSS. Адаптивная вёрстка и автоматизация',
    projects: ['cat-energy', 'device', 'mishka', 'pognali', 'sedona'],
  },
  javaScript1: {
    organization: `htmlacademy-javascript`,
    description: 'JavaScript. Профессиональная разработка веб-интерфейсов',
    projects: ['keksobooking', 'kekstagram'],
  },
  javaScript2: {
    organization: `htmlacademy-ecmascript`,
    description: 'JavaScript. Архитектура клиентских приложений',
    projects: ['big-trip', 'cinemaddict'],
  },
  react: {
    organization: `htmlacademy-react`,
    description: 'React. Разработка сложных клиентских приложений',
    projects: ['six-cities', 'what-to-watch'],
  },
  vue: {
    organization: `htmlacademy-vue`,
    description: 'Vue. Разработка клиентских приложений',
    projects: ['pizza'],
  },
  nodejs: {
    organization: `htmlacademy-nodejs-api`,
    description: 'Node. Профессиональная разработка REST API',
    projects: ['typoteka', 'buy-and-sell', 'six-cities', 'what-to-watch'],
  },
  php1: {
    organization: `htmlacademy-php`,
    description: 'PHP. Профессиональная веб-разработка',
    projects: ['readme', 'doingsdone', 'yeticave'],
  },
  php2: {
    organization: `htmlacademy-yii`,
    description: 'PHP и Yii. Архитектура сложных веб-сервисов',
    projects: ['task-force'],
  },
  php3: {
    organization: `htmlacademy-php3`,
    description: 'PHP и Laravel. Создание современных бэкендов',
    projects: ['what-to-watch'],
  },
  animation: {
    organization: `htmlacademy-animation`,
    description: 'Анимация для фронтендеров',
    projects: ['magic-vacation'],
  },
  email: {
    organization: `htmlacademy-email`,
    description: 'Вёрстка email-рассылок',
    projects: ['play-html'],
  },
};
