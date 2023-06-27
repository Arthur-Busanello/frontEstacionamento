<template>
  <h2>Cadastrar Modelo</h2>
  <hr>
  <select class="form-select" aria-label="Default select example">
</select>
  <h5 class="labeling">Nome do modelo</h5>
  <div class="input-group mb-3">
    <input type="text" class="form-control" v-if="form === undefined" v-model="modelo.nome" placeholder="nome" aria-label="Recipient's username" aria-describedby="button-addon2">
    <input type="number" class="form-control" v-if="form === undefined" v-marca="marca" placeholder="id" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary" v-if="form === undefined" @click="onClickCadastrar()"  type="button" id="button-addon2">Adicionar</button>
    <router-link to="/modelo"><button v-if="form === undefined" class="btn btn-outline-secondary" type="button" id="button-addon2">voltar</button></router-link>
  </div>
</template>

<script lang="ts">
import ModeloClient from '@/client/ModeloClient';
import MarcaClient from '@/client/MarcaClient';
import { Modelo } from '@/models/ModeloModel';
import { Marca } from '@/models/MarcaModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ModeloFormulario",
  data() {
    return {
      modelo: new Modelo(),
      mensagem: {
        active: true as boolean,
        titulo: "" as string,
        mensagem: "" as string,
        css: "" as string
      },
      marca: new Array<Marca>()
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    form() {
      return this.$route.query.form
    }
  },
  mounted() {
    if (this.id !== undefined) {
      this.findById(Number(this.id));
    }
    this.findAll();
  },
  methods: {
    findAll() {
      MarcaClient.listAll()
          .then(sucess =>{
              this.marca = sucess;
          })
          .catch(Error =>{
              console.log(Error);
          })
    },
    onClickCadastrar() {
      console.log(this.modelo)
      ModeloClient.cadastrar(this.modelo) // Access the brandId.id value
        .then(sucess => {
          this.modelo = new Modelo()
          console.log(sucess)
          this.mensagem.active = true;
          this.mensagem.mensagem = "sucess";
          this.mensagem.titulo = "Parabens. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch(error => {
          console.log(error)
          this.mensagem.active = true;
          this.mensagem.mensagem = "error";
          this.mensagem.titulo = "Error. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    findById(id: number) {
      ModeloClient.findById(id)
      .then(sucess => {
        this.modelo = sucess;
        this.mensagem.active = true;
        this.mensagem.mensagem = "sucess";
        this.mensagem.titulo = "Parabens. ";
        this.mensagem.css = "alert alert-success alert-dismissible fade show";
      })
      .catch(error => {
        this.mensagem.active = true;
        this.mensagem.mensagem = error;
        this.mensagem.titulo = "Error. ";
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
    },
    onClickEdit() {
      ModeloClient.editar(this.modelo.id, this.modelo)
        .then(sucess => {
          this.modelo = new Modelo()
          console.log(sucess);
          this.mensagem.active = true;
          this.mensagem.mensagem = "sucess";
          this.mensagem.titulo = "Parabens. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch(error => {
          this.mensagem.active = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Error. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickDeletar() {
      ModeloClient.deletar(this.modelo.id)
        .then(sucess => {
          this.modelo = new Modelo()
          console.log(sucess);
          this.$router.push({ name: 'marca-lista-view' });
        })
        .catch(error => {
          this.mensagem.active = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Error. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    }
  }
});

</script>

<style>
.pick{
margin-bottom: 50px;
}
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
}</style>