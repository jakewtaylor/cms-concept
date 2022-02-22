import { Block, BlockDescriptor } from './Block/Block';
import { BlockArrayBuilder } from './Block/Util/BlockArrayBuilder';

export type PageDescriptor = {
  id: string;
  blocks: BlockDescriptor<any>[];
};

export class Page {
  /**
   * Unique ID For the page.
   */
  protected id: string;

  /**
   * All the blocks within this page.
   */
  protected blocks: Block[] = [];

  /**
   * Constructs the Page
   *
   * @param id  Unique ID for the page.
   */
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Adds the provided blocks to the page.
   *
   * @param blocks  blocks to be added to the page
   */
  public with(blocks: Block[] | BlockArrayBuilder) {
    if (blocks instanceof BlockArrayBuilder) {
      this.blocks.push(...blocks.getBlocks());
    } else {
      this.blocks.push(...blocks);
    }

    return this;
  }

  public getDescriptor(): PageDescriptor {
    const blocks = this.blocks.map((block) => block.getDescriptor());

    return {
      id: this.id,
      blocks,
    };
  }
}
