<script setup lang="ts"></script>

<template>
  <header>
    <img src="../assets/logo.png" alt="logo" class="logo" />
    <span class="icon-menu"></span>
  </header>
</template>

<style lang="postcss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 65px;
    padding: 10px 20px;
  }
  .logo {
    max-width: 50px;
  }
  .icon-menu {
    &::before {
      content: '\e5d2';
      font-size: 30px;
    }
  }
</style>
