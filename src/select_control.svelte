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
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  .select.control label {
    display: block;
    /* width: 100%; */
  }

  .select.control select {
    background-color: #111111;
    color: #AAAAAA;
    /* width: 100%; */
    text-align: center;
    flex-basis: 70%;
  }

  .select.control {
  }

  select {
    position: relative;
  }

  label {
    text-align: center;
  }
</style>
