<template>
    <h2>Cadastrar Veiculo</h2>
    <hr>
    <h5 class="labeling">Nome do Veiculo</h5>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="nome" aria-label="Recipient's username" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Adicionar</button>
      <router-link to="/veiculo"><button class="btn btn-outline-secondary" type="button" id="button-addon2">voltar</button></router-link>
    </div>
  </template>
  
  <script lang="ts">
  import VeiculoClient from '@/client/VeiculoClient';
  import { Veiculo } from '@/models/VeiculoModel';
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
      onClickExcluir(){
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
  </style>
  
  @/client/CondutorClient@/models/Condutor@/models/CondutorModel