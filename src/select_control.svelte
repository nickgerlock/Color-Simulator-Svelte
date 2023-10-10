<script lang="ts" generics="T">
  // export type SelectOption = {label: string, value: T};

  export let name: string;
  export let label: string;
  export let disabled: boolean = false;
  export let value: T | undefined = undefined;
  export let options: {label: string, value: T}[];
  export let onChange: ((...args: any) => any) = () => {};
</script>

<div class="{name} select control">
  <div class="wrapper">
    <label for={name}>{label}</label>
    <select disabled={disabled} bind:value={value} on:input={(e) => onChange(e.currentTarget.value)} name="mode">
      {#each options as option}
        <option value={option.value}>
          {option.label}
        </option>
      {/each}
    </select>
  </div>
</div>

<style>
  .select.control label {
    display: block;
    width: 100%;
  }

  .select.control select {
    background-color: #111111;
    color: #AAAAAA;
    display: block;
    width: 100%;
    text-align: center;
  }

  .select.control {
    margin-bottom: 2em;
  }

  select {
    margin: auto;
    position: relative;
    top: 4px;
    float: right;
  }

  label {
    text-align: center;
  }
</style>
