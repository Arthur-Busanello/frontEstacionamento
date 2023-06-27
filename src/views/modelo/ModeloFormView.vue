<template>
    <h2>Cadastrar Modelo</h2>
    <hr>
    <h5 class="labeling">Nome do modelo</h5>
    <div class="input-group mb-3">
      <input type="text" class="form-control" v-if="form === undefined" v-model="modelo.nome" placeholder="nome" aria-label="Recipient's username" aria-describedby="button-addon2">
      <!-- <input type="text" class="form-control" v-if="form === undefined" v-marca="this.marcaId.id" placeholder="id" aria-label="Recipient's username" aria-describedby="button-addon2"> -->
      <button class="btn btn-outline-secondary" v-if="form === undefined" @click="onClickCadastrar()"  type="button" id="button-addon2">Adicionar</button>
      <router-link to="/modelo"><button v-if="form === undefined" class="btn btn-outline-secondary" type="button" id="button-addon2">voltar</button></router-link>
    </div>
  </template>
  
  <script lang="ts">
  import  ModeloClient  from '@/client/ModeloClient';
  import { Modelo } from '@/models/ModeloModel';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ModeloFormulario',
    data() {
      return {
        modelo: new Modelo(),
        mensagem: {
          ativo: false,
          titulo: '',
          mensagem: '',
          css: '',
        },
      };
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
       ModeloClient.cadastrar(this.modelo)
        .then(sucess => {
            this.modelo = new Modelo()
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
        ModeloClient.findById(id)
          .then((sucess: Modelo) => {
            this.modelo = sucess;
          })
          .catch((error: string) => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error.';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      onClickEditar(){
        ModeloClient.editar(this.modelo.id, this.modelo)
          .then(sucess => {
            this.modelo = new Modelo()
            
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
      onClickExcluir(){
        ModeloClient.deletar(this.modelo.id)
          .then(sucess => {
            this.modelo = new Modelo()
            
            this.$router.push({ name: 'modelo-view' });
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
  </style>
  
