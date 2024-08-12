import { useEffect, useRef } from 'react';

const useClickOutside = (callback = () => {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const refId = useRef(String(Math.random()));

  const handleDocumentClick = (event: UIEvent) => {
    const isInside = event
      .composedPath()
      .map(el => (el as Element).id)
      .includes(refId.current);

    if (!isInside) callback();
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    if (ref.current) ref.current.id = refId.current;

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ({
    ref,
  })
};

export default useClickOutside;
