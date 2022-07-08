<script>
    import {formatNumber} from '../helper';

    export let label = '';
    export let value = '';
</script>

<div class="div">
    <small>{label}:</small>
    <br>
    <b>{formatNumber(value)} $</b>
</div>
