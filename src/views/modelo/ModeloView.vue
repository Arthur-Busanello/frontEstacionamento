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
                <th scope="col-3" class="text-start">OPCOES</th>
        
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
    <th class="text-start">{{ item.marca.id}}</th>

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
import ModeloClient from '@/client/ModeloClient';
import { Modelo } from "@/models/ModeloModel";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ModeloLista",
  data() {
    return {
      ModeloLista: new Array<Modelo>()

    }
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      ModeloClient.listAll()
        .then(sucess => {
          this.ModeloLista = sucess
          console.log(sucess);
        })
        .catch(error => {
          console.log(error);
      });
     
    }
  }
});

</script>

<style lang="css">
.cad{
color: aliceblue;
text-decoration: none;
font-weight: bold;
}
.tit{
display: flex;
justify-content: center;
}
.container{
  margin-top: 20px;
}
.btn-options{
  width: 800px;
}
.col-8{
display: flex;
align-items: center;
justify-content: center;
}
.put{
  width: 750px;
  height: 40px;
}
.op-btn{
  margin-left: 10px;
}
.choose1{
color: aliceblue;
background-color: red;
border:none;
border-radius: 6px;
font-weight: bold;
height: 30px;
transition: all 0.35s 0s;
}
.choose1:hover{
font-size: larger;
}
.option{
background-color: rgb(19, 6, 69);
}
.ayo{
padding-top: 5px;
color: aliceblue;
}
.op{
height: 30px;
width: 100px;
border-radius: 5px;
color: aliceblue;
font-weight: bold;
background-color: rgb(0, 45, 194);
border: none;
}
.choose{
color: black;
border:none;
border-radius: 6px;
font-weight: bold;
height: 30px;
transition: all 0.35s 0s;
}
.choose:hover{
font-size: larger;
}
.enter{
color: black;
text-decoration: none;
font-weight: bold;
}
</style>