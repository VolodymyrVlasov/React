const discountPoints = [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000]

export const getPriceIndexByAmount = amount => {
    return discountPoints.findIndex((discountPoint, index) => {
        if (amount <= discountPoint) {
            return true
        } else if (amount >= discountPoints[discountPoints.length - 1] && index === discountPoints.length - 1) {
            return true
        }
    })
}
