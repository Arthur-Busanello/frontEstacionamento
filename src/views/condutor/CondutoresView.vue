<template>

<div class="container text-center">
    <div class="row">
      <h1>Lista de Condutores</h1>
    </div>
  </div>

  <nav class="navbar navbar-light bg-light justify-content-between">
<a class="navbar-brand">Search Condutor</a>
<form class="form-inline">
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
 <router-link type="button" class="btn btn-success" 
              to="/condutores/formulario">Cadastrar
            </router-link>
</form>
</nav>
 
<div class="container2 text-center">
  <table class="table table-bordered table-dark">
    <thead>
      <tr>
          <th scope="col-3">ID</th>
                <th scope="col-3">Ativo</th>
                <th scope="col-3" class="text-start">CPF</th>
                <th scope="col-3" class="text-start">NOME</th>
                <th scope="col-3" class="text-start">TELEFONE</th>
                <th scope="col-3" class="text-start">TEMPO DESCONTO</th>
                <th scope="col-3" class="text-start">TEMPO PAGO</th>
                <th scope="col-3" class="text-start">OPCOES</th>
        </tr>
    </thead>
    <tbody class="table-group-divider">
              
              <tr v-for="item in CondutorLista" :key="item.id">
                <th class="col-md-1">{{ item.id }}</th>
                <th class="col-md-2"> 
                  <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
                  <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
                </th>
                <th class="text-start col-md-1">{{ item.cpf }}</th>
                <th class="text-start">{{ item.nome }}</th>
                
                <th class="text-start col-md-1">{{ item.telefone }}</th>
                <th class="text-start col-md-1">{{ item.tempoDesconto }}</th>
                <th class="text-start col-md-1">{{ item.tempoPago }}</th>
                
                <th class="col-md-2">
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <router-link type="button" class="btn btn-sm btn-warning" 
                        :to="{ name: 'condutores-formulario-editar-view', query: { id: item.id, form: 'editar' } } "> 
                      Editar 
                    </router-link>
                    <router-link type="button" class="btn btn-sm btn-danger" 
                        :to="{ name: 'condutores-formulario-excluir-view', query: { id: item.id, form: 'deletar' } } ">
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
  
  import CondutorClient from '@/client/CondutorClient'
  import { Condutor } from '@/models/CondutorModel';
  
  export default defineComponent({
    name: 'CondutorLista',
    data() {
      return {
        CondutorLista: new Array<Condutor>()
      }
    },
    mounted() {
      this.findAll();
    },
    methods: {  
      findAll() {
       CondutorClient.listAll()
          .then(sucess => {
            this.CondutorLista = sucess
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
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
background-color: black;


}
h1{
color: white;

}


</style>@/client/CondutorClient@/models/CondutorModel