export default class Utilities {
    constructor() { }

    static getNumber(value: string): number {
        let number: string = '';

        for (let i = 0; i < value.length; i++) {
            if (!isNaN(Number(value[i]))) {
                number += value[i];
            } else {
                break;
            }
        }

        return Number(number);
    }
}