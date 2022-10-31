<template>
  <div>
    <el-card class="box-card">
      <functionbar @query="query" @refresh="refresh"></functionbar>
      <!-- 全局组件(提示有多少条数据) -->
      <warning :count="counts"></warning>

      <el-table :data="direcList" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="subjectName" label="所属学科" width="180">
        </el-table-column>
        <el-table-column prop="directoryName" label="目录名称">
        </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
        <el-table-column prop="totals" label="面视题数量"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.state === 1 ? "已启用" : "已禁用" }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="300">
          <template v-slot="scope">
            <Operation
              :row="scope.row"
              @disableEdit="disableEdit"
              @deletes="deletes"
            ></Operation>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="margin: 15px 0">
        <!-- 全局组件(分页) -->
        <pagination
          :total="counts"
          :list="lists"
          :getList="getDirecList"
        ></pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Operation from '@/components/Operation/index.vue'
import { list, changeState, remove } from '@/api/hmmm/directorys'
import functionbar from '@/components/Directorys/functionbar'
export default {
  created () {
    this.getDirecList()
  },
  data () {
    return {
      lists: {
        page: 1,
        pagesize: 5,
        // 学科ID
        subjectID: null,
        // 目录名称
        directoryName: '',
        state: null
      },
      // 数据总条数
      counts: null,
      // 数据列表
      direcList: [],
      // 存放修改状态变量
      distate: {
        id: null,
        state: null
      },
      // 按钮是否禁用
      disabled: false
    }
  },
  methods: {
    // 获取目录数据
    async getDirecList () {
      const res = await list(this.lists)
      console.log(res)
      this.direcList = res.data.items
      this.counts = res.data.counts
    },
    // 搜索
    async query (parameter) {
      // console.log(parameter)
      this.lists.state = parameter.state
      this.lists.directoryName = parameter.directoryName
      console.log(this.lists)
      const res = await list(this.lists)
      console.log(res)
      this.getDirecList()
    },
    // 修改状态
    async disableEdit (row) {
      await changeState(row).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    // 删除
    async deletes (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove(row)
        this.getDirecList()
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
    },
    // 新增成功刷新页面
    refresh () {
      this.getDirecList()
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {
    functionbar, Operation
  }
}
</script>

  <style scoped>
</style>
