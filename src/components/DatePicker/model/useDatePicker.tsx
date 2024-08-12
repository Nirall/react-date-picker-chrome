import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { getCalendarPosition, getYears, hours, minutes, months, weekNames } from './data';

type TUseInputDateCustom = {
  value: Date | null,
  onChange: (v: Date | null) => void,
  startYear?: number;
  yearsCount?: number;
  position?: string,
}

const useDatePicker = ({ value, onChange, position, startYear, yearsCount }: TUseInputDateCustom) => {
  const [bufferValue, setBufferValue] = useState(value ? dayjs(value) : dayjs());
  const [isOpen, setIsOpen] = useState(false);
  const [isYearsOpen, setIsYearsOpen] = useState(false);
  const [dynamicPosition, setDynamicPosition] = useState('');
  const calendarRef = useRef<HTMLDivElement>(null);
  const isSkipBufferValueUpdate = useRef(true);
  const yearsRef = useRef(getYears({ startYear, yearsCount }));

  useEffect(() => {
    if (value && (dayjs(value).toISOString() !== bufferValue.toISOString())) {
      setBufferValue(dayjs(value));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!isOpen && !isSkipBufferValueUpdate.current) {
      const newDate = bufferValue.toISOString();
      if (newDate !== value?.toISOString()) {
        onChange(new Date(newDate));
      }
    }

    isSkipBufferValueUpdate.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (calendarRef.current) {
      // change not through classes because if use classes there will be a blink when change position
      calendarRef.current.style.display = isOpen ? 'flex' : 'none';

      if (!position) {
        const positionClass = getCalendarPosition(calendarRef.current);
        setDynamicPosition(positionClass);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const startDate = bufferValue
    .startOf('month')
    .startOf('week')
    .set('hour', bufferValue.get('hour'))
    .set('minute', bufferValue.get('minute'));
  const endDate = bufferValue.endOf('month').endOf('week');
  const daysCount = endDate.diff(startDate, 'day');

  const days = new Array(daysCount + 1).fill(0).map((v, i) => {
    const day = startDate.add(i, 'day');
    const active = day.format('YYYY-MM-DD') === bufferValue.format('YYYY-MM-DD');
    const isAnotherMonth = day.format('MM') !== bufferValue.format('MM');

    return ({
      name: day.get('date'),
      value: day,
      active,
      isAnotherMonth,
    })
  });

  const handleYearSelect = (item: ReturnType<typeof getYears>[0]) => {
    setBufferValue(ps => ps.set('year', item.value));
  }

  const handleMonthSelect = (item: typeof months[0]) => {
    setBufferValue(ps => ps.set('month', item.value));
  }

  const handleDaySelect = (item: typeof days[0]) => {
    setBufferValue(item.value);
    setIsOpen(false);
  }

  const handleHourSelect = (item: typeof hours[0]) => {
    setBufferValue(ps => ps.set('hour', item.value));
  }

  const handleMinuteSelect = (item: typeof minutes[0]) => {
    setBufferValue(ps => ps.set('minute', item.value));
  }

  const handleArrowClick = (direction: 1 | -1, type: dayjs.ManipulateType) => {
    setBufferValue(ps => ps.add(direction, type));
  }

  const handleOpen = (v?: boolean) => {
    setIsYearsOpen(false);
    setIsOpen(v ?? !isOpen);
  }

  const handleDeleteClick = () => {
    onChange(null);
    isSkipBufferValueUpdate.current = true;
    setIsOpen(false);
  }

  const handleTodayClick = () => {
    setBufferValue(dayjs());
    setIsOpen(false);
  }

  return ({
    values: {
      minutes,
      hours,
      months,
      years: yearsRef.current,
      weekNames,
      days,
      isOpen,
      isYearsOpen,
      bufferValue,
      calendarRef,
      dynamicPosition,
    },
    handlers: {
      handleYearSelect,
      handleMonthSelect,
      handleDaySelect,
      handleHourSelect,
      handleMinuteSelect,
      handleArrowClick,
      handleOpen,
      handleDeleteClick,
      handleTodayClick,
      setIsOpen,
      setIsYearsOpen,
      setBufferValue,
    }
  });
}

export default useDatePicker;