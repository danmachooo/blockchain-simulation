import { Block } from "./Block.js";

export class Blockchain {
  constructor() {
    //Initialize the chain.
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, [{ type: "GENESIS" }], "0");
  }

  getLatestBlock() {
    //Return the latest block from the chain
    return this.chain[this.chain.length - 1];
  }

  addBlock(transactions) {
    //Create new transactions and add it to the block
    const newBlock = new Block(
      this.chain.length,
      transactions,
      this.getLatestBlock().hash
    );
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }

    return true;
  }
}
