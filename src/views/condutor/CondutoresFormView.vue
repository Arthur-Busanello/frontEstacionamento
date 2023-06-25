<template>
    <h2>Cadastrar Condutor</h2>
    <hr>
    <h5 class="labeling">Nome do Condutor</h5>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="nome" aria-label="Recipient's username" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Adicionar</button>
      <router-link to="/condutores"><button class="btn btn-outline-secondary" type="button" id="button-addon2">voltar</button></router-link>
    </div>
  </template>
  
  <script lang="ts">
import  CondutorClient from '@/client/condutorClient';
  import { Condutor } from '@/models/condutor';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CondutoresFormulario',
    data() {
      return {
        condutor: new Condutor(),
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
        CondutorClient.cadastrar(this.condutor)
        .then(sucess => {
            this.condutor = new Condutor()
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
        CondutorClient.findById(id)
          .then((sucess: Condutor) => {
            this.condutor = sucess;
          })
          .catch((error: string) => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error.';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      onClickEditar(){
        CondutorClient.editar(this.condutor.id, this.condutor)
          .then(sucess => {
            this.condutor = new Condutor()
            
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
        CondutorClient.deletar(this.condutor.id)
          .then(sucess => {
            this.condutor = new Condutor()
            
            this.$router.push({ name: 'condutores--view' });
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
  
  @/client/CondutorClient