<template>
  <div class="grid">
    <div class="cell">1</div>
    <div class="cell">2</div>
    <div class="cell">3</div>
    <div class="cell">4</div>
    <div class="cell">5</div>
    <div class="cell">6</div>
    <div class="cell">7</div>
    <div class="cell">8</div>
    <div class="cell">9</div>
    <div class="cell">10</div>
    <div class="cell">11</div>
    <div class="cell">12</div>
    <div class="cell">13</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: 100%;
    .cell {
      background-color: azure;
    }
    .cell:nth-child(odd) {
      background-color: aquamarine;
    }
  }
</style>
