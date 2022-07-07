<script >
	import {preferences} from '../store';
	import FormItem from '../components/FormItem.svelte';
	export let capital;
	export let maxLossPerTrade;
	export let entryPrice = 10;
	export let stopLoss = 5;
	export let takeProfit = 15;
	export let positionSize = 200;
	export let short = false;
	
	preferences.subscribe(value => {
		capital = value.capital;
		maxLossPerTrade = value.maxLossPerTrade;
	});

	function calculatePercent(entryPrice, exit, short) {
		let percent = (exit * 100) / entryPrice;

		if (!short) {
			percent = percent - 100;
		} else {
			percent = 100 - percent;
		}

		return percent;
	}

	function calculateLoss(entryPrice, percentLoss, positionSize) {
		return ((entryPrice * (percentLoss / 100)) - entryPrice) * (positionSize/entryPrice) + parseInt(positionSize, 10);
	}

	function calculateProfit(entryPrice, percentProfit, positionSize) {
		return ((entryPrice * percentProfit) * (positionSize/entryPrice)) / 100;
	}
 
	$: percentProfit = calculatePercent(entryPrice, takeProfit, short);
	$: percentLoss = calculatePercent(entryPrice, stopLoss, short);
	$: estimatedProfit = calculateProfit(entryPrice, percentProfit, positionSize);
	$: estimatedLoss = calculateLoss(entryPrice, percentLoss, positionSize);
</script>

<main>
	<h2>Trade Simulation</h2>
		<div>
			<div class="switch-container">
				<button on:click={() => short = false} class={!short && 'active'}>Long</button>
				<button on:click={() => short = true} class="short {short && 'active'}">Short</button>
			</div>

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
					<div class="div">Profit: <br>{Math.round(estimatedProfit)} $</div>
					<div class="div">Risk: <br>{Math.round(estimatedLoss)} $</div>
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

	.switch-container {
		margin: 0 1rem;
		padding: 0 1rem;
		display: flex;
	}

	.switch-container button {
		font-weight: 700;
		border-radius: .5rem 0 0 .5rem;
		opacity: .5;
		outline: none;
		color: white;
		background-color: green;
		border: none;
	}

	.switch-container button.short {
		background-color: red;
		border-radius: 0 .5rem .5rem 0;

	}

	.switch-container button.active {
		opacity: 1;
	}
</style>