<template>
  <div id="app" class="content grid">
    <nav class="nav">
      <div class="container">
        <div class="nav-left">
          <a href="#" class="nav-item">Matrix</a>
        </div>
        <div class="nav-right nav-menu">
          <span class="nav-item"><router-link to="/">Home</router-link></span>
          <span class="nav-item"><router-link to="/compare">Compare</router-link></span>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
