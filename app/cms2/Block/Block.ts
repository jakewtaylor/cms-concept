export enum BlockType {
  HTML = 'html',
  Image = 'image',
  JSON = 'json',
  Markdown = 'markdown',
  Text = 'text',
}

export type BlockDescriptor<T extends BlockType> = {
  id: string;
  type: T;
};

export type LoadedBlock<T extends BlockType> = BlockDescriptor<T> & {
  content: T extends BlockType.HTML | BlockType.Markdown | BlockType.Text
    ? string
    : unknown;
};

export abstract class Block {
  protected id: string;

  abstract type: BlockType;

  public constructor(id: string) {
    this.id = id;
  }

  public getDescriptor(): BlockDescriptor<any> {
    return {
      id: this.id,
      type: this.type,
    };
  }
}
