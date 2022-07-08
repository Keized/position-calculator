<script >
	import {preferences, simulation as simulationStore} from '../store';
	import {calculateLoss, calculateProfit} from '../formula';
	import {formatNumber} from '../helper';
	import FormGroup from '../components/Shared/FormGroup.svelte';
	import Resume from '../components/Simulator/Resume.svelte';
	import Range from '../components/Shared/Range.svelte';

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
	$: estimatedProfit = calculateProfit(simulation.entryPrice, percentProfit, simulation.positionSize, simulation.leverage);
	$: estimatedLoss = calculateLoss(simulation.entryPrice, percentLoss, simulation.positionSize, simulation.leverage);
</script>

<main>
	<h2>Trade Simulation</h2>
		<div>
			<div class="switch-container">
				<button on:click={() => simulation.short = false} class={!simulation.short && 'active'}>Long</button>
				<button on:click={() => simulation.short = true} class="short {simulation.short && 'active'}">Short</button>
			</div>

			<div>
				<Range 
					label="Leverage"
					value={simulation.leverage}
					onInput={onInput}
					name="leverage"
				/>
			</div>

			<FormGroup 
				label="Entry Price"
				name="entryPrice" 
				onInput={onInput} 
				value="{simulation.entryPrice}"
			/>

			<FormGroup 
				label="Take Profit" 
				name="takeProfit" 
				onInput={onInput} 
				value="{simulation.takeProfit}"
				hint="Gain: {formatNumber(percentProfit)} %"
			/>

			<FormGroup 
				label="Stop Loss" 
				name="stopLoss" 
				onInput={onInput} 
				value="{simulation.stopLoss}"
				hint="Loss: {formatNumber(percentLoss)} %"
			/>

			<FormGroup 
				label="Position Size" 
				name="positionSize" 
				onInput={onInput} 
				value="{simulation.positionSize}"
			/>
		</div>

		<Resume 
			estimatedProfit={estimatedProfit}
			estimatedLoss={estimatedLoss}
			capital={capital}
		/>
</main>

<style>
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