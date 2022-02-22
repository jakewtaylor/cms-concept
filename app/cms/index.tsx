import { createContext, useContext, useEffect, useMemo } from 'react';
import { ContentType } from './types';
import { usePageController, PageState } from './usePageController';

type Context = PageState & {
  registerContent(id: string, type: ContentType): () => void;
};

type AreaProps = {
  id: string;
};

type ContentProps = {
  id: string;
  type?: ContentType;
};

export const loadCmsData = async (id: string) => {
  return `Pretend this is the content for the ${id} page`;
};

const ctx = createContext<Context>({} as Context);

export const Area: React.FC<AreaProps> = ({ id, children }) => {
  const { state, registerContent } = usePageController(id);

  const context = useMemo<Context>(
    () => ({
      ...state,
      registerContent,
    }),
    [state, registerContent]
  );

  console.log(state);

  return <ctx.Provider value={context}>{children}</ctx.Provider>;
};

export const Content: React.FC<ContentProps> = ({
  id,
  type = ContentType.Text,
}) => {
  const { registerContent } = useContext(ctx);

  useEffect(() => {
    const unregister = registerContent(id, type);

    return unregister;
  }, [id, type, registerContent]);

  return <></>;
};
