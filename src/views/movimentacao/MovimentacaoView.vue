<template>



<div class="container text-center">
    <div class="row">
      <h1>Lista de Movimentacoes</h1>
    </div>
  </div>

  <nav class="navbar navbar-light bg-light justify-content-between">
<a class="navbar-brand">Search Movimentacoes</a>
<form class="form-inline">
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
 <router-link type="button" class="btn btn-success" 
              to="/movimentacao/formulario">Cadastrar
            </router-link>
</form>
</nav>

<div class="container2 text-center">
  <table class="table table-bordered table-dark">
    <thead>
      <tr>
                <th scope="col-3">ID</th>
                <th scope="col-3">Ativo</th>
                <th scope="col-3" class="text-start">entrada_veiculo</th>
                <th scope="col-3" class="text-start">saida_veiculo</th>
                <th scope="col-3" class="text-start">tempo</th>
                <th scope="col-3" class="text-start">TEMPO DESCONTO</th>
                <th scope="col-3" class="text-start">tempo_multa</th>
                <th scope="col-3" class="text-start">valor_desconto</th>
                <th scope="col-3" class="text-start">valor_hora_multa</th>
                <th scope="col-3" class="text-start">valor_multa</th>
                <th scope="col-3" class="text-start">valot_total</th>
                <th scope="col-3" class="text-start">condutor</th>
                <th scope="col-3" class="text-start">veiculo</th>
                <th scope="col-3" class="text-start">OPCOES</th>
        </tr>
    </thead>
    <tbody class="table-group-divider">
              
              <tr v-for="item in MovimentacaoLista" :key="item.id">
                <th class="col-md-1">{{ item.id }}</th>
                <th class="col-md-1"> 
                  <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
                  <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
                </th>
                <th class="text-start">{{ item.ativo }}</th>
                <th class="text-start col-md-1">{{ item.entrada }}</th>
          <th class="text-start col-md-1">{{ item.saida }}</th>
          <th class="text-start col-md-1">{{ item.tempo }}</th>
          <th class="text-start col-md-1">{{ item.tempoDesconto }}</th>
          <th class="text-start col-md-1">{{ item.tempoMulta }}</th>
          <th class="text-start col-md-1">{{ item.valorDesconto }}</th>
          <th class="text-start col-md-1">{{ item.valorHoraMulta }}</th>
          <th class="text-start col-md-1">{{ item.valorMulta }}</th>
          <th class="text-start col-md-1">{{ item.valorTotal }}</th>
          <th class="text-start col-md-1">{{ item.condutorId }}</th>
          <th class="text-start col-md-1">{{ item.veiculoId }}</th>
                <th class="col-md-2">
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <router-link type="button" class="btn btn-sm btn-warning" 
                        :to="{ name: 'movimentacao-formulario-editar-view', query: { id: item.id, form: 'editar' } } "> 
                      Editar 
                    </router-link>
                    <router-link type="button" class="btn btn-sm btn-danger" 
                        :to="{ name: 'movimentacao-formulario-excluir-view', query: { id: item.id, form: 'excluir' } } ">
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
  import MovimentacaoClient from '@/client/MovimentacaoClient';
  import { Movimentacao } from '@/models/MovimentacaoModel';
 
  
  export default defineComponent({
    name: 'MovimentacaoLista',
    data() {
      return {
        MovimentacaoLista: new Array<Movimentacao>()
      }
    },
    mounted() {
      this.findAll();
    },
    methods: {  
      findAll() {
        MovimentacaoClient.listAll()
          .then(sucess => {
            this.MovimentacaoLista = sucess
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


</style>