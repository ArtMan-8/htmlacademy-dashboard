import { Courses, NotFound } from '../../constants';

export const setProxy = (url: string): string => `https://api.allorigins.win/get?url=${url}`;

export function generateOriginalCourseUrl(selectedCourse: string): string {
  return setProxy(`https://github.com/${Courses[selectedCourse]?.organization}/`);
}

export function getCourseNumber(html: string): string {
  const parser = new DOMParser();
  const content = parser.parseFromString(html, 'text/html');
  const courseNumber = content
    ?.querySelector('li.Box-row:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)')
    ?.textContent?.trim()
    .split('-')
    .pop();

  return courseNumber || NotFound.TITLE;
}
