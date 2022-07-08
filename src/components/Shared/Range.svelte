<script>
    export let value = 1;
    export let min = 1;
    export let max = 100;
    export let onInput;
    export let name;
    export let label;
</script>


<div class="form-group">
    <label for={name}>{label}</label>
    <input type="range" min={min} max={max} on:input={onInput} name={name} value={value}>
    <small>{value}x</small>
</div>

<style>
    input {
        width: 100%;
        margin-top: .5rem;
    }

    .form-group {
        padding: 0.5rem 0;
        margin-bottom: 0.5rem;
    }

    .form-group label{
        font-size: smaller;
    }
</style>