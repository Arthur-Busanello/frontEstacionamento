<template>
  <nav class="navbar navbar-light bg-light justify-content-between">
    <a class="navbar-brand">Register</a>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="text" placeholder="Register" aria-label="Register">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
      <div>
        <select v-model="selectedOption">
          <option value="" disabled>Select an option</option>
          <option value="make">Marca</option>
          <option value="model">Modelo</option>
          <option value="vehicle">Veiculo</option>
          <option value="movement">Movimentacao</option>
          <option value="driver">Condutor</option>
        </select>
      </div>
    </form>
  </nav>

  <div class="container2 text-center">
    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th class="col-9">new register</th>
          <th class="col-3">
            <button class="btn btn-primary">Options</button>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      },
      selectedOption: ''
    };
  },
  methods: {
    submitForm() {
      // Perform registration logic here
      console.log(this.formData);
      // Reset the form fields
      this.formData = {
        name: '',
        email: '',
        password: ''
      };
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
