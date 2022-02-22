import { Link, LoaderFunction, useLoaderData } from 'remix';
import { loadCmsData, Area, Content } from '~/cms';

export const loader: LoaderFunction = async () => {
  return {
    data: await loadCmsData('about'),
  };
};

export default function About() {
  const data = useLoaderData();

  console.log(data);

  return (
    <Area id="about">
      <div>
        <h1>About</h1>

        <Content id="intro" />

        <Link to="/">Go to home</Link>
      </div>
    </Area>
  );
}
