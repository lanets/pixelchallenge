<template>
  <div>
    <b-input-group v-if="!loggedIn" class="w-25 mt-3 login-form">
      <b-form-input v-model="username" type="text"></b-form-input>
      <b-button @click="login()">login</b-button>
    </b-input-group>
    <div class="container">
      <image-viewer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageViewer from '~/components/ImageViewer.vue'

export default {
  components: {
    ImageViewer
  },
  data() {
    return {
      messageRxd: '',
      username: '',
      loggedIn: false,
      imagesList: {}
    }
  },
  computed: mapState(['chatMessages']),
  mounted() {
    /* this.socket = this.$nuxtSocket({
      channel: '/index',
      reconnection: false
    })
    this.socket.emit('getImagesPath', null, (res) => {
      this.imagesList = res
    }) */
  },
  methods: {
    getMessage() {
      /* this.socket.emit('getMessage', { id: 'abc123' }, (resp) => {
        this.messageRxd = resp
      }) */
    },
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
</style>
