<script>
    export let type = 'text';
    export let value;
    export let name;
    export let onInput;
</script>

<input value={value} name={name} on:input={onInput} type={type}>

<style>
    input {
	font-weight: 700;
	outline: none;
	border: none;
	color: white;
	background-color: transparent;
	border-bottom: 2px solid #FFFFFF80;
	padding: .5rem 0;
	width: -webkit-fill-available;
	font-family: inherit;
	font-size: inherit;
}

input:disabled {
    color: #ccc;
}

input:focus {
    border-color: #FFFFFF;
}
</style>