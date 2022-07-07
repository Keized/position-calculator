<script >
	import {preferences} from '../store';
	import FormItem from '../components/FormItem.svelte';
	export let capital;
	export let maxLossPerTrade;
	export let entryPrice = 10;
	export let stopLoss = 5;
	export let takeProfit = 15;
	export let positionSize = 200;
	
	preferences.subscribe(value => {
		capital = value.capital;
		maxLossPerTrade = value.maxLossPerTrade;
	});

	function calculatePercent(entryPrice, exit) {
		return ((exit * 100) / entryPrice) - 100
	}

	function calculateLoss(entryPrice, percentLoss, positionSize) {
		return ((entryPrice * (percentLoss / 100)) - entryPrice) * (positionSize/entryPrice) + parseInt(positionSize, 10);
	}

	function calculateProfit(entryPrice, percentProfit, positionSize) {
		console.log(percentProfit)
		return ((entryPrice * percentProfit) * (positionSize/entryPrice)) / 100;
	}
 
	$: percentProfit = calculatePercent(entryPrice, takeProfit);
	$: percentLoss = calculatePercent(entryPrice, stopLoss);
	$: estimatedProfit = calculateProfit(entryPrice, percentProfit, positionSize);
	$: estimatedLoss = calculateLoss(entryPrice, percentLoss, positionSize);
</script>

<main>
	<h2>Trade Simulation</h2>
		<div>
			<FormItem 
				label="Entry Price"
				name="entryPrice" 
				onInput={({target: {value}}) => {entryPrice = value}} 
				value="{entryPrice}"
			/>

			<FormItem 
				label="Take Profit" 
				name="takeProfit" 
				onInput={({target: {value}}) => {takeProfit = value}} 
				value="{takeProfit}"
				hint="Estimated Profit: {percentProfit} %"
			/>

			<FormItem 
				label="Stop Loss" 
				name="stopLoss" 
				onInput={({target: {value}}) => {stopLoss = value}} 
				value="{stopLoss}"
				hint="Estimated Loss: {percentLoss} %"
			/>

			<FormItem 
				label="Position Size" 
				name="positionSize" 
				onInput={({target: {value}}) => {positionSize = value}} 
				value="{positionSize}"
			/>

			<div class="resume">
				<div class="row">
					<div class="div">Exit PNL: <br>{Math.round(estimatedProfit)} $</div>
					<div class="div">Risk PNL: <br>{estimatedLoss} $</div>
					<div class="div">Capital Risk: <br>{Math.round((Math.abs(estimatedLoss) * 100) / capital)} %</div>
				</div>
			</div>
		</div>
</main>

<style>
	.resume {
		margin: 0.5rem 2rem;
		border-radius: .5rem;
		padding: 1rem;
		background: #00000020;
	}
</style>