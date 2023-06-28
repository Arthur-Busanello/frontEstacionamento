<template>



<nav class="navbar navbar-light bg-light justify-content-between">
<a class="navbar-brand">Search Modelo</a>
<form class="form-inline">
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
 <router-link type="button" class="btn btn-success" 
              to="/movimentacao/formulario">Cadastrar
            </router-link>
</form>
</nav>
  <hr>
  <table class="table table-dark table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Condutor</th>
        <th scope="col">Veiculo</th>
        <th scope="col">Entrada</th>
        <th scope="col">Saida</th>
        <th scope="col">cadastro</th>
        <th scope="col">ativo</th>
        <th scope="col">atualizacao</th>
        <th scope="col">Opcao</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="item in MovimentacaoLista" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <th>{{ item.veiculoId.placa }}</th>
          <th>{{ item.condutorId.nome }}</th>
          <th>{{ item.entrada }}</th>
          <th>{{ item.saida }}</th>
          <th>{{ item.cadastro }}</th>
          <th class="col-md-2"> 
              <span v-if="item.ativo==true" class="badge text-bg-success">SIM</span>
              <span v-if="item.ativo==false" class="badge text-bg-danger">NAO</span>
          </th>
          <th>{{ item.atualizacao }}</th>
          <th>    
            <router-link type="button" :to="{name:'Movimentacaoformedit', query: { id: item.id, form: 'edit' }}"><button submit="" class="choose">Editar</button></router-link>
            <router-link type="button" :to="{name:'Movimentacaoformexcluir', query: { id: item.id, form: 'deletar' }}"><button submit="" class="choose1">Deletar</button></router-link>
          </th>  
        </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
  
  import { defineComponent } from 'vue';
  import MovimentacaoClient from '@/client/MovimentacaoClient';
  import { Movimentacao } from '@/models/MovimentacaoModel';
 
  
  export default defineComponent({
  name: "MovimentacaoLista",
  data(){
      return{
        MovimentacaoLista : new Array<Movimentacao>()
      }
    },
    mounted(){
      this.findAll();
    },
    methods:{
      findAll(){
        MovimentacaoClient.listAll()
          .then(sucess => {
          this.MovimentacaoLista = sucess
          console.log(sucess);
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