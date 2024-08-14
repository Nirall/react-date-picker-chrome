/* eslint-disable func-names */
import React, { useState, useMemo, useRef, useEffect } from 'react';

import { bemNameGenerator } from '../../model/utils';

import { TSelectorProps } from './types';
import './Selector.scss';

const b = bemNameGenerator('react-date-picker-dayjs-chrome-selector');

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
  const beginRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const initialScrollEndedRef = useRef(false);

  const [scrollTrigger, setScrollTrigger] = useState<null | Object>(null);

  const itemsList = useMemo(
    () =>
      items
        .map(item => {
          const isActive = item.value === activeValue;
          const activeSuffix = isActive ? ` ${className}_active` : '';

          return (
            <React.Fragment key={item.name}>
              <li
                className={`${className}${activeSuffix}`}
                onClick={() => {
                  onChange(item);
                  if (withScrollOnSelect) setScrollTrigger({});
                }}
              >
                {item.name}
              </li>
              {isActive && <div className={b('children')} ref={childrenRef}>{children}</div>}
            </React.Fragment>
        )
      }),
    [items, activeValue, onChange, className, children, withScrollOnSelect],
  );

  useEffect(() => {
    const main = mainRef.current;

    const handleBeginVisible = () => {
      if (main && initialScrollEndedRef.current) {
        const { scrollHeight } = main;

        main.scrollTo({
          top: scrollHeight - ((listUnderRef.current?.scrollHeight ?? 0) * 2),
        });
      }
    }

    const handleEndVisible = () => {
      if (main && initialScrollEndedRef.current) {
        const { clientHeight } = main;

        main.scrollTo({
          top: ((listAboveRef.current?.scrollHeight ?? 0) * 2) - clientHeight,
        });
      }
    }

    const beginObserver = new IntersectionObserver(handleBeginVisible, {
      threshold: 0,
    });

    const endObserver = new IntersectionObserver(handleEndVisible, {
      threshold: 0,
    });
  
    if (beginRef.current) beginObserver.observe(beginRef.current);
    if (endRef.current) endObserver.observe(endRef.current);

    return (() => {
      beginObserver.disconnect();
      endObserver.disconnect();
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

        setTimeout(() => {
          initialScrollEndedRef.current = true;
        }, 500);
      }
    }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTrigger]);

  const withCycleScroll = additionalItemsCount > 0;

  return (
    <div className={b()} ref={mainRef}>
      {withCycleScroll && <div className={b('begin')} ref={beginRef} />}
      <ul className={b('list')} ref={listAboveRef}>
        {withCycleScroll && itemsList.slice(-additionalItemsCount)}
      </ul>
      <ul className={b('list')}>{itemsList}</ul>
      <ul className={b('list')} ref={listUnderRef}>
        {withCycleScroll && itemsList.slice(0, additionalItemsCount)}
      </ul>
      {withCycleScroll && <div className={b('end')} ref={endRef} />}
    </div>
  );
};

export default Selector;
