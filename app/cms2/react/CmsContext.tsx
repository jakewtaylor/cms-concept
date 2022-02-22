import { createContext, useContext, useMemo } from 'react';
import { BlockType, LoadedBlock } from '../Block/Block';
import { LoadedPage } from '../Cms';

type Context = {
  page: LoadedPage;
};

export const CmsContext = createContext<Context>({} as any);

export const useCmsContext = () => useContext(CmsContext);

export const useContent = <T extends BlockType>(
  id: string,
  type: T
): LoadedBlock<T> => {
  const {
    page: {
      data: { blocks },
    },
  } = useCmsContext();

  const block = useMemo<LoadedBlock<T>>(() => {
    const block = blocks.find((block) => block.id === id);

    if (!block || block.type !== type) {
      throw new Error(`Couldn't find a ${type} block with id '${id}'`);
    }

    return block as LoadedBlock<T>;
  }, [blocks, id, type]);

  return block;
};
