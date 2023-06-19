import { DateTime } from 'luxon';

const gmtDiff = (+(process.env as any).GMT_DIFF) || 3;
const ONE_HOUR_IN_MILISECS = 60 * 6e4;
const GMT_DIFF_IN_MILISECS = gmtDiff * ONE_HOUR_IN_MILISECS;
export const FIFTEN_MINUTES_IN_MILISECONDS = 15 * 60 * 1000;

export function now(gmtDiff= false): Date {
  const date = new Date();
  if (!gmtDiff) {
    return date;
  }
  date.setTime(date.getTime() - GMT_DIFF_IN_MILISECS);
  return new Date(date.getTime());
}

export function dateFromISOString(dateStr: string): Date {
  return DateTime.fromISO(dateStr, { setZone: false }).toJSDate();
}

export function dateFromHTTPString(dateStr: string): Date {
  return DateTime.fromHTTP(dateStr, { setZone: false }).toJSDate();
}

export function dateFromTime(time: number): Date {
  return DateTime.fromMillis(time).toJSDate();
}

export function dateFromSQLString(dateStr: string): Date {
  return DateTime.fromSQL(dateStr, { setZone: false }).toJSDate();
}

export function dateStartFromString(dateStr: string): Date {
  return new Date(dateStr + ' 00:00:00');
}

export function dateEndFromString(dateStr: string): Date {
  return new Date(dateStr + ' 23:59:59');
}

/**
 *
 * @param obj JSON object with date parameters, {day: 22, month: 12, year: 2021}
 * @returns Javascript Date object instance
 */
export function dateFromJson(obj: any): Date {
  return DateTime.fromObject(obj).toJSDate();
}

/**
 *
 * @param dateStr Date on string format
 * @param format The string format, USAGE: dd/MM/yyyy = 30/12/2020
 *                                         dd/MM/yyyy HH:mm:ss = 30/12/2020 13:50:13
 * @returns Date object
 */

export function dateParse(dateStr: string, format: string): Date {
  return DateTime.fromFormat(dateStr, format, {
    setZone: false,
  }).toJSDate();
}

/**
 *
 * @param date Date to format
 * @param format USAGE: dd/MM/yyyy = 30/12/2020
 *                      dd/MM/yyyy HH:mm:ss = 30/12/2020 13:50:13
 * @returns Formated date string
 */

export function dateFormat(date: Date, format: string): string {
  return DateTime.fromJSDate(date).toFormat(format);
}

/**
 *
 * @param date Date to formalize
 * @param locale region locale, USAGE: pt-BR, en-US
 * @returns 20 de Dezembro de 2013
 */

export function dateFormalize(date: Date, locale = 'pt-BR') {
  return DateTime.fromJSDate(date)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_FULL);
}