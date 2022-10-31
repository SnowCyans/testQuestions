<template>
  <div>
    <el-card class="box-card">
      <functionbar @query="query" @refresh="refresh"></functionbar>
      <!-- 警告框组件(全局) -->
      <Warning :count="count"></Warning>

      <template>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="id" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话"> </el-table-column>
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column prop="permission_group_title" label="权限组名称">
          </el-table-column>
          <el-table-column prop="role" label="角色"> </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" style="margin: 15px 0">
          <pagination
            :total="count"
            :list="userObj"
            :getList="getList"
          ></pagination>
        </el-row>
      </template>
    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/base/users'
import functionbar from '@/components/Directorys/functionbar'
export default {
  created () {
    this.getList()
  },
  data () {
    return {
      userObj: {
        page: 1,
        pagesize: 5,
        keyword: ''
      },
      // 总数
      count: null,
      // 存放user列表
      list: []
    }
  },
  methods: {
    // 获取用户列表
    async getList () {
      const res = await list(this.userObj)
      console.log(res)
      this.list = res.data.list
      this.count = res.data.counts
    },
    query (e) {
      console.log(e)
    },
    refresh () {
      console.log()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { functionbar }
}
</script>

<style scoped lang='less'>
</style>
