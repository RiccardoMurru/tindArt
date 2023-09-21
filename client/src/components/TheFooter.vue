<script setup lang="ts"></script>

<template>
  <footer>
    <span class="icon-settings"></span>
    <span class="icon-home"></span>
    <span class="icon-gallery"></span>
  </footer>
</template>

<style lang="postcss" scoped>
  footer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 65px;
    margin-top: auto;
  }
  span {
    &::before {
      font-size: 40px;
    }
  }
  .icon-settings {
    &::before {
      content: '\e429';
    }
  }
  .icon-home {
    &::before {
      content: '\e88a';
    }
  }

  .icon-gallery {
    &::before {
      content: '\e060';
    }
  }
</style>
