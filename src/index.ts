import crypto from "crypto"
import { isDataView } from "util/types"

interface BlockShape {
    hash : string,
    preHash : string,
    height : number,
    data : string
}

class Block implements BlockShape {
    public hash : string

    constructor(
        public preHash : string,
        public height : number,
        public data : string,
    ){
        this.hash = Block.calculate(preHash, height, data)
    }

    static calculate(preHash : string, height : number, data : string):string{
        const toHash = `${preHash}${height}${data}`

        return crypto.createHash("sha256").update(toHash).digest('hex')
    }
}

class BlockChain {
    private blocks : Block[]

    constructor (){
        this.blocks = []
    }
    private getPrevHash() : string{
        if(this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length -1].hash
    }
    public addBlock(data : string){
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data)
        this.blocks.push(newBlock)
    }
    public getBlocks(){

        // prevent Hacking!!
        return [...this.blocks]
    }
}

const blockChain = new BlockChain()
blockChain.addBlock('First one')
blockChain.addBlock('Second one')
blockChain.addBlock('Third one')

// This will not be added in the block chain
blockChain.getBlocks().push(new Block("xxxx", 23, "HACKEDDD"))

console.log(blockChain.getBlocks())
