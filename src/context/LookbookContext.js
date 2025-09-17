import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const LookbookContext = createContext(null);

export function LookbookProvider({ looks, children }) {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [openProductIds, setOpenProductIds] = useState([]);

  const setActiveLook = useCallback((index) => {
    setActiveLookIndex((prev) => {
      const next = Math.max(0, Math.min(index, (looks?.length || 1) - 1));
      return next;
    });
    setActiveMediaIndex(0);
    setOpenProductIds([]);
  }, [looks]);

  const nextMedia = useCallback(() => {
    const mediaCount = looks?.[activeLookIndex]?.media?.length || 0;
    setActiveMediaIndex((i) => Math.min(i + 1, Math.max(0, mediaCount - 1)));
  }, [looks, activeLookIndex]);

  const prevMedia = useCallback(() => {
    setActiveMediaIndex((i) => Math.max(i - 1, 0));
  }, []);

  const openProduct = useCallback((productId) => {
    setOpenProductIds((ids) => (ids.includes(productId) ? ids : [...ids, productId]));
  }, []);
  const closeProduct = useCallback((productId) => {
    if (!productId) { setOpenProductIds([]); return; }
    setOpenProductIds((ids) => ids.filter((id) => id !== productId));
  }, []);

  const value = useMemo(() => ({
    looks: looks || [],
    activeLookIndex,
    activeMediaIndex,
    openProductIds,
    setActiveLook,
    nextMedia,
    prevMedia,
    openProduct,
    closeProduct,
  }), [looks, activeLookIndex, activeMediaIndex, openProductIds, setActiveLook, nextMedia, prevMedia, openProduct, closeProduct]);

  return (
    <LookbookContext.Provider value={value}>{children}</LookbookContext.Provider>
  );
}

export function useLookbook() {
  const ctx = useContext(LookbookContext);
  if (!ctx) throw new Error('useLookbook must be used within LookbookProvider');
  return ctx;
}


