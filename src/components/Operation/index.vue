<template>
  <div>
    <el-button type="text" size="medium" @click="handDisable(row)">{{
      row.state === 1 ? "禁用" : "启用"
    }}</el-button>
    <el-button
      :disabled="disable"
      @click="handleEdit(row)"
      type="text"
      size="medium"
      >修改</el-button
    >
    <el-button
      :disabled="disable"
      @click="handleDelete(row)"
      type="text"
      size="medium"
      >删除</el-button
    >
    <!-- 新增和修改组件 -->
    <editAdd
      :title="title"
      :isShow="isShow"
      :rows="row"
      @onClickIsShow="onClickIsShow"
      @refreshEdit="refreshEdit"
    ></editAdd>
  </div>
</template>

<script>
import editAdd from '@/components/Subjects/editAdd.vue'
export default {
  name: 'Operation',
  props: {
    row: {
      type: Object,
      require: true
    }
  },
  created () { },
  data () {
    return {
      // 打开和关闭dialog标识
      isShow: null,
      // 修改标识
      title: null
    }
  },
  methods: {
    // 修改状态
    handDisable (row) {
      // console.log(row)
      if (row.state === 1) {
        row.state = 0
      } else {
        row.state = 1
      }
      this.$emit('disableEdit', row)
    },
    // 修改
    handleEdit (row) {
      this.title = false
      this.isShow = true
      console.log(row)
    },
    // 点击取消 关闭dialog
    onClickIsShow (e) {
      this.isShow = e
      this.$emit('onClickIsShow', this.onClickIsShow)
    },
    // 删除
    handleDelete (row) {
      this.$emit('deletes', row)
    },
    // 修改
    tagsEdit (e) {
      console.log(e)
      this.$emit('tagsEdit', e)
    },
    refreshEdit () {
      this.$emit('refreshEdit')
    }
  },
  computed: {
    disable () {
      return this.row.state === 1 ? true : false
    }
  },
  watch: {},
  filters: {},
  components: { editAdd }
}
</script>

<style scoped>
</style>
