<script >
	import {preferences, simulation as simulationStore} from '../store';
	import FormItem from '../components/FormItem.svelte';
	import {calculateLoss, calculateProfit} from '../formula';
	import {formatNumber} from '../helper';
import ResumeItem from '../components/ResumeItem.svelte';

	export let capital;
	export let maxLossPerTrade;
	export let simulation;

	preferences.subscribe(value => {
		capital = value.capital;
		maxLossPerTrade = value.maxLossPerTrade;
	});

	simulationStore.subscribe(value => {
		simulation = value
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

	function onInput({target}) {
		simulation[target.name] = target.value
	}
 
	$: percentProfit = calculatePercent(simulation.entryPrice, simulation.takeProfit, simulation.short);
	$: percentLoss = calculatePercent(simulation.entryPrice, simulation.stopLoss, simulation.short);
	$: estimatedProfit = calculateProfit(simulation.entryPrice, percentProfit, simulation.positionSize);
	$: estimatedLoss = calculateLoss(simulation.entryPrice, percentLoss, simulation.positionSize);
</script>

<main>
	<h2>Trade Simulation</h2>
		<div>
			<div class="switch-container">
				<button on:click={() => simulation.short = false} class={!simulation.short && 'active'}>Long</button>
				<button on:click={() => simulation.short = true} class="short {simulation.short && 'active'}">Short</button>
			</div>

			<FormItem 
				label="Entry Price"
				name="entryPrice" 
				onInput={onInput} 
				value="{simulation.entryPrice}"
			/>

			<FormItem 
				label="Take Profit" 
				name="takeProfit" 
				onInput={onInput} 
				value="{simulation.takeProfit}"
				hint="Estimated Profit: {formatNumber(percentProfit)} %"
			/>

			<FormItem 
				label="Stop Loss" 
				name="stopLoss" 
				onInput={onInput} 
				value="{simulation.stopLoss}"
				hint="Estimated Loss: {formatNumber(percentLoss)} %"
			/>

			<FormItem 
				label="Position Size" 
				name="positionSize" 
				onInput={onInput} 
				value="{simulation.positionSize}"
			/>

			<div class="resume">
				<div class="row">
					<ResumeItem label={"Profit"} value={estimatedProfit} symbol="$"/>
					<ResumeItem label={"Risk"} value={estimatedLoss} symbol="$"/>
					<ResumeItem label={"Capital Risk"} value={(Math.abs(estimatedLoss) * 100) / capital} symbol="%"/>
				</div>
			</div>
		</div>
</main>

<style>
	.resume {
		margin: 0.5rem 0;
		border-radius: .5rem;
		padding: 1rem;
		background: #00000030;
	}

	.switch-container {
		margin-bottom: 1rem;
		display: flex;
	}

	.switch-container button {
		padding: .5rem 2rem;
		font-weight: 700;
		background: none;
		border: none;
		border-bottom: 3px solid green;
		color: white;
		opacity: .5;
		outline: none;
		flex: 1;
	}

	.switch-container button.short {
		border-color: red;
	}

	.switch-container button.active {
		opacity: 1;
	}
</style>