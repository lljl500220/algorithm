export class tdArray {
    array: number[][] = []

    constructor(h: number, w: number) {
        for (let i = 0; i < h; i++) {
            this.array.push([])
            for (let j = 0; j < w; j++) {
                this.array[i].push(0)
            }
        }
    }

    get() {
        return this.array
    }

    set(h: number, w: number) {
        this.array = []
        for (let i = 0; i < h; i++) {
            this.array.push([])
            for (let j = 0; j < w; j++) {
                this.array[i].push(0)
            }
        }
    }
}

export declare type tdArr = []
