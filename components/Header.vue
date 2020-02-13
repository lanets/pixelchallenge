<template>
  <header>
    <Logo />
    <h1 class="header-title">
      Pixel Challenge
    </h1>
  </header>
</template>

<script>
import Logo from './Logo'
export default {
  components: {
    Logo
  }
}
</script>

<style>
header {
  /* width: 100vw; */
  height: 100px;
  background-color: #202020;
  display: grid;
  grid-template-columns: 25% auto 25%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 20px;
}

.header-title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 5rem;
  color: #ffffff;
  letter-spacing: 3px;
}

.admin-link {
  float: right;
  color: #ff7300;
}
</style>
