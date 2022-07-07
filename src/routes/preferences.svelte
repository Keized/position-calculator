<script>
	import FormItem from '../components/FormItem.svelte';
import Header from '../components/Header.svelte';
	import {preferences} from '../store';

    export let currentForm;

    preferences.subscribe(value => {
        currentForm = value
	});


    function update(value, name) {
        currentForm = {...currentForm, [name]: value}
    }

    function save() {
        console.log(currentForm);
        preferences.set(currentForm);
    }
</script>

<main>
    <Header/>
    Preferences

    <FormItem 
        value={currentForm.capital} 
        name={"capital"}
        label={"capital"} 
        onInput={({target: {value}}) => update(value, "capital")}
    />

    <button on:click={save}>Save</button>
</main>