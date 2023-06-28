<template>
    <h2 v-if="form === undefined">Cadastrar Condutor</h2>
    <h2 v-if="form === 'deletar'">Deletar Condutor</h2>
    <h2 v-if="form === 'editar'">Editar Condutor</h2>
    <hr>
    <div v-if="mensagem.ativo" class="row">
      <div class="col-md-12 text-start">
        <div :class="mensagem.css" role="alert">
          <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <h5 class="labeling" v-if="form === 'editar'">Nome do condutor</h5>
  <input type="text" v-if="form === 'editar'" v-condutor="condutor.nome" class="form-control" placeholder="ID" aria-label="Recipient's username" aria-describedby="button-addon2">
  <input type="number" class="form-control" placeholder="id" v-if="form !== 'editar'" v-condutor="condutor.nome" aria-label="Recipient's username" aria-describedby="button-addon2">

    <h5 class="labeling" v-if="form === 'deletar'">CPF</h5>
    <input type="number" v-if="form === 'deletar'" class="form-control" placeholder="ID" v-condutor="condutor.id" aria-label="Recipient's username" aria-describedby="button-addon2">
    <h5 class="labeling" v-if="form !== 'deletar'">Nome do Modelo</h5>

    <label class="form-label mt-3">Nome da Marca *</label>
    <select v-if="form !== 'deletar'" v-condutor="condutor.nome" class="form-select" >
    </select>
    <div class="input-group mb-3">     
      <input type="text" class="form-control" placeholder="nome" v-if="form !== 'deletar'" v-condutor="condutor.nome" aria-label="Recipient's username" aria-describedby="button-addon2">
      <input type="number" class="form-control" placeholder="id" v-if="form !== 'deletar'" v-condutor="condutor.cpf" aria-label="Recipient's username" aria-describedby="button-addon2">
     
      <button class="btn btn-outline-secondary" type="button" v-if="form === undefined" @click="onClickCadastrar()" id="button-addon2">Adicionar</button>
      <button class="btn btn-outline-secondary" type="button" v-if="form === 'editar'" @click="onClickEditar()" id="button-addon2">Editar</button>
      <button class="btn btn-outline-secondary" type="button" v-if="form === 'deletar'" @click="onClickDeletar()" id="button-addon2">Deletar</button>
      <router-link to="/condutores"><button class="btn btn-outline-secondary" type="button" id="button-addon2">voltar</button></router-link>
    </div>
  </template>
  
  <script lang="ts">
import  CondutorClient from '@/client/CondutorClient';
  import { Condutor } from '@/models/CondutorModel';
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
      onClickDeletar(){
        CondutorClient.deletar(this.condutor.id)
          .then(sucess => {
            this.condutor = new Condutor()
            
            this.$router.push({ name: 'condutores-view' });
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