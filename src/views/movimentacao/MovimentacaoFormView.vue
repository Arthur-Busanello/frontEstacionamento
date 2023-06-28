<template>
  <h2>Cadastrar Movimentacao</h2>
  <hr>
  <div v-if="mensagem.ativo" class="row">
    <div class="col-md-12 text-start">
      <div :class="mensagem.css" role="alert">
        <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  </div>
  <h5 class="labeling">Entrada</h5>
  <div class="input-group mb-3">
    <input v-if="form !== 'deletar'" type="datetime-local" v-model="movimentacao.entrada" class="form-control" placeholder="ID do veiculo" aria-label="nome" aria-describedby="button-addon2" required>
  </div>
  <h5 class="labeling">Saida</h5>
  <div class="input-group mb-3">
    <input v-if="form !== 'deletar'" type="datetime-local" v-model="movimentacao.saida" class="form-control" placeholder="ID do veiculo" aria-label="nome" aria-describedby="button-addon2" required>
  </div>
  <div class="row">
    <h5 v-if="form !== 'deletar'" class="labeling">Placa do veiculo</h5>
    <div class="col-md-12 text-start">
      <select v-model="movimentacao.veiculoId" class="form-select">
        <option v-for="item in veiculo" :value="item">{{ item.placa }}</option>
      </select>
    </div>
    <h5 v-if="form !== 'deletar'" class="labeling">Nome do condutor</h5>
    <div class="col-md-12 text-start">
      <select v-if="form !== 'deletar'" v-model="movimentacao.condutorId" class="form-select">
        <option v-for="item in condutor" :value="item">{{ item.nome }}</option>
      </select>
    </div>
  </div>
  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" v-if="form === undefined" @click="onClickCadastrar()" id="button-addon2">Adicionar</button>
    <button class="btn btn-outline-secondary" type="button" v-if="form === 'editar'" @click="onClickEditar()" id="button-addon2">Editar</button>
    <button class="btn btn-outline-secondary" type="button" v-if="form === 'deletar'" @click="onClickDeletar()" id="button-addon2">Deletar</button>
    <router-link to="/movimentacao">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Voltar</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import MovimentacaoClient from '@/client/MovimentacaoClient';
import VeiculoClient from '@/client/VeiculoClient';
import CondutorClient from '@/client/CondutorClient';
import { Condutor } from '@/models/CondutorModel';
import { Movimentacao } from '@/models/MovimentacaoModel';
import { Veiculo } from '@/models/VeiculoModel';
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
      veiculo: [] as Veiculo[],
      condutor: [] as Condutor[],
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
    this.listAllVeiculo();
    this.listAllCondutor();
  },
  methods: {
    onClickCadastrar() {
      MovimentacaoClient.cadastrar(this.movimentacao)
        .then((sucess: string) => {
          this.movimentacao = new Movimentacao();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
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
    onClickEditar() {
      MovimentacaoClient.editar(this.movimentacao.id, this.movimentacao)
        .then((sucess: string) => {
          this.movimentacao = new Movimentacao();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
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
      MovimentacaoClient.deletar(this.movimentacao.id)
        .then(() => {
          this.movimentacao = new Movimentacao();
          this.$router.push({ name: 'movimentacao-view' });
        })
        .catch((error: string) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error. ';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    listAllVeiculo() {
      VeiculoClient.listAll()
        .then((success: Veiculo[]) => {
          this.veiculo = success;
        })
        .catch((error: string) => {
          console.log(error);
        });
    },
    listAllCondutor() {
      CondutorClient.listAll()
        .then((success: Condutor[]) => {
          this.condutor = success;
        })
        .catch((error: string) => {
          console.log(error);
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
