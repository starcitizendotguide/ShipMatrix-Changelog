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
    <div class="legal-notice">
      This is an unofficial Star Citizen fansite, not affiliated with the Cloud Imperium group of companies. All content on this site not authored by its host or users are property of their respective owners.
    </div>
    <div class="legal-notice">
      <a href="https://github.com/starcitizenguide">StarCitizen.guide on GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
