<template>



  <div class="container text-center">
    <div class="row">
      <h1>Lista de Modelos</h1>
    </div>
  </div>

  <nav class="navbar navbar-light bg-light justify-content-between">
<a class="navbar-brand">Search Modelo</a>
<form class="form-inline">
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
 <router-link type="button" class="btn btn-success" 
              to="/modelo/formulario">Cadastrar
            </router-link>
</form>
</nav>

<div class="container2 text-center">
    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th scope="col-3">ID</th>
                <th scope="col-3">Ativo</th>
                <th scope="col-3" class="text-start">Modelo</th>
                <th scope="col-3" class="text-start">Marca</th>
          <th class="col-1">
            <button class="btn btn-primary">updade</button>
            
          </th>
          <th class="col-1">
            <button class="btn btn-primary">delete</button>
          </th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
  <tr v-for="item in ModeloLista" :key="item.id">
    <th class="col-md-1">{{ item.id }}</th>
    <th class="col-md-2"> 
      <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
      <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
    </th>
    <th class="text-start">{{ item.nome }}</th>
    <th class="text-start">{{ item.marcaId ? item.marcaId.nome : '' }}</th>

    <th class="col-md-2">
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <router-link type="button" class="btn btn-sm btn-warning"
  :to="{ name: 'modelo-formulario-editar-view', query: { id: item.id, form: 'editar' }, }">Editar</router-link>
<router-link type="button" class="btn btn-sm btn-danger"
  :to="{ name: 'modelo-formulario-excluir-view',query: { id: item.id, form: 'excluir' },}">Excluir</router-link>

      </div>
    </th>
  </tr>
</tbody>

  </table>
</div>


</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ModeloClient from '@/client/ModeloClient';
  import { Modelo } from '@/models/ModeloModel';
  import { Marca } from '@/models/MarcaModel';

  export default defineComponent({
    name: 'ModeloLista',
    data() {
      return {
        ModeloLista: [] as Modelo[],
      };
    },
    mounted() {
      this.findAll();
    },
    methods: {
      findAll() {
        ModeloClient.listAll()
        .then((success) => {
  this.ModeloLista = success.map((item) => {
    const modelo: Modelo = { ...item, getNomeMarca: () => item.marcaId.nome };
    return modelo;
  });
})

          .catch((error) => {
            console.log(error);
          });
      },
    },
  });
</script>




<style>


.container2{
display: flex;
justify-content: center;

}
.container{
display: flex;
justify-content: center;
background-color: rgb(79, 86, 177);


}
h1{
color: black;

}


</style>@/models/ModeloModel