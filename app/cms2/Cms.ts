import { LoadedBlock } from './Block/Block';
import { Page, PageDescriptor } from './Page';

export { blocks } from './Block/Util/BlockArrayBuilder';

export const createCms = (options: CmsOptions) => new Cms(options);

type CmsOptions = {
  organization: string;
  site: string;
  apiKey: string;
};

export type LoadedPage = {
  data: {
    blocks: LoadedBlock<any>[];
  };
  schema: PageDescriptor;
};

export class Cms {
  protected options: CmsOptions;

  /**
   * Creates the CMS Client.
   */
  constructor(options: CmsOptions) {
    this.options = options;
  }

  /**
   * Registers a page in the site.
   */
  public page(id: string): Page {
    return new Page(id);
  }

  /**
   * Fetches the specified page from the CMS Backend.
   */
  public async loadPage(page: Page): Promise<LoadedPage> {
    const pageDescriptor = page.getDescriptor();

    const res = await fetch(
      `http://cms-backend.test/api/${this.options.organization}/content`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.options.apiKey}`,
        },
        body: JSON.stringify({
          site: this.options.site,
          page: pageDescriptor.id,
          blocks: pageDescriptor.blocks,
        }),
      }
    );

    const data = await res.json();

    return {
      data,
      schema: pageDescriptor,
    };
  }
}
