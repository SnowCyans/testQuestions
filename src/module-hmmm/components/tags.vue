<template>
  <div>
    <el-card>
      <!-- 搜索栏组件 -->
      <functionbar
        :cataAndTags="cataAndTags"
        @query="query"
        @refresh="refresh"
      ></functionbar>
      <!-- 全局组件(数据总条数) -->
      <warning :count="counts"></warning>

      <el-table :data="tagsList" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="subjectName" label="所属学科" width="180">
        </el-table-column>
        <el-table-column prop="tagName" label="标签名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
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
              @refreshEdit="refreshEdit"
            ></Operation>
          </template>
        </el-table-column>
      </el-table>

      <!-- 全局组件(分页) -->
      <el-row type="flex" justify="end" style="margin: 15px 0">
        <pagination
          :total="counts"
          :list="tagsObj"
          :getList="getTageList"
        ></pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Operation from '@/components/Operation/index.vue'
import functionbar from '@/components/Directorys/functionbar'
import { list, changeState, remove } from '@/api/hmmm/tags'
export default {
  // provide () {
  //   return {
  //     cataAndTags: this.cataAndTags
  //   }
  // },
  created () {
    this.getTageList()
  },
  data () {
    return {
      tagsObj: {
        page: 1,
        pagesize: 5,
        // 学科Id
        subjectID: null,
        tagName: '',
        state: null
      },
      // 标签页面数据
      tagsList: [],
      // 总数
      counts: null,
      // 判断是标签组件还是目录组件(true是标签组件 false是目录组件)
      cataAndTags: true
    }
  },
  methods: {
    // 获取标签组件数据
    async getTageList () {
      const res = await list(this.tagsList)
      console.log(res)
      this.tagsList = res.data.items
      this.counts = res.data.counts
    },
    // 搜索
    async query (parameter) {
      this.tagsObj.state = parameter.state
      this.tagsObj.tagName = parameter.tagName
      await list(this.tagsObj)
      this.getTageList()
    },
    // 新增后刷新页面
    refresh () {
      this.getTageList()
    },
    // 修改后刷新页面
    refreshEdit () {
      this.getTageList()
    },
    // 修改状态
    async disableEdit (e) {
      console.log(e)
      await changeState(e)
      this.$message({
        message: '修改状态成功',
        type: 'success'
      })
    },
    // 删除
    async deletes (e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove(e)
        this.getTageList()
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
  components: { functionbar, Operation }
}
</script>

<style scoped lang='less'>
</style>
