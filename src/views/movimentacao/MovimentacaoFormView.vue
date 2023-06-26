<template>
    <h2>Cadastrar Movimentacao</h2>
    <hr>
    <h5 class="labeling">Movimentacoes</h5>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="nome" aria-label="Recipient's username" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Adicionar</button>
      <router-link to="/movimentacao"><button class="btn btn-outline-secondary" type="button" id="button-addon2">voltar</button></router-link>
    </div>
  </template>
  
  <script lang="ts">
  import  MovimentacaoClient  from '@/client/MovimentacaoClient';
  import { Movimentacao } from '@/models/MovimentacaoModel';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'MovimentacaoFormulario',
    data() {
      return {
        movimentacao: new Movimentacao(),
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
        MovimentacaoClient.cadastrar(this.movimentacao)
        .then(sucess => {
            this.movimentacao = new Movimentacao()
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
        MovimentacaoClient.findById(id)
          .then((sucess: Movimentacao) => {
            this.movimentacao = sucess;
          })
          .catch((error: string) => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error.';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      onClickEditar(){
        MovimentacaoClient.editar(this.movimentacao.id, this.movimentacao)
          .then(sucess => {
            this.movimentacao = new Movimentacao()
            
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
        MovimentacaoClient.deletar(this.movimentacao.id)
          .then(sucess => {
            this.movimentacao = new Movimentacao()
            
            this.$router.push({ name: 'movimentacao-view' });
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
  
  