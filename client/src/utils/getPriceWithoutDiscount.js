export const getPriceWithoutDiscount = (price, discount) => {
    if(typeof price !== 'number' || !discount) {
        console.log(`Error in getPriceWithoutDiscount: price ${price}, discount ${discount}`)
        return 0
    }
    const currentPercent = 100 - discount

    return Math.floor(price / currentPercent * 100)
}