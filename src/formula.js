export function calculateLoss(entryPrice, percentLoss, positionSize, leverage) {
    const assetAmount = (positionSize * leverage) / entryPrice;
    const lossPerAsset = entryPrice * (percentLoss / 100);
    return (lossPerAsset) * assetAmount;
}

export function calculateProfit(entryPrice, percentProfit, positionSize, leverage) {
    const assetAmount = (positionSize * leverage) / entryPrice;
    const profitPerAsset = entryPrice * (percentProfit / 100);
    return profitPerAsset * assetAmount;

}