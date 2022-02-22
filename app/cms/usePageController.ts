import { useCallback, useReducer } from 'react';
import { ContentType } from './types';

export type PageState = {
  name: string;
  content: Record<string, ContentType>;
};

type Action =
  | {
      type: 'registerContent';
      payload: { id: string; type: ContentType };
    }
  | {
      type: 'unregisterContent';
      payload: string;
    };

const reducer = (state: PageState, action: Action): PageState => {
  switch (action.type) {
    case 'registerContent': {
      const { id, type } = action.payload;

      if (state.content[id]) {
        console.error(
          `Attempted to register 2 contents with the same ID ('${id}') for page '${state.name}', the newest version has been ignored.`
        );
        return state;
      }

      return {
        ...state,
        content: {
          ...state.content,
          [id]: type,
        },
      };
    }

    case 'unregisterContent':
      const id = action.payload;
      const { [id]: remove, ...content } = state.content;

      return {
        ...state,
        content,
      };

    default:
      return state;
  }
};

export const usePageController = (name: string) => {
  const [state, dispatch] = useReducer(reducer, { name, content: {} });

  const registerContent = useCallback(
    (id: string, type: ContentType) => {
      dispatch({
        type: 'registerContent',
        payload: { id, type },
      });

      return () => unregisterContent(id);
    },
    [dispatch]
  );

  const unregisterContent = useCallback(
    (id: string) => {
      dispatch({
        type: 'unregisterContent',
        payload: id,
      });
    },
    [dispatch]
  );

  return { state, registerContent };
};
