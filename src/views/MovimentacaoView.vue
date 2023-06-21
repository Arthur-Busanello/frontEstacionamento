<template>



  <div class="container text-center">
    <div class="row">
      <h1>Lista de Condutores</h1>
    </div>
  </div>
  <nav class="navbar navbar-light bg-light justify-content-between">
<a class="navbar-brand">Search Marca</a>
<form class="form-inline">
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success my-2 my-sm-0 " type="submit">Search</button>
  <router-link to="/register" class="btn btn-primary">Register</router-link>
</form>
</nav>

<div class="container2 text-center">
  <table class="table table-bordered table-dark">
    <thead>
      <tr>
        <th class="col-">Entrada</th>
        <th class="col-">Veiculo</th>
        <th class="col-">Condutor</th>
        <th class="col-"><button class="btn btn-primary">update</button></th>
        <th class="col-"><button class="btn btn-primary">delete</button></th>
      </tr>
      <tr>
        <th class="col-">Entrada</th>
        <th class="col-">Veiculo</th>
        <th class="col-">Condutor</th>
        <th class="col-"><button class="btn btn-primary">update</button></th>
        <th class="col-"><button class="btn btn-primary">delete</button></th>
      </tr>
    </thead>
  </table>
</div>


</template>

<style>


.container2{
display: flex;
justify-content: center;

}
.container{
display: flex;
justify-content: center;
background-color: black;


}
h1{
color: white;

}


</style>