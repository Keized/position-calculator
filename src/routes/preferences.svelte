<script>
	import FormGroup from '../components/Shared/FormGroup.svelte';
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

    <FormGroup 
        value={currentForm.capital} 
        name={"capital"}
        label={"capital"} 
        onInput={({target: {value}}) => update(value, "capital")}
    />


    <div class="button-container">
        <button on:click={save}>Save</button>
    </div>

    <a href="https://www.buymeacoffee.com/keized" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
</main>

<style>
    .button-container {
        margin-bottom: 0.5rem;
    }

    a {
        transform: scale(.8);
        position: fixed;
        bottom: 1rem;
        right: 1rem;
    }

    button {
        width: 100%;
        border: 2px solid white;
        background: transparent;
        color: white;
        font-weight: 700;
        padding: .5rem 2rem;
    }
</style>