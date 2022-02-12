import { LoaderFunction, useLoaderData } from 'remix';
import cms from '~/cms';
import { ContentType } from '~/cms/Outlet';

const page = cms.page('about');

export const loader: LoaderFunction = () => {
  return {};
};

export default function About() {
  const data = useLoaderData();

  console.log(data);

  return (
    <div>
      <h1>About</h1>

      <page.CmsOutlet name="intro" type={ContentType.Text} />
    </div>
  );
}
