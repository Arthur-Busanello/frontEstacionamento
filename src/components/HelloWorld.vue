<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>IS that a supra????</p>
    
    <h3>YES THAT IS A SUPRA IN THE BRYAN'S PARKING</h3>
    <ul>
      <li><img src="../assets/isthatasupra.png" alt="is that a supra?"></li>
      <h4>"Aunque digan que soy Un bandolero donde voy Le doy gracias a Dios Por hoy estar donde estoy"</h4>
    </ul>
    
    <audio ref="audioPlayer">
      <source src="../assets/braia.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hello Vue!'
    };
  },
  mounted() {
    this.playAudio();
  },
  methods: {
    playAudio() {
      this.$refs.audioPlayer.play();
    }
  }
};
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
