<template>
  <div>
    {{log('render')}}
    {{ now }},次数:{{ number }}
    <a-button @click="start = !start">{{start? '停止' : '开始'}}</a-button>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    number: Number
  },
  data: function () {
    console.log("data");
    this.moment = moment;
    this.log = window.console.log;
    return {
      now: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      start: false
    };
  },
  //用来侦查响应数据的变化
  watch: {
    start () {
      this.startClock();
    }
  },
  beforeCreate () {
    console.log("beforeCreate");
  },
  created () {
    console.log("created");
  },
  beforeMount () {
    console.log("beforeMount");
  },
  mounted () {
    console.log("beforeMount");
    this.startClock();
  },
  beforeUpdate () {
    console.log("beforeUpdate");
  },
  updated () {
    console.log("updated");
  },
  beforeDestroy () {
    console.log("beforeDestroy");
    clearInterval(this.clockInterval);
  },
  destroyed () {
    console.log("destroyed");
  },
  methods: {
    startClock () {
      clearInterval(this.clockInterval);
      if (this.start) {
        this.clockInterval = setInterval(() => {
          console.log("startClock");
          this.now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        }, 1000);
      }
    }
  }
};
</script>

<style>
</style>
