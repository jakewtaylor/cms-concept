import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { ContentType } from './Outlet';

type Content = {
  name: string;
  type: ContentType;
};

type Page = {
  name: string;
  content: Record<string, Content>;
};

type State = {
  pages: Record<string, Page>;
};

type Action =
  | { type: 'registerPage'; payload: string }
  | { type: 'registerContent'; payload: { page: string; content: Content } }
  | { type: 'unregisterContent'; payload: { page: string; name: string } };

type Context = State & {
  registerPage(name: string): void;
  registerContent(page: string, name: string, type: ContentType): void;
  unregisterContent(page: string, name: string): void;
};

const CmsContext = createContext<Context>(null as any);

export const useCmsContext = () => useContext(CmsContext);

const reducer = (state: State, action: Action): State => {
  console.log('action: ', action);
  switch (action.type) {
    case 'registerPage': {
      const page = action.payload;

      // Dont reregister if we already know about this page
      if (state.pages[page]) {
        return state;
      }

      return {
        ...state,
        pages: {
          ...state.pages,
          [page]: {
            name: page,
            content: {},
          },
        },
      };
    }

    case 'registerContent': {
      const { page, content } = action.payload;

      if (!state.pages[page]) {
        console.warn(
          'Tried registering a field for a nonexistent page, abandoning.'
        );
        return state;
      }

      return {
        ...state,
        pages: {
          ...state.pages,
          [page]: {
            ...state.pages[page],
            content: {
              ...state.pages[page].content,
              [content.name]: content,
            },
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

const initial = { pages: {} };

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  console.log(state);

  const registerPage = useCallback(
    (name: string) => {
      dispatch({
        type: 'registerPage',
        payload: name,
      });
    },
    [dispatch]
  );

  const registerContent = useCallback(
    (page: string, name: string, type: ContentType) => {
      dispatch({
        type: 'registerContent',
        payload: {
          page,
          content: {
            name,
            type,
          },
        },
      });
    },
    [dispatch]
  );

  const unregisterContent = useCallback(
    (page: string, name: string) => {
      dispatch({
        type: 'unregisterContent',
        payload: {
          page,
          name,
        },
      });
    },
    [dispatch]
  );

  const context = useMemo<Context>(
    () => ({ ...state, registerPage, registerContent, unregisterContent }),
    [state, registerPage, registerContent, unregisterContent]
  );

  return <CmsContext.Provider value={context}>{children}</CmsContext.Provider>;
};
