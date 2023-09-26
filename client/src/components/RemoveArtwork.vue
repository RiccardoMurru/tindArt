<script setup lang="ts">
  const emits = defineEmits(['close-notification', 'remove-artwork']);

  function removeArtwork() {
    emits('remove-artwork');
  }

  function closeNotification() {
    emits('close-notification');
  }
</script>

<template>
  <div class="remove-artwork">
    <div class="controls">
      <button class="icon-keep" @click="closeNotification">Keep</button>
      <button class="icon-remove" @click="removeArtwork">Remove</button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .remove-artwork {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: var(--secondaryBackground);
    border-radius: 10px;
  }
  .controls {
    display: flex;
    justify-content: center;
    gap: 50px;
  }
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
    line-height: 1.2;
    font-weight: 600;
    font-size: 16px;
  }
  .icon-keep {
    &::before {
      content: '\e86c';
      font-size: 30px;
    }
  }
  .icon-remove {
    &::before {
      content: '\e5c9';
      font-size: 30px;
    }
  }
</style>
