import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import useClickOutside from '../model/useClickOutside';
import useDatePicker from '../model/useDatePicker';
import { bemNameGenerator } from '../model/utils';
import Selector from './Selector';

import { TDatePicker } from './types';
import './DatePicker.scss';

const b = bemNameGenerator('react-date-picker-dayjs-chrome');

/**
 * @param { string } dateFormat - according to dayjs
 * You can pass children as the base element of the date picker
*/

const DatePicker = ({
  dateFormat = 'DD.MM.YYYY HH:mm',
  value,
  onChange,
  position,
  children,
  style,
  todayWord = 'today',
  deleteWord = 'delete',
  withTime = true,
}: TDatePicker) => {
  const { handlers, values } = useDatePicker({ value, onChange, position });
  const { ref } = useClickOutside(() => handlers.handleOpen(false));

  const weekItems = values.weekNames.map(v =>
    <div className={b('cell', { type: 'week' })} key={v}>{v}</div>
  );

  const daysItems = values.days.map((v, i) => (
    <div
      className={b('cell', { active: v.active, grey: v.isAnotherMonth })}
      key={`${v.name}_${i}`}
      onClick={() => handlers.handleDaySelect(v)}
    >
      {v.name}
    </div>
  ));

  const monthItems = values.months.map((v, i) => (
    <div
      className={b('months-elem', { active: v.value === values.bufferValue.get('month') })}
      key={`${v.name}_${i}`}
      onClick={() => handlers.handleMonthSelect(v)}
    >
      {v.name}
    </div>
  ));

  useEffect(() => {
    const main = ref.current;

    if (style && main) {
      Object.entries(style).forEach(([k, v]) => {
        main.style.setProperty(k, v);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style]);

  return (
    <div className={b({ open: values.isOpen, yearsOpen: values.isYearsOpen })} ref={ref}>
      {children
        ? <div className={b('children')} onClick={() => handlers.handleOpen()}>{children}</div>
        : <div className={b('input')} onClick={() => handlers.handleOpen()}>
            <div className={b('icon')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Calendar">
                  <path id="coolicon" d="M20.4 24H3.60001C2.27453 24 1.20001 22.9255 1.20001 21.6V4.8C1.20001 3.47452 2.27453 2.4 3.60001 2.4H6.00001V0H8.40001V2.4H15.6V0H18V2.4H20.4C21.7255 2.4 22.8 3.47452 22.8 4.8V21.6C22.8 22.9255 21.7255 24 20.4 24ZM3.60001 9.6V21.6H20.4V9.6H3.60001ZM3.60001 4.8V7.2H20.4V4.8H3.60001ZM18 19.2H15.6V16.8H18V19.2ZM13.2 19.2H10.8V16.8H13.2V19.2ZM8.40001 19.2H6.00001V16.8H8.40001V19.2ZM18 14.4H15.6V12H18V14.4ZM13.2 14.4H10.8V12H13.2V14.4ZM8.40001 14.4H6.00001V12H8.40001V14.4Z" fill="var(--icon)" />
                </g>
              </svg>
            </div>
            {value ? dayjs(value).format(dateFormat) : dateFormat}
            <div className={b('icon', { type: 'arrow' })}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrow">
                  <path id="Vector" d="M7 8L12 13L17 8L19 9L12 16L5 9L7 8Z" fill="var(--icon)"/>
                </g>
              </svg>
            </div>
          </div>}

      <div className={b('calendar-wrapper', { position: position ?? values.dynamicPosition })} ref={values.calendarRef}>
        <div className={b('calendar')}>
          <div className={b('calendar-header')}>
            <div
              className={b('calendar-date')}
              onClick={() => handlers.setIsYearsOpen(!values.isYearsOpen)}
            >
              {dayjs(values.bufferValue).format('MMMM YYYY')}
              <div className={b('calendar-triangle')}>
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="Polygon 1" d="M5 5L0.669872 0.5L9.33013 0.5L5 5Z" fill="var(--text)"/>
                </svg>
              </div>
            </div>
            {!values.isYearsOpen &&
              <>
                <div
                  className={b('arrow', { type: 'up' })}
                  onClick={() => handlers.handleArrowClick(-1, 'month')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame 3">
                      <path id="Arrow 1" d="M11.2929 20.7071C11.6834 21.0976 12.3166 21.0976 12.7071 20.7071L19.0711 14.3431C19.4616 13.9526 19.4616 13.3195 19.0711 12.9289C18.6805 12.5384 18.0474 12.5384 17.6569 12.9289L12 18.5858L6.34315 12.9289C5.95262 12.5384 5.31946 12.5384 4.92893 12.9289C4.53841 13.3195 4.53841 13.9526 4.92893 14.3431L11.2929 20.7071ZM11 4L11 20L13 20L13 4L11 4Z" fill="var(--text)"/>
                    </g>
                  </svg>
                </div>
                <div
                  className={b('arrow')}
                  onClick={() => handlers.handleArrowClick(1, 'month')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame 3">
                      <path id="Arrow 1" d="M11.2929 20.7071C11.6834 21.0976 12.3166 21.0976 12.7071 20.7071L19.0711 14.3431C19.4616 13.9526 19.4616 13.3195 19.0711 12.9289C18.6805 12.5384 18.0474 12.5384 17.6569 12.9289L12 18.5858L6.34315 12.9289C5.95262 12.5384 5.31946 12.5384 4.92893 12.9289C4.53841 13.3195 4.53841 13.9526 4.92893 14.3431L11.2929 20.7071ZM11 4L11 20L13 20L13 4L11 4Z" fill="var(--text)"/>
                    </g>
                  </svg>
                </div>
              </>}
          </div>
          {values.isYearsOpen
            ? <Selector
                className={b('year')}
                items={values.years}
                activeValue={values.bufferValue.get('year')}
                onChange={handlers.handleYearSelect}
                additionalItemsCount={0}
                withScrollOnSelect
              >
                <div className={b('months')}>{monthItems}</div>
              </Selector>
            : <>
                <div className={b('calendar-table')}>
                  {weekItems}
                  {daysItems}
                </div>
                <div className={b('buttons')}>
                  <div className={b('button')} onClick={handlers.handleTodayClick}>{todayWord}</div>
                  <div className={b('button')} onClick={handlers.handleDeleteClick}>{deleteWord}</div>
                </div>
              </>}
        </div>
        {values.isOpen && withTime && <div className={b('time')}>
          <Selector
            className={b('time-element')}
            items={values.hours}
            activeValue={values.bufferValue.get('hour')}
            onChange={handlers.handleHourSelect}
          />
          <Selector
            className={b('time-element')}
            items={values.minutes}
            activeValue={values.bufferValue.get('minute')}
            onChange={handlers.handleMinuteSelect}
          />
        </div>}
      </div>
    </div>
  );
};

export default DatePicker;
