<script>
	import FormItem from '../components/FormItem.svelte';
	import {preferences} from '../store';

    export let currentForm;

    preferences.subscribe(value => {
        currentForm = value
	});

    function update(value, name) {
        currentForm = {...currentForm, [name]: value}
    }

    function save() {
        preferences.set(currentForm);
    }
</script>

<main>
	<h2>Preferences</h2>

    <FormItem 
        value={currentForm.capital} 
        name={"capital"}
        label={"capital"} 
        onInput={({target: {value}}) => update(value, "capital")}
    />


    <div class="button-container">
        <button on:click={save}>Save</button>
    </div>
</main>

<style>
    .button-container {
        padding: 0.5rem 2rem;
        margin-bottom: 0.5rem;
    }

    button {
        border-radius: .5rem;
    }
</style>