import { CourseBatch } from './../../Models/Courses/index';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { get } from 'lodash';

export function searchFromListOfObject(
  list: any[],
  keys: any[],
  searched: string,
  isParsed = true,
): any[] {
  // filter list of object based on key
  let result = list.filter((item) => {
    const escapedSearched = searched.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchRe = new RegExp(isParsed ? escapedSearched : searched, 'i');
    let isFiltered = false;

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const valueByKey = get(item, key);
      if (searchRe.test(valueByKey)) {
        isFiltered = true;
        break;
      }
    }

    return isFiltered;
  });
  if (!result || !result.length) result = [];
  return result;
}

export function sortByKey(arr: any[], key: string): any[] {
  return arr.sort((a: typeof arr, b: typeof arr) => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0;
  });
}

export const createId = (length = 10): string => {
  return uuidv4().replace('-', '').substr(0, length);
};

export const makePath = (
  path: string,
  replacement: Record<string, any> = {},
  queryParams?: any,
  injectedQueryObj?: Record<string, any>,
): string => {
  let result = path;
  queryParams = queryParams || '';
  injectedQueryObj = injectedQueryObj || {};

  Object.keys(replacement).forEach((key) => {
    result = result.replace(`:${key}`, replacement[key]);
    result = result.replace(key, replacement[key]);
  });
  let finalQueryString = '';

  if (queryParams === '?' || queryParams === '') {
    finalQueryString = `?${queryString.stringify(injectedQueryObj)}`;
  } else {
    finalQueryString = `?${queryString.stringify({
      ...queryString.parse(queryParams),
      ...injectedQueryObj,
    })}`;
  }
  if (finalQueryString.trim() === '?') finalQueryString = '';

  return `${result}${finalQueryString}`;
};

export const parseJson = (
  jsonString: string,
  defaultValue: Record<string, any> = {},
): Record<string, any> => {
  try {
    if (!jsonString) return defaultValue;
    return JSON.parse(jsonString) || defaultValue;
  } catch (err) {
    return defaultValue;
  }
};

export const getCourseStatus = (batches: CourseBatch[]) => {
  const status = 'Closed'; // OPEN REGISTRATION, CLOSED REGISTRATION, ONGOING
  const now = new Date();
  let isFuture = false;

  for (const batch of batches) {
    if (
      now >= new Date(batch.registrationStartsAt) &&
      now <= new Date(batch.registrationEndsAt)
    ) {
      return 'Open Registration';
    }
    if (now > new Date(batch.startDate) && now < new Date(batch.endDate)) {
      return 'Ongoing';
    }
    if (batch.startDate > now) isFuture = true;
  }

  if (isFuture) return 'Close Registration';

  return status;
};

const minPoints = [
  0,
  100,
  250,
  400,
  750,
  1000,
  1500,
  2000,
  3000,
  4000,
  5000,
  7500,
  10000,
  15000, //14
  20000,
  25000,
  30000,
  35000,
  40000,
  45000,
  50000,
  55000,
  60000,
  65000,
  70000, //25
  75000,
  80000,
  85000,
  90000,
  95000,
  100000,
  105000,
  110000,
  115000,
  120000, //35
  125000,
  130000,
  135000,
  140000,
  145000,
  150000,
  155000,
  160000,
  165000, //45
  170000,
  175000,
  180000,
  185000,
  190000,
  195000,
  200000,
  205000,
  210000,
  215000,
  220000, //55
];

export const getLevelAndBadges = (exps: number) => {
  let level = 0;
  for (let i = 0; i < minPoints.length; i++) {
    if (exps >= minPoints[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  let badges = 'bronze';
  if (level > 30) badges = 'diamond';
  else if (level > 20) badges = 'platinum';
  else if (level > 10) badges = 'gold';
  else if (level > 5) badges = 'silver';

  const nextLevelExp = minPoints[Math.max(level, 0)];
  const currentLevelMinExp = minPoints[Math.max(level - 1, 0)];
  let badgeColor = '#c3883c';
  if (badges === 'diamond') badgeColor = '#4c6fb3';
  else if (badges === 'platinum') badgeColor = '44bb61';
  else if (badges === 'gold') badgeColor = '#bbc23d';
  else if (badges === 'silver') badgeColor = '#b8b8b8';

  return {
    level,
    badges,
    bagdesLabel: badges.charAt(0).toUpperCase() + badges.slice(1),
    badgeColor,
    nextLevelExp,
    progress:
      100 - ((nextLevelExp - exps) / (nextLevelExp - currentLevelMinExp)) * 100,
  };
};
