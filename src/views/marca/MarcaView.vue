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
      <router-link type="button" class="btn btn-success" 
              to="/marca/formulario">Cadastrar
            </router-link>
    </form>
  </nav>

  <div class="container2 text-center">
    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th scope="col-3">ID</th>
                <th scope="col-3">Ativo</th>
                <th scope="col-4" class="text-start">Marca</th>
                <th scope="col-3" class="text-start">OPCOES</th>
        
        </tr>
      </thead>
      <tbody class="table-group-divider">
              
              <tr v-for="item in MarcaLista" :key="item.id">
                <th class="col-md-1">{{ item.id }}</th>
                <th class="col-md-2"> 
                  <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
                  <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
                </th>
               
                <th class="text-start">{{ item.nome }}</th>
                <th class="col-md-2">
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <router-link type="button" class="btn btn-sm btn-warning" 
                        :to="{ name: 'marca-formulario-editar-view', query: { id: item.id, form: 'editar' } } "> 
                      Editar 
                    </router-link>
                    <router-link type="button" class="btn btn-sm btn-danger" 
                        :to="{ name: 'marca-formulario-excluir-view', query: { id: item.id, form: 'deletar' } } ">
                      Excluir
                    </router-link>
                  </div>
                </th>
              </tr>
  
            </tbody>
    </table>
  </div>
</template>
<script lang="ts">
  
  import { defineComponent } from 'vue';
  
  import MarcaClient from '@/client/MarcaClient';
  import { Marca } from '@/models/MarcaModel';
  
  export default defineComponent({
    name: 'MarcaLista',
    data() {
      return {
        MarcaLista: new Array<Marca>()
      }
    },
    mounted() {
      this.findAll();
    },
    methods: {
  
      findAll() {
        MarcaClient.listAll()
          .then(sucess => {
            this.MarcaLista = sucess
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  });
  
  </script>

<style>
.container2 {
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: center;
  background-color: black;
}

h1 {
  color: white;
}
</style>
