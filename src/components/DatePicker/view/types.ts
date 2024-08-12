import React from 'react';
import { style } from '../model/data';

export type TDatePicker = {
  color?: 'default',
  children?: React.ReactNode,
  dateFormat?: string,
  value: Date | null,
  onChange: (v: Date | null) => void,
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right',
  style?: Partial<typeof style>,
  todayWord?: string,
  deleteWord?: string,
}
