<script >
	import {preferences} from '../store';
	import FormItem from '../components/Shared/FormGroup.svelte';
	export let capital
	export let maxLossPerTrade
	export let currentPrice
	export let stopPrice
	
	preferences.subscribe(value => {
		capital = value.capital;
		maxLossPerTrade = value.maxLossPerTrade;
		currentPrice = value.currentPrice;
		stopPrice = value.stopPrice;
	});

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

</style>