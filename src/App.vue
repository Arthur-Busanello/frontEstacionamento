<template>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/marca">Marca</router-link>|
    <router-link to="/modelo">Modelo</router-link>|
    <router-link to="/veiculo">Veiculo</router-link>|
    <router-link to="/condutores">Condutores</router-link>|
    <router-link to="/movimentacao">Movimentacao</router-link>
  </nav>
  <router-view/>
  
</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: black;
  padding: 30px;
  
  a {
    font-weight: bold;
    font-size:x-large;
    color: white;


    &.router-link-exact-active {
      color: #42b983;
    }
    
  }
}
</style>
