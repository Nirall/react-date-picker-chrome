import React from 'react';

type TSelectorItem<T> = {
  value: T,
  name: string,
}

type TSelectorProps<T> = {
  items: TSelectorItem<T>[],
  activeValue: T,
  onChange: (value: TSelectorItem<T>) => void,
  className: string,
  children?: React.ReactNode,
  withScrollOnSelect?: boolean,
  additionalItemsCount?: number,
}

export type { TSelectorProps };
