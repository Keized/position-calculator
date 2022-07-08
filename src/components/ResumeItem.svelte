<script>
    import {formatNumber} from '../helper';

    export let label = '';
    export let value = '';
    export let symbol = '';
</script>

<div class="div">
    <small>{label}:</small>
    <br>
    <b>{formatNumber(value)} {symbol}</b>
</div>
