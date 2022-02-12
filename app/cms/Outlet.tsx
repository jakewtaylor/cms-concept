import React, { useEffect } from 'react';
import { useCmsContext } from './Context';

export enum ContentType {
  Text = 'Text',
  HTML = 'HTML',
}

type ContentTypeMap = {
  [ContentType.Text]: string;
  [ContentType.HTML]: string;
};

export type CmsOutletProps<T extends ContentType> = {
  name: string;
  type: T;
};

export const createOutlet = (page: string) => {
  return function CmsOutlet<T extends ContentType>({
    name,
    type,
  }: CmsOutletProps<T>) {
    const { registerPage, registerContent, unregisterContent } =
      useCmsContext();

    useEffect(() => {
      registerPage(page);
    }, [registerPage]);

    useEffect(() => {
      registerContent(page, name, type);

      return () => {
        unregisterContent(page, name);
      };
    }, [registerContent, unregisterContent, name, type]);

    return <></>;
  };
};
