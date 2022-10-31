<template>
  <div>
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="shuject"
        class="demo-form-inline"
        ref="subForm"
      >
        <el-form-item label="学科名称" prop="subjectName">
          <el-input v-model.trim="shuject.subjectName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="defaule" @click="resetFields('subForm')"
            >清除</el-button
          >
          <el-button type="primary" @click="query">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-edit" @click="onSubmit"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 全局组件 -->
      <warning :count="count"></warning>

      <el-table :data="subList" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="subjectName" label="学科名称" width="180">
        </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
        <el-table-column prop="isFrontDisplay" label="前台是否显示">
          <!-- <template v-slot="scope">
            {{ scope.isFrontDisplay === 1 ? "是" : "否" }}
          </template> -->
        </el-table-column>
        <el-table-column prop="twoLevelDirectory" label="二级目录">
        </el-table-column>
        <el-table-column prop="tags" label="标签"> </el-table-column>
        <el-table-column prop="totals" label="题目数量"> </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="jumpdirectorys"
              >学科分类</el-button
            >
            <el-button type="text" size="medium" @click="jumTags"
              >学科标签</el-button
            >
            <el-button @click="handleEdit(scope.row)" type="text" size="medium"
              >修改</el-button
            >
            <el-button
              @click="handleDelete(scope.row)"
              type="text"
              size="medium"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" class="row-bg" justify="end" style="margin: 15px 0">
        <!-- 全局组件(分页) -->
        <pagination
          :total="total"
          :list="shuject"
          :getList="subGetList"
        ></pagination>
      </el-row>
    </el-card>

    <!-- 新增或修改dialog -->
    <editAdd
      :isShow="isShow"
      @onClickIsShow="isShowClick"
      :subjectDone="true"
      :title="title"
      @refresh="refresh"
      :rows="rows"
    ></editAdd>
  </div>
</template>

<script>
import { list, remove } from '@/api/hmmm/subjects'
import editAdd from '@/components/Subjects/editAdd'
export default {
  created () {
    this.subGetList()
  },
  data () {
    return {
      shuject: {
        page: 1,
        pagesize: 5,
        subjectName: ''
      },
      // 总条目数
      total: null,
      count: 0,
      // 表格数据
      subList: [],
      // 是否打开dilog
      isShow: false,
      // 判断是修改还是新增 false是修改 true是新增
      title: null,
      // 传给子组件当前选择条的信息
      rows: {}
    }
  },
  methods: {
    // 获取学科列表
    async subGetList () {
      const res = await list(this.shuject)
      console.log(res)
      this.count = res.data.counts
      this.subList = res.data.items
      this.total = res.data.counts
    },
    // 新增
    onSubmit () {
      this.isShow = true
      this.title = true
    },
    // 编辑
    handleEdit (row) {
      this.isShow = true
      this.title = false
      this.rows = row
      console.log(row)
    },
    // 清除表单内容
    resetFields () {
      this.$refs.subForm.resetFields()
    },
    // 搜索
    async query () {
      // console.log(this.subject.subjectName)
      const res = await list(this.shuject)
      this.subList = res.data.items
      this.subGetList()
      this.$message({
        message: '搜索成功',
        type: 'success'
      })
    },
    // 关闭dialog页面
    isShowClick (e) {
      this.isShow = e
    },
    // 子组件添加父组件刷新
    refresh () {
      this.subGetList()
    },
    // 跳转到学科分类页面
    jumpdirectorys () {
      this.$router.push('directorys')
      this.$message({
        message: '已跳转到学科分类页面',
        type: 'success'
      })
    },
    // 跳转到学科标签页面
    jumTags () {
      this.$router.push('tags')
      this.$message({
        message: '已跳转到标签分类页面',
        type: 'success'
      })
    },
    // 删除
    async handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(row.id)
        await remove(row.id)
        this.subGetList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    editAdd
  }
}
</script>

<style scoped>
</style>
