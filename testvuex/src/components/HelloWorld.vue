<template>
  <!-- <div class="hello">
    <h2>{{msg}}</h2>
    <br />
    <h3>{{$store.state.count}}</h3>
    <div>
      <button @click="add">+</button>
      <button @click="reduce">-</button>
    </div>
    <div>
      <button @click="addAction">+</button>
      <button @click="reduceAction">-</button>
    </div>
  </div>-->
  <div>
    <header>
      <img src="../assets/img/h_bg_1.jpg" width="768" height="154" />
    </header>
    <nav>
      <div class="row">
        <div class="col">1</div>
        <div class="col hotel">
          <a href="#">海外酒店</a>
          <a href="#">特价酒店></a>
        </div>
        <div class="col hotel">
          <a href="#">团购</a>
          <a href="#">同福客栈</a>
        </div>
      </div>
      <div class="row">
        <div class="col">1</div>
        <div class="col hotel">
          <a href="#">海外酒店</a>
          <a href="#">特价酒店></a>
        </div>
        <div class="col hotel">
          <a href="#">团购</a>
          <a href="#">同福客栈</a>
        </div>
      </div>
      <div class="row">
        <div class="col">1</div>
        <div class="col hotel">
          <a href="#">海外酒店</a>
          <a href="#">特价酒店></a>
        </div>
        <div class="col hotel">
          <a href="#">团购</a>
          <a href="#">同福客栈</a>
        </div>
      </div>
      <div class="row">
        <div class="col hotel">
          <a href="#">海外酒店</a>
          <a href="#">特价酒店</a>
        </div>
        <div class="col hotel">
          <a href="#">海外酒店</a>
          <a href="#">特价酒店></a>
        </div>
        <div class="col hotel">
          <a href="#">团购</a>
          <a href="#">同福客栈</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import store from "../store/store";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    // ...mapState(["count"]),
    ...mapGetters(["count"]),
    count() {
      return this.$store.getters.count;
    }
  },
  methods: {
    ...mapMutations(["add","reduce"]),
    ...mapActions(["addAction","reduceAction"])
  },
  store
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
body{
  min-width: 320px;
  max-width: 1080px;
  margin: 0 auto;
}
header {
  width: 100%;
  height: 100px;
}
header img {
  width: 100%;
  height: 100%;
}
nav {
  padding: 5px;
}
.row {
  width: 100%;
  height: 90px;
  background-color: pink;
  border-radius: 8px;
  display: flex;
  margin-bottom: 5px;
}
nav .row:nth-child(2){
  background-color: #3d98ff;
}
nav .row:nth-child(3){
  background-color: #44c522;
}
nav .row:nth-child(4){
  background-color: #fc9720;
}
.col {
  flex: 1;
  border-left: 1px solid #fff;
}
.row div:first-child {
  border: 0;
}
.hotel {
  display: flex;
  flex-direction: column;
}
.hotel a {
  flex: 1;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  line-height: 45px;
}
.hotel a:first-child {
  border-bottom: 1px solid #fff;
}
</style>
