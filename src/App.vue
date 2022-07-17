<template>
  
  <router-view/>
  <div class="copy">©2022 by JasonLin</div>
</template>


<style >

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

body {
  margin: 0;
  background: #a4c3b2;
}

.app {
  display: flex;
  justify-content: center;
  margin-top: 180px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container {
    width: 300px;
    height: 540px;
    
}

input {
  width: 200px;
  height: 30px;
  font-size: large;
  margin: 10px;
}

button {
  width: 100px;
  height: 30px;
  margin-top: 20px;
  background-color: #f6fff8;
  color: #4f685d;
  border-radius: 5px;
  font-size:medium;
  font-weight: bold;
  width: auto;
}

a {
  font-size: 1.2rem;
  text-decoration: none;
  font-weight: bold;
  color: #4f685d;
}

.message {
  width: auto;
  height: 30px;
  text-align: center;
  font-size: large;
  color: #32483e;
  font-weight: bold;
}

.back {
  width: auto;
  height: auto;
  position: absolute;
  top:40px;
  font-size: 450px;
  z-index: -10;
  opacity: 0.09;
  font-weight: bolder;
  line-height: 80%;
}

.copy {
  justify-self: end;
}
</style>
