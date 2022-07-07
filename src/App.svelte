<script >
	export let capital = 1000;
	export let maxLossPerTrade = 1;

	export let currentPrice = 1.2552;
	export let stopPrice = 1.208;	

	function calculatePositionSize(capital, maxLossPerTrade, currentPrice, stopPrice) {
		const assetMaxLoss = capital * (maxLossPerTrade / 100);
		const diff = currentPrice - stopPrice;
		const assetPositionSize = assetMaxLoss / diff;
		const currencyPositionSize = assetPositionSize * currentPrice
		return currencyPositionSize;
	}

	$: total = calculatePositionSize(capital, maxLossPerTrade, currentPrice, stopPrice);
</script>

<main>
	<div>
		<div>
			<div class="form-group">
				<label for="capital">Capital</label>
				<input
					name="capital" 
					value={capital}
				 	on:input={({target: {value}}) => {capital = value}}
				>
			</div>
			<div class="form-group">
				<label for="maxLossPerTrade">Risk (%)</label>
				<input 
					name="maxLossPerTrade" 
					value={maxLossPerTrade}
				 	on:input={({target: {value}}) => {maxLossPerTrade = value}}
				>
			</div>

			<div class="form-group">
				<label for="currentPrice">Current Price</label>
				<input
					name="currentPrice" 
					value={currentPrice}
					on:input={({target: {value}}) => {currentPrice = value}}
				/>
			</div>

			<div class="form-group">
				<label for="stopPrice">Stop Price</label>
				<input
					name="stopPrice" 
					value={stopPrice}
					on:input={({target: {value}}) => {stopPrice = value}}
				/>
			</div>
		</div>
	</div>

	<div class="">
		<label for="total">Position Size</label>
		<input
			readonly
			name="total" 
			value="{total} €"
		/>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>