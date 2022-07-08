<script>
    import ResumeItem from "./ResumeItem.svelte";
    export let estimatedProfit
    export let estimatedLoss
    export let capital
</script>

<div class="resume">
    <div class="row">
        <ResumeItem label={"Profit"} value={estimatedProfit} symbol="$"/>
        <ResumeItem label={"Risk"} value={estimatedLoss} symbol="$"/>
        <ResumeItem label={"Capital Risk"} value={(Math.abs(estimatedLoss) * 100) / capital} symbol="%"/>
    </div>
</div>

<style>
    .resume {
		margin: 0.5rem 0;
		border-radius: .5rem;
		padding: 1rem;
		background: #00000030;
	}
</style>