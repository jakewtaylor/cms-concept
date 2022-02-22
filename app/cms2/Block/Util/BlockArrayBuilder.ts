import { Block } from '../Block';
import { BlockFactory } from './BlockFactory';

export class BlockArrayBuilder {
  protected blocks: Block[] = [];

  public getBlocks() {
    return this.blocks;
  }

  public html(id: string) {
    this.blocks.push(BlockFactory.html(id));

    return this;
  }

  public image(id: string) {
    this.blocks.push(BlockFactory.image(id));

    return this;
  }

  public json(id: string) {
    this.blocks.push(BlockFactory.json(id));

    return this;
  }

  public markdown(id: string) {
    this.blocks.push(BlockFactory.markdown(id));

    return this;
  }

  public text(id: string) {
    this.blocks.push(BlockFactory.text(id));

    return this;
  }
}

export const blocks = () => new BlockArrayBuilder();
