<template>
  <div>
    <b-input-group v-if="!loggedIn" class="w-25 mt-3 login-form">
      <b-form-input v-model="username" type="text"></b-form-input>
      <b-button @click="login()">login</b-button>
    </b-input-group>
    <div class="container">
      <div class="links">
        <nuxt-link class="button" :to="{name: 'admin'}">
          Admin
        </nuxt-link>
        <nuxt-link class="button" :to="{name: 'public'}">
          Public
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    login() {
      /* this.socket.emit('login', { username: this.username }, (resp) => {
        this.loggedIn = resp
      }) */
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 4rem;
  color: #35495e;
  letter-spacing: 1px;
}

.login-form {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  opacity: 0;
  max-width: 300px;
}

.login-form:hover {
  opacity: 100%;
}

.links {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}

.button, .button:visited {
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
  margin: 10px;
}
.button:hover, .button:focus {
  color: #fff;
  background-color: #000;
}
</style>
