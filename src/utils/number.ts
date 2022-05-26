export const reduceNumberLength = (n: number) => {
    const len = n.toString().length;
    if(len >= 9) return `${n / 100000000}억`;
    else if(len >= 5) return `${n / 10000}억`;
    else if(len >= 4) return `${n / 1000}억`;
    else return n;
}