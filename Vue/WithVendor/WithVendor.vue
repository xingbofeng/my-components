<template>
  <a :href="href">{{ text }}</a>
</template>

<script>
export default {
  props: ['to', 'text'],

  name: 'WithVendor',

  data() {
    return {
      href: '',
    };
  },

  methods: {
    getParameter(name) {
      const r = new RegExp(`(\\?|#|&)${name}=([^&#]*)(&|#|$)`);
      const m = window.location.href.match(r);
      return decodeURIComponent(!m ? '' : m[2]);
    },

    transferLink(link) {
      if (link.indexOf('vendor') === -1) {
        if (link.indexOf('?') === -1) {
          return `${link}?vendor=${this.getParameter('vendor')}`;
          // eslint-disable-next-line
        } else {
          return `${link}&vendor=${this.getParameter('vendor')}`;
        }
      }
      return link;
    },
  },

  mounted() {
    if (this.getParameter('vendor') === '') {
      this.href = this.to;
      return;
    }
    this.href = this.transferLink(this.to);
  },
};
</script>

<style scoped>
</style>
