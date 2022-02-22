import { useState } from 'react';
import { LoadedPage } from '../Cms';
import { CmsContext } from './CmsContext';

type Props = {
  page: LoadedPage;
};

export const Page: React.FC<Props> = ({ page, children }) => {
  const [pageState, setPageState] = useState(page);

  return (
    <CmsContext.Provider value={{ page: pageState }}>
      {children}
    </CmsContext.Provider>
  );
};
