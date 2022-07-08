export function calculateLoss(entryPrice, percentLoss, positionSize) {
    const assetAmount = positionSize/entryPrice;
    const lossPerAsset = entryPrice * (percentLoss / 100);
    return (lossPerAsset) * assetAmount;
}

export function calculateProfit(entryPrice, percentProfit, positionSize) {
    const assetAmount = positionSize/entryPrice;
    const profitPerAsset = entryPrice * (percentProfit / 100);
    return profitPerAsset * assetAmount;

}