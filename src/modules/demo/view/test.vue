<template>
  <div> str-{{ str }} / text-{{ text }} / cp-{{ cp }}</div>
</template>

<script>
export default {
  props: {
    str: {
      type: String,
      default: '空的'
    }
  },
  data () {
    return {
      text: '123'
    }
  },
  computed: {
    cp () {
      return 'cp'
    }
  },
  mounted () {
    
  }
}
</script>

