import { Provider } from './Context';
import { createOutlet } from './Outlet';

type Page = {
  CmsOutlet: ReturnType<typeof createOutlet>;
};

type Cms = {
  Provider: typeof Provider;
  page: (name: string) => Page;
};

const cms: Cms = {
  Provider,

  page(name: string): Page {
    const CmsOutlet = createOutlet(name);

    return { CmsOutlet };
  },
};

export default cms;
