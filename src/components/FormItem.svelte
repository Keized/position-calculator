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
            autocomplete="off"
            on:input={onInput}
        />
    </div>
    {#if hint }
        <small>{hint}</small>
    {/if}
</div>

<style>

</style>