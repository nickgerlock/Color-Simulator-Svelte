<script lang="ts">
  import type { RangeParameters } from './lib/ranges';

  export let name: string;
  export let label: string;
  export let rangeParameters: RangeParameters;
  export let value = rangeParameters?.default;
  const listName = `${name}_list`;
</script>

  <div class="{name} control">
    <label for="{name}">{label}</label>
    <input bind:value={value} type="range" id={name} name={name} min={rangeParameters.min} max={rangeParameters.max} step={rangeParameters.step} list={listName}/>

    <datalist id={listName}>
      {#each (rangeParameters.list || []) as listEntry}
        <option value="{listEntry.value}">{listEntry.label}</option>
      {/each}
    </datalist>
  </div>

<style>
  .control {
    margin: auto;
    margin-top: 1em;
    width: min(max(200px, 60vw), 500px);
  }

  label {
    display: block;
    text-align: center;
  }

  input {
    display: block;
    margin: auto;
    width: 100%;
  }

  datalist {
    display: flex;
    justify-content: space-between;
    font-size: small;
    width: 100%;
    margin: auto;
  }

  option {
    padding: 0;
  }

</style>
