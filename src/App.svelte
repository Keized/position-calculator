<script >
	import FormItem from './FormItem.svelte';
	export let capital = 1000;
	export let maxLossPerTrade = 1;

	export let currentPrice = 2;
	export let stopPrice = 1;	

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
	<h2>Position Calculator</h2>
		<div>
			<FormItem 
				label="Capital" 
				name="capital" 
				onInput={({target: {value}}) => {capital = value}} 
				value="{capital}" 
			/>
		
			<FormItem 
				label="Risk (%)" 
				name="maxLossPerTrade" 
				onInput={({target: {value}}) => {maxLossPerTrade = value}} 
				value="{maxLossPerTrade}" 
				hint="Risk Amount: {capital * (maxLossPerTrade / 100)}"
			/>

			<FormItem 
				label="Current Price"
				name="currentPrice" 
				onInput={({target: {value}}) => {currentPrice = value}} 
				value="{currentPrice}"
			/>

			<FormItem 
				label="Stop Price" 
				name="stopPrice" 
				onInput={({target: {value}}) => {stopPrice = value}} 
				value="{stopPrice}"
			/>

			<FormItem 
				label="Position Size ($)" 
				readOnly={true}
				name="total" 
				onInput={() => {}} 
				value="{total}"
			/>
		</div>
</main>

<style>
	h2 {
		text-align: center;
	}

	main {
		padding: 1em;
		margin: 0 auto;
		background-color: #FAFAFA;
		border-radius: 1rem;
		width: fit-content;
	}
</style>