'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

interface SearchContextValue {
  isOpen: boolean;
  initialQuery: string;
  open: () => void;
  openWithQuery: (q: string) => void;
  close: () => void;
  toggle: () => void;
}

const SearchContext = createContext<SearchContextValue>({
  isOpen: false,
  initialQuery: '',
  open: () => {},
  openWithQuery: () => {},
  close: () => {},
  toggle: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  const open = useCallback(() => { setInitialQuery(''); setIsOpen(true); }, []);
  const openWithQuery = useCallback((q: string) => { setInitialQuery(q); setIsOpen(true); }, []);
  const close = useCallback(() => { setIsOpen(false); setInitialQuery(''); }, []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  return (
    <SearchContext.Provider value={{ isOpen, initialQuery, open, openWithQuery, close, toggle }}>
      {children}
    </SearchContext.Provider>
  );
}
