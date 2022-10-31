<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="list.page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="list.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: {
      type: Number,
      require: true
    },
    list: {
      type: Object,
      require: true
    },
    getList: {
      type: Function,
      require: true
    }
  },
  created () {
  },
  data () {
    return {}
  },
  methods: {
    // 分页
    handleSizeChange (pageSize) {
      console.log(pageSize)
      this.list.pageSize = pageSize
      this.getList()
      console.log(this.getList())
    },
    handleCurrentChange (page) {
      console.log(page)
      this.list.page = page
      this.getList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
