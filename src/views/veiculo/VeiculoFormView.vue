<template>
    
  <h2 v-if="form === 'editar'">Editar Veiculo</h2>
  <h2 v-if="form === undefined">Cadastrar Veiculo</h2>
  <h2 v-if="form === 'deletar'">Deletar Veiculo</h2>
  <hr>
  <div v-if="mensagem.ativo" class="row">
      <div class="col-md-12 text-start">
        <div :class="mensagem.css" role="alert">
          <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
    

  <h5 v-if="form !== 'deletar'" class="labeling">Numero da placa</h5>
  <div class="input-group mb-3">
    <input v-if="form !== 'deletar'" v-model="veiculo.placa" type="text" class="form-control" placeholder="placa" aria-label="nome" aria-describedby="button-addon2" required>
  </div>
  <div class="lab">
    <h5 v-if="form !== 'deletar'" class="labeling">Cor</h5>
    <h5 v-if="form !== 'deletar'" class="labeling">Tipo</h5>
  </div>



  
  <div class="input-group mb-3">
    <select v-if="form !== 'deletar'" v-model="veiculo.cor" class="form-select" aria-label="Default select example">
      <option v-for="itemcolor in veiculocor" :value="itemcolor">{{itemcolor}}</option>
    </select>
    <select v-if="form !== 'deletar'" v-model="veiculo.tipo" class="form-select" aria-label="Default select example">
      <option v-for="itemtype in veiculotipo" :value="itemtype">{{ itemtype }}</option>
    </select>
  </div>
  
  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" v-if="form === undefined" @click="onClickCadastrar()"
      id="button-addon2">Adicionar</button>
    <button class="btn btn-outline-secondary" type="button" v-if="form === 'editar'" @click="onClickEditar()"
      id="button-addon2">Editar</button>
    <button class="btn btn-outline-secondary" type="button" v-if="form === 'deletar'" @click="onClickDeletar()"
      id="button-addon2">Deletar</button>
    <router-link to="/veiculo"><button class="btn btn-outline-secondary" type="button"
        id="button-addon2">voltar</button></router-link>
  </div>
  </template>
  
  <script lang="ts">
  import VeiculoClient from '@/client/VeiculoClient';
import { Modelo } from '@/models/ModeloModel';
  import { Veiculo } from '@/models/VeiculoModel';
import { Cor } from '@/models/cor';
import { Tipo } from '@/models/tipo';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'VeiculoFormulario',
    data() {
      return {
        veiculo: new Veiculo(),
        mensagem: {
          ativo: false,
          titulo: '',
          mensagem: '',
          css: '',
        },
        modelo: new Array<Modelo>(),
      veiculotipo: Tipo,
      veiculocor: Cor
    }
    },
    computed: {
      id() {
        return this.$route.query.id;
      },
      form() {
        return this.$route.query.form;
      },
    },
    mounted() {
      if (this.id !== undefined) {
        this.findById(Number(this.id));
      }
    },
    methods: {
      onClickCadastrar() {
        VeiculoClient.cadastrar(this.veiculo)
        .then(sucess => {
            this.veiculo = new Veiculo()
            this.mensagem.ativo = true;
            this.mensagem.mensagem = sucess;
            this.mensagem.titulo = "Parabens. ";
            this.mensagem.css = "alert alert-success alert-dismissible fade show";
          })
          .catch((error: string) => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error.';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      findById(id: number) {
        VeiculoClient.findById(id)
          .then((sucess: Veiculo) => {
            this.veiculo = sucess;
          })
          .catch((error: string) => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error.';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      onClickEditar(){
        VeiculoClient.editar(this.veiculo.id, this.veiculo)
          .then(sucess => {
            this.veiculo = new Veiculo()
            
            this.mensagem.ativo = true;
            this.mensagem.mensagem = sucess;
            this.mensagem.titulo = "Parabens. ";
            this.mensagem.css = "alert alert-success alert-dismissible fade show";
          })
          .catch((error: string) => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error.';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      onClickDeletar(){
        VeiculoClient.deletar(this.veiculo.id)
          .then(sucess => {
            this.veiculo = new Veiculo()
            
            this.$router.push({ name: 'veiculo-view' });
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Error. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      },
    },
  });
  </script>
  <style>
  .labeling{
    display: flex;
    justify-content: flex-start;
    margin-left: 14px;
    font-weight: bold;
  }
  .card{
    display: flex;
    justify-content: center;
  }
  .platform{
    border: 1px transparent black;
  }
  .lab{
    display: flex;
    justify-content: space-around;
  }
  </style>
  
