export default function pricePrettify (num) {
    if(num === null || num === undefined) {
        console.log('Неккоректная цена')
        return 0
    }

    var n = num.toString();
    var separator = " ";
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
}