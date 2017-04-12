<template>
  <div class="container">
    <div>
      距离开始还有
      <span>{{ days }}</span>
      天
      <span>{{ hours }}</span>
      小时
      <span>{{ minutes }}</span>
      分钟
      <span>{{ seconds }}</span>
      秒
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountDown',

  props: ['endTime'],

  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },

  created() {
    this.countTime();
  },

  methods: {
    countTime() {
      setInterval(() => {
        const endTime = new Date(this.endTime);
        const all = (endTime - (new Date().getTime())) / 1000;
        const days = Math.floor(all / (60 * 60 * 24));// 天数
        this.days = days;
        const dS = all - (days * 24 * 60 * 60);// 时分秒所占的总过的秒数
        const hours = Math.floor(dS / (60 * 60));// 这个是所占的小时数
        this.hours = hours;
        const hS = dS - (hours * 60 * 60);// 这个是分秒一共占的秒数
        const minutes = Math.floor(hS / 60);// 这个是多少分钟
        this.minutes = minutes;
        const seconds = Math.floor(hS - (minutes * 60));
        this.seconds = seconds;
      });
    },
  },
};
</script>

<style scoped>
</style>
