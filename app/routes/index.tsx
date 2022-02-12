import { LoaderFunction, useLoaderData } from 'remix';
import cms from '~/cms';
import { ContentType } from '~/cms/Outlet';

const page = cms.page('home');

export const loader: LoaderFunction = () => {
  return {
    test: 'yeet',
  };
};

export default function Index() {
  const data = useLoaderData();

  console.log(data);

  return (
    <div>
      <h1>Welcome to Remix</h1>

      <page.CmsOutlet name="intro" type={ContentType.Text} />
    </div>
  );
}
