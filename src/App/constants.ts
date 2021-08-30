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
};
