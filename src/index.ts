import crypto from "crypto"

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
        return toHash
    }
}