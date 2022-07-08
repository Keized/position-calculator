<script>
    import Input from './Input.svelte';

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
        <Input 
            readonly={readOnly}
            name={name} 
            value={value}
            autocomplete="off"
            onInput={onInput}
        />
    </div>
    {#if hint }
        <small>{hint}</small>
    {/if}
</div>

<style>
    .form-group {
        padding: .5rem 0;
        margin-bottom: .5rem;
    }

    .form-group label{
        font-size: .8rem;
    }
</style>