import { DateTime } from 'luxon';

export enum DateUnity {
  MILISECONDS,
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
}

export const FIVE_MINUTES_IN_MILISECS = 5 * 6e4;
export const ONE_HOUR_IN_MILISECS = 60 * 6e4;
export const ONE_DAY_IN_MILISECS = 24 * ONE_HOUR_IN_MILISECS;
export const _30_DAYS_IN_MILISECS = 30 * ONE_DAY_IN_MILISECS;


export function dateIsBetween(date: Date, from: Date, to: Date) {
  return from.getTime() < date.getTime() && to.getTime() > date.getTime();
}

export function dateHowManyMiliseconds(from: Date, to: Date): number {
  return Math.round(from.getTime() - to.getTime());
}

export function dateHowManySeconds(from: Date, to: Date): number {
  return Math.round(
    DateTime.fromJSDate(to)
      .diff(DateTime.fromJSDate(from), 'seconds')
      .toObject().seconds || 0,
  );
}

export function dateHowManyMinutes(from: Date, to: Date): number {
  return Math.round(
    DateTime.fromJSDate(to)
      .diff(DateTime.fromJSDate(from), 'minutes')
      .toObject().minutes || 0,
  );
}

export function dateHowManyHours(from: Date, to: Date): number {
  return Math.round(
    DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'hours').toObject()
      .hours || 0,
  );
}

export function dateHowManyDays(from: Date, to: Date): number {
  return Math.round(
    DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'days').toObject()
      .days || 0,
  );
}

export function dateHowManyWeeks(from: Date, to: Date): number {
  return Math.round(
    DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'weeks').toObject()
      .weeks || 0,
  );
}

export function dateHowManyMonths(from: Date, to: Date): number {
  return Math.round(
    DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'months').toObject()
      .months || 0,
  );
}

export function dateHowManyYears(from: Date, to: Date): number {
  return Math.round(
    DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'years').toObject()
      .years || 0,
  );
}

export function dateAdd(date: Date, amount: number, unity: DateUnity): Date {
  if (!amount) {
    return DateTime.fromJSDate(date).toJSDate();
  }

  switch (unity) {
    case DateUnity.MILISECONDS:
      return DateTime.fromJSDate(date)
        .plus({ milliseconds: amount })
        .toJSDate();
    case DateUnity.SECONDS:
      return DateTime.fromJSDate(date).plus({ seconds: amount }).toJSDate();
    case DateUnity.MINUTES:
      return DateTime.fromJSDate(date).plus({ minutes: amount }).toJSDate();
    case DateUnity.HOURS:
      return DateTime.fromJSDate(date).plus({ hours: amount }).toJSDate();
    case DateUnity.DAYS:
      return DateTime.fromJSDate(date).plus({ days: amount }).toJSDate();
    case DateUnity.WEEKS:
      return DateTime.fromJSDate(date).plus({ weeks: amount }).toJSDate();
    case DateUnity.MONTHS:
      return DateTime.fromJSDate(date).plus({ months: amount }).toJSDate();
    case DateUnity.YEARS:
      return DateTime.fromJSDate(date).plus({ years: amount }).toJSDate();
  }
}