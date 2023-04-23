<template>
  <div class="wrapper">
    <header class="header">
      <h1>Compare Cars side by side</h1>
    </header>
    <main class="main">
      <div class="container">
        <CarForm />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CarForm from "./components/forms/carForm.vue";

@Options({
  components: {
    CarForm,
  },
})
export default class App extends Vue {}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");
* {
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  text-decoration: none;
}
.wrapper {
  display: flex;
  flex-flow: row wrap;
}

.wrapper > * {
  flex: 1 100%;
}

.header {
  background: #000;
  color: #fcfcfc;
}
.main {
  width: 100%;
  height: 90vh;
  text-align: "center";
  background: #fff;
  margin-top: 30px;
}

.navbar {
  display: flex;
  flex-direction: row-reverse;
  list-style: none;
}
.navbar li a {
  color: #fcfcfc;
  padding-left: 10px;
}

h1 {
  text-align: center;
}

.container {
  width: 60%;
  height: 100vh;
  margin: auto;
  padding: 10px 0 50px 50px;
  background: #f8f8f8;
  border-radius: 10px;
  color: #000;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05), 0 0 10px 0 rgba(0, 0, 0, 0.05);
}
</style>
