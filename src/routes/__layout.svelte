<script >
    import Header from '../components/Header.svelte'
</script>

<div class="layout">
    <Header />
    <slot></slot>
</div>

<style>
    .layout {
        padding: 0 2rem 2rem 2rem;
        min-height: 100vh;
        margin: 0 auto;
        max-width: 500px;
        background: linear-gradient(-60deg, rgb(60, 41, 136) 0%, rgba(0,0,0,1) 100%);
    }
</style>