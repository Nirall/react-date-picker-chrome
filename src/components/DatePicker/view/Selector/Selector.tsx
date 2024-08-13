/* eslint-disable func-names */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import block from 'bem-cn';
import throttle from 'lodash.throttle';

import { TSelectorProps } from './types';
import './Selector.scss';

const b = block('react-date-picker-dayjs-selector');

const Selector = function <TValue = string>({
  items,
  activeValue,
  className,
  onChange,
  children,
  withScrollOnSelect = false,
  additionalItemsCount = 7,
}: TSelectorProps<TValue>) {
  const mainRef = useRef<HTMLDivElement>(null);
  const listAboveRef = useRef<HTMLUListElement>(null);
  const listUnderRef = useRef<HTMLUListElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const prevScrollTop = useRef(0);

  const [scrollTrigger, setScrollTrigger] = useState<null | Object>(null);

  const itemsList = useMemo(
    () =>
      items
        // .filter(item => !item.active)
        .map(item => {
          const isActive = item.value === activeValue;
          const activeSuffix = isActive ? ` ${className}_active` : '';

          return (
            <>
              <li
                key={item.name}
                className={`${className}${activeSuffix}`}
                onClick={() => {
                  onChange(item);
                  if (withScrollOnSelect) setScrollTrigger({});
                }}
              >
                {item.name}
              </li>
              {isActive && <div className={b('children')} ref={childrenRef}>{children}</div>}
            </>
        )
      }),
    [items, activeValue, onChange, className, children, withScrollOnSelect],
  );

  useEffect(() => {
    const main = mainRef.current;

    const handleListScroll = throttle(() => {
      if (main) {
        const { scrollTop, scrollHeight, clientHeight } = main;

        if (scrollTop + clientHeight > scrollHeight - 2) {
          main.scrollTo({
            top: ((listAboveRef.current?.scrollHeight ?? 0) * 2) - clientHeight,
          });
        } else if (scrollTop === 0 && scrollTop < prevScrollTop.current) {
          main.scrollTo({
            top: scrollHeight - ((listUnderRef.current?.scrollHeight ?? 0) * 2),
          });
        }

        prevScrollTop.current = scrollTop;
      }
    }, 150);

    if (main) main.addEventListener('scroll', handleListScroll);

    return (() => {
      if (main) main.removeEventListener('scroll', handleListScroll);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const main = mainRef.current;

      if (main) {
        const activeIndex = items.findIndex(i => i.value === activeValue);

        const childHeight = childrenRef.current?.scrollHeight ?? 0;


        const scrollTopOffset = ((activeIndex !== -1 ? activeIndex + additionalItemsCount : 0 )
          / (items.length + (additionalItemsCount * 2)))
          * (main.scrollHeight - childHeight);

        main.scrollTo({
          top: scrollTopOffset,
          behavior: scrollTrigger ? 'smooth' : undefined,
        });
      }
    }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTrigger]);

  return (
    <div className={b()} ref={mainRef}>
      <ul className={b('list')} ref={listAboveRef}>
        {additionalItemsCount ? itemsList.slice(-additionalItemsCount) : null}
      </ul>
      <ul className={b('list')}>{itemsList}</ul>
      <ul className={b('list')} ref={listUnderRef}>
        {additionalItemsCount ? itemsList.slice(0, additionalItemsCount) : null}
      </ul>
    </div>
  );
};

export default Selector;
