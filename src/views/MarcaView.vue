<template>
  <div class="container text-center">
    <div class="row">
      <h1>Lista de Marcas</h1>
    </div>
  </div>
  <nav class="navbar navbar-light bg-light justify-content-between">
    <a class="navbar-brand">Search Marca</a>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <router-link to="/register" class="btn btn-primary">Register</router-link>
    </form>
  </nav>

  <div class="container2 text-center">
    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th class="col-9">Nome</th>
          <th class="col-3">
            <button class="btn btn-primary">Options</button>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style>
.container2 {
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: center;
  background-color: rgb(79, 86, 177);
}

h1 {
  color: black;
}
</style>
