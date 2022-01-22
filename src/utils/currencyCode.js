export function getCurrencyCode(currencyString){
    if(currencyString.includes("USD")){
        return "$"
    }
    else if(currencyString.includes("KRW")){
        return "₩"
    }
    else if(currencyString.includes("JPY")){
        return "¥"
    }
}

export const finalizeAmount = (amount, currencyCode, currencyCodeIncluded) => {
    return new Intl.NumberFormat(currencyCode == "USD" ? 'en-US' : currencyCode == "JPY" ? "ja-JP" : currencyCode == "KRW" ? "ko-KR" : "en-US" , {style: 'currency', currency: currencyCode}).format( currencyCodeIncluded ? amount.slice(0,-3) : amount )
}