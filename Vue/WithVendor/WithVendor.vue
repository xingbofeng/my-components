<template>
  <a
    v-if="text"
    :href="href"
  >{{ text }}</a>
  <a
    v-else
    :href="href"
  ><slot></slot></a>
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
    this.$watch('to', () => {
      if (this.getParameter('vendor') === '') {
        this.href = this.to;
        return;
      }
      this.href = this.transferLink(this.to);
    }, {
      deep: true,
    });
    if (this.getParameter('vendor') === '') {
      this.href = this.to;
      return;
    }
    this.href = this.transferLink(this.to);
  },
};
</script>

<style scoped>
a:hover, a:visited, a:link, a:active {
  text-decoration: none;
  color: inherit;
}
</style>
