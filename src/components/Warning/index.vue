<template>
  <div>
    <el-alert
      :title="`数据一共${count}条`"
      type="info"
      style="margin: '15px 0'"
      show-icon
    >
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'Warning',
  props: {
    count: {
      type: Number,
      require: true
    }
  },
  created () { },
  data () {
    return {
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
