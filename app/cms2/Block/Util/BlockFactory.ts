import { BlockType } from '../Block';
import { HtmlBlock } from '../HtmlBlock';
import { ImageBlock } from '../ImageBlock';
import { JsonBlock } from '../JsonBlock';
import { MarkdownBlock } from '../MarkdownBlock';
import { TextBlock } from '../TextBlock';

const classMap = {
  [BlockType.HTML]: HtmlBlock,
  [BlockType.Image]: ImageBlock,
  [BlockType.JSON]: JsonBlock,
  [BlockType.Markdown]: MarkdownBlock,
  [BlockType.Text]: TextBlock,
};

type ClassMap = typeof classMap;

type Tuples<T = BlockType> = T extends BlockType
  ? [
      T,
      InstanceType<ClassMap[T]>,
      InstanceType<typeof classMap[T]> extends { init: (a: infer P) => any }
        ? P
        : never
    ]
  : never;

type ClassType<T> = Extract<Tuples, [T, any, any]>[1];

export class BlockFactory {
  public static make<T extends BlockType>(id: string, type: T): ClassType<T> {
    const clazz: ClassMap[T] = classMap[type];

    return new clazz(id);
  }

  public static html(id: string) {
    return this.make(id, BlockType.HTML);
  }

  public static image(id: string) {
    return this.make(id, BlockType.Image);
  }

  public static json(id: string) {
    return this.make(id, BlockType.JSON);
  }

  public static markdown(id: string) {
    return this.make(id, BlockType.Markdown);
  }

  public static text(id: string) {
    return this.make(id, BlockType.Text);
  }
}
