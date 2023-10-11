<template>
  <div>
    <div v-draggable class="drag">拖拽</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .drag {
    width: 200px;
    height: 200px;
    position: fixed;
    top: 200px;
    background-color: aquamarine;
  }
</style>
