const discountPoints = [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000]
const enumNames = {
    PICKUP: "Selfpick",
    NOVA_POSHTA: "Nova poshta",
    UKLON: "Uklon",
    NEW: "New",
    IN_PROGRESS: "In progress",
    DONE: "Done",
    FINISHED: "Finished",
    CASH_P: "Cash (Smolov)",
    CASH_V: "Cash (Vlasov)",
    IBAN_P: "IBAN (Smolov)",
    IBAN_V: "IBAN (Vlasov)",
    POS_P: "POS-P",
    POS_V: "POS-V",
    LIQPAY: "LiqPay",
    MUG: "Cups",
    DIGITAL_PRINT: "Digital printing",
    CANVAS: "Canvas",
    SERVICE: "Service",
    BIZ_CARD: "Business cards",
    POSTER: "Posters",
    BLUEPRINT: "Blueprints",
    PHOTO: "Photos",
    CALENDAR: "Calendars",
    BOX: "Boxes",
    DIGITAL_STICKER: "Digital stickers",
    VINYL_STICKER: "Vinyl stickers",
    STICKER_PACK: "Stickerpacks",
    MANAGER: "Manager",
    MAKER: "Maker",
    CUSTOMER: "Customer",
    LOYAL_CUSTOMER: "Loyal customer"
}

export const getPriceIndexByAmount = amount => {
    return discountPoints.findIndex((discountPoint, index) => {
        if (amount <= discountPoint) {
            return true
        } else if (amount >= discountPoints[discountPoints.length - 1] && index === discountPoints.length - 1) {
            return true
        }
    })
}

export const getEnumNames = (enumList) => {
    return enumList?.map(element => Object.entries(enumNames)
        .filter(obj => obj[0] === element))
        .map(arr => ({type: arr[0][0], name: arr[0][1]}))
}
