import { Link, LoaderFunction, useLoaderData } from 'remix';
import { BlockType } from '~/cms2/Block/Block';
import { createCms, blocks, LoadedPage } from '~/cms2/Cms';
import { Content } from '~/cms2/react/Content';
import { Page } from '~/cms2/react/Page';

const cms = createCms({
  organization: 'will-inc',
  site: 'test-site',
  apiKey: '2|sF4uPC7jLG2xg4NTwbBXW3E6loIjhSzAOaIjFkLy',
});

const pageSchema = cms
  .page('home')
  .with(
    blocks()
      .text('title')
      .text('welcome_message')
      .html('custom_banner')
      .markdown('main_content')
  );

type LoaderData = {
  page: LoadedPage;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const page = await cms.loadPage(pageSchema);

  return {
    page,
  };
};

export default function Index() {
  const { page } = useLoaderData<LoaderData>();

  return (
    <Page page={page}>
      <div>
        <h1>Welcome to Remix</h1>

        {/* <pre>{JSON.stringify(page, null, 4)}</pre> */}

        <Link to="/about">Go to about</Link>

        <h3>Markdown block:</h3>
        <Content id="main_content" type={BlockType.Markdown} />

        <h3>Text block:</h3>
        <Content id="title" type={BlockType.Text} />

        <h3>HTML block:</h3>
        <Content id="custom_banner" type={BlockType.HTML} />
      </div>
    </Page>
  );
}
