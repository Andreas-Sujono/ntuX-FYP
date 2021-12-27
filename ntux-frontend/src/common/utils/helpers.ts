import { CourseBatch } from './../../Models/Courses/index';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';

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
      if (searchRe.test(item[key])) {
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
  batches.forEach((batch) => {
    if (now > batch.registrationStartsAt && now < batch.registrationEndsAt) {
      return 'Open Registration';
    }
    if (now > batch.startDate && now < batch.endDate) {
      return 'Ongoing';
    }
    if (batch.startDate > now) isFuture = true;
  });

  if (isFuture) return 'Close Registration';

  return status;
};
