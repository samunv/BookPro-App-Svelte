<script>
  import { fade } from "svelte/transition";
</script>

<div id="overlay" class="overlay" transition:fade={{ duration: 200 }}></div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.725);

    z-index: 1200;
  }
</style>
