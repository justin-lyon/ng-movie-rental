import { capitalize } from './capitalize';

export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, capitalize);
};
