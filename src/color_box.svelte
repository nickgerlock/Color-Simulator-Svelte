<div class="color_box">
  <div class="layer layer_1">
    <div class="layer layer_2">
      <div class="layer layer_3">
      </div>
    </div>
  </div>
</div>

<style>
  .color_box {
    display: block;
    aspect-ratio: 1;
    width: 100%;
    flex-grow: 1;
  }
  .color_box .layer {
    margin: auto;
    aspect-ratio: 1;
    background-color: var(--color1, #ddd);
    display: flex;
  }
  .color_box .layer_1 {
    background-color: var(--color1, #ddd);
  }
  .color_box .layer_2 {
    width: 75%;
    background-color: var(--color2, #ddd);
  }
  .color_box .layer_3 {
    width: 50%;
    background-color: var(--color3, #ddd);
  }
</style>
