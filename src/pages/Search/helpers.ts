import { Courses, NotFound, PROXY_URL } from '../../constants';

export function generateOriginalCourseUrl(selectedCourse: string): string {
  return `${PROXY_URL}/get?url=https://github.com/${Courses[selectedCourse]?.organization}/`;
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
