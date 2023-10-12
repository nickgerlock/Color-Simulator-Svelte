<script lang="ts">
  export let name: string;
  export let checked: boolean;
  export let label: string;
</script>

<div class="{name} checkbox control">
  <div class="wrapper">
    <label for="glow">{label}</label>
    <input bind:checked={checked} type="checkbox" id={name} name={name}/>
  </div>
</div>

<style>
  .control .wrapper {
    display: flex;
    margin: auto;
    width: 14em;
    box-sizing: border-box;
  }

  label {
    flex-grow: 1;
  }

  .control input {
    margin: auto;
    width: 1.5em;
    height: 1.5em;
    position: relative;
    float: right;
  }
</style>
