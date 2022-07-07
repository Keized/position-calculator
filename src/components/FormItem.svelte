<script>
    export let value;
    export let name;
    export let onInput;
    export let label;
    export let hint;
    export let readOnly;
</script>

<div class="form-group">
    <div>
        <label for={name}>{label}</label>
        <input
            readonly={readOnly}
            name={name} 
            value={value}
            on:input={onInput}
        />
    </div>
    {#if hint }
        <small>{hint}</small>
    {/if}
</div>

<style>
	.form-group {
		padding: .5rem 2rem;
		margin-bottom: .5rem;
	}

	.form-group label{
		margin-bottom: .5rem;
		font-weight: 700;
	}

    input {
        border-radius: .5rem;
    }

	input:read-only {
		pointer-events: none;
	}
</style>