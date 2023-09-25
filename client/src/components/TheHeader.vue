<script setup lang="ts">
const props = defineProps<{
  heading: string,
}>();

</script>
<template>
  <header>
    <img src="../assets/logo.png" alt="logo" class="logo" />
    <div>
      <h1>{{ heading }}</h1>
    </div>
    <span class="icon-menu"></span>
  </header>
</template>

<style lang="postcss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 65px;
    padding: 10px 20px;
  }
  h1 {
    font-size: 21px;
  }
  .logo {
    max-width: 50px;
  }
  .icon-menu {
    margin-left: auto;
    &::before {
      content: '\e5d2';
      font-size: 30px;
    }
  }
</style>
