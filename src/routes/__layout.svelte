<script >
    import Header from '../components/Header.svelte'
</script>

<div class="layout">
    <Header />
    <slot></slot>
</div>

<style>
    .layout {
        height: 100vh;
        margin: 0 auto;
        width: 100vw;
        max-width: 500px;
        background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
    }
</style>