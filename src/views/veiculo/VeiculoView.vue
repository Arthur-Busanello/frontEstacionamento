<template>
  <div class="container text-center">
    <div class="row">
      <h1>Lista de Veiculos</h1>
    </div>
  </div>

  <nav class="navbar navbar-light bg-light justify-content-between">
    <a class="navbar-brand">Search Veiculo</a>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <router-link type="button" class="btn btn-success" to="/veiculo/formulario">Cadastrar</router-link>
    </form>
  </nav>

  <div class="container2 text-center">
    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th scope="col-3">ID</th>
                <th scope="col-3">Ativo</th>
                <th scope="col-3" class="text-start">PLACA</th>
                <th scope="col-3" class="text-start">MODELO-ID</th>
                <th scope="col-3" class="text-start">COR</th>
                <th scope="col-3" class="text-start">TIPO</th>
                <th scope="col-3" class="text-start">ANO</th>
                <th scope="col-3" class="text-start">OPCOES</th>
        </tr>
      </thead>

      <tbody class="table-group-divider">
        <tr v-for="item in VeiculoLista" :key="item.id">
          <th class="col-md-1">{{ item.id }}</th>
          <th class="col-md-1">
            <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
            <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
          </th>
          <th class="text-start col-md-1">{{ item.placa }}</th>
          <th class="text-start col-md-1">{{ item.modelo.id }}</th>
          <th class="text-start col-md-1">{{ item.cor }}</th>
          <th class="text-start col-md-1">{{ item.tipo }}</th>
          <th class="text-start col-md-1">{{ item.ano }}</th>
          <th class="col-md-2">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <router-link type="button" class="btn btn-sm btn-warning"
                :to="{ name: 'veiculo-formulario-editar-view', query: { id: item.id, form: 'editar' } }">
                Editar
              </router-link>
              <router-link type="button" class="btn btn-sm btn-danger"
                :to="{ name: 'veiculo-formulario-excluir-view', query: { id: item.id, form: 'excluir' } }">
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
import VeiculoClient from '@/client/VeiculoClient';
import { Veiculo } from '@/models/VeiculoModel';

export default defineComponent({
  name: 'VeiculoLista',
  data() {
    return {
      VeiculoLista: new Array<Veiculo>()
    }
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      VeiculoClient.listAll()
        .then(sucess => {
          this.VeiculoLista = sucess
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