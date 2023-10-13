<script lang="ts">
  import type { RangeParameters } from './lib/ranges';

  export let name: string;
  export let label: string;
  export let rangeParameters: RangeParameters;
  export let disabled: boolean = false;
  export let value = rangeParameters?.default;
  export let onChange: ((...args: any) => any) = () => {};

  const listName = `${name}_list`;
</script>

<div class="{name} control">
  <label for="{name}">{label}</label>
  <div class="input_with_markers">
    <input bind:value={value} on:input={(e) => onChange(e.currentTarget.value)} disabled={disabled} type="range" id={name} name={name} min={rangeParameters.min} max={rangeParameters.max} step={rangeParameters.step} list={listName}/>

    <datalist id={listName}>
      {#each (rangeParameters.list || []) as listEntry}
        <option value="{listEntry.value}">{listEntry.label}</option>
      {/each}
    </datalist>
  </div>
</div>

<style>
  .control {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0.5em;
    padding-right: 0.5em;
    /* width: min(max(100px, 60vw), 500px); */
  }

  label {
    display: block;
    text-align: center;
    flex-grow: 1;
    flex-shrink: 1;
  }

  @media (max-width: 800px) {
    label {
      /* font-size: small; */
    }
  }

  .input_with_markers {
    width: 100%;
  }

  input {
    display: block;
    margin: auto;
    width: 100%;
    text-align: center;
    flex-basis: 100%;
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

  @media only screen and (max-width: 480px) {
    datalist {
      display: none;
    }
  }

</style>
