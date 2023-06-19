<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
     IS that a supra????
    </p>
   
    <h3>YES THAT IS A SUPRA IN THE  BRYAN'S PARKING</h3>
    <ul>
      <li><img src="../assets/isthatasupra.png" alt="is that a supra?"></li>
      <h4>"Aunque digan que soy Un bandolero donde voy Le doy gracias a Dios Por hoy estar donde estoy"</h4>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
