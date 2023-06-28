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
  <div class="row">
    <div class="col-md-12 text-start">
      <label class="form-label mt-3">Nome do Condutor *</label>
      <input type="text" :disabled="form === 'deletar' || disabled" class="form-control" v-model="condutor.nome">
    </div>
    <div class="col-md-12 text-start">
      <label class="form-label mt-3">Cpf do Condutor *</label>
      <input type="text" :disabled="form === 'deletar' || disabled" class="form-control" placeholder="121.121.121-12" v-model="condutor.cpf">
    </div>
    <div class="col-md-12 text-start">
      <label class="form-label mt-3">Telefone do Condutor *</label>
      <input type="text" :disabled="form === 'deletar' || disabled" class="form-control" placeholder="(12)12121-1212" v-model="condutor.telefone">
    </div>
  </div>

  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" v-if="form === undefined" @click="onClickCadastrar()" type="button" id="button-addon2">Adicionar</button>
    <button class="btn btn-outline-secondary" v-if="form === 'editar'" type="button" @click="onClickEditar()" id="button-addon2">Editar</button>
    <button class="btn btn-outline-secondary" v-if="form === 'deletar'" @click="onClickDeletar()" type="button" id="button-addon2">Deletar</button>
    <router-link to="/condutores"><button class="btn btn-outline-secondary" type="button" id="button-addon2">voltar</button></router-link>
  </div>
</template>

<script lang="ts">
import CondutorClient from '@/client/CondutorClient';
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
      disabled: false,
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
        .then((success) => {
          this.condutor = new Condutor();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = 'Parabens. ';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
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
        .then((success: Condutor) => {
          this.condutor = success;
        })
        .catch((error: string) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error.';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    onClickEditar() {
      CondutorClient.editar(this.condutor.id, this.condutor)
        .then((success) => {
          this.condutor = new Condutor();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = 'Parabens. ';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
        })
        .catch((error: string) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error.';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    onClickDeletar() {
      CondutorClient.deletar(this.condutor.id)
        .then((success) => {
          this.condutor = new Condutor();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = 'Parabens. ';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
          this.$router.push({ name: 'condutores-view' });
        })
        .catch((error: string) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error.';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
  },
});
</script>

<style>
.labeling {
  display: flex;
  justify-content: flex-start;
  margin-left: 14px;
  font-weight: bold;
}

.card {
  display: flex;
  justify-content: center;
}

.platform {
  border: 1px transparent black;
}
</style>
