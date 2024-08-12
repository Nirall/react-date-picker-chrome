import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

const getYears = ({ startYear = 1990, yearsCount = 60 }) =>
  new Array(yearsCount).fill(startYear).map((v, i) => ({
    value: v + i,
    name: v + i,
  }));

const months = dayjs.monthsShort().map((v, i) => ({
  value: i,
  name: v,
}));

const weekNames = dayjs.weekdaysMin();

const hours = new Array(24).fill(0).map((v, i) => ({
  name: String(v + i).padStart(2, '0'),
  value: v + i,
}));

const minutes = new Array(60).fill(0).map((v, i) => ({
  name: String(v + i).padStart(2, '0'),
  value: v + i,
}));

const getCalendarPosition = (item: HTMLDivElement) => {
  const { bottom, right, height } = item.getBoundingClientRect();
  const vertical = bottom > (document.documentElement.clientHeight + (height / 8)) ? 'top' : 'bottom';
  const horizontal = right > document.documentElement.clientWidth ? 'right' : 'left';
  return `${vertical}-${horizontal}`;
}

const style = {
  '--text': '#000',
  '--selected-text': '#FFF',
  '--selected-bg':' #5164F9',
  '--button': '#4D6ECF',
  '--main-bg': '#FFF',
  '--icon':' #8C9EB7',
  '--border': '#CFDAE9',
  '--year': 'rgba(0, 0, 0, 0.1)',
  '--radius': '0.625rem',
}

export {
  getCalendarPosition,
  getYears,
  hours,
  minutes,
  months,
  weekNames,
  style,
}
