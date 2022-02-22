import { Block, BlockType, LoadedBlock } from '../Block/Block';
import { useContent } from './CmsContext';

type Props<T extends BlockType> = {
  id: string;
  type: T;
};

export function Content<T extends BlockType>({ id, type }: Props<T>) {
  const block = useContent(id, type);

  console.log({ id, type, block });

  switch (block.type) {
    case BlockType.HTML:
      // @ts-ignore
      return <div dangerouslySetInnerHTML={{ __html: block.content }} />;

    case BlockType.Markdown:
      // @ts-ignore
      return <p>{block.content}</p>;

    case BlockType.Text:
      // @ts-ignore
      return <p>{block.content}</p>;

    default:
      return <p>no renderer</p>;
  }
}
