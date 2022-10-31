<template>
  <div>
    <el-form
      style="margin: '15px 0'"
      :inline="true"
      :model="list"
      class="demo-form-inline"
      ref="listForm"
    >
      <!-- 标签名称 -->
      <el-form-item
        :label="label + '名称'"
        prop="directoryName"
        v-if="cataAndTags"
      >
        <el-input v-model.trim="list.tagName"></el-input>
      </el-form-item>
      <!-- 目录名称 -->
      <el-form-item :label="label + '名称'" prop="tagName" v-else>
        <el-input v-model.trim="list.directoryName"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="value">
        <el-select v-model="list.value" placeholder="请选择" @change="onChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="defaule" @click="resetForm('listForm')"
          >清除</el-button
        >
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="success" icon="el-icon-edit" @click="handAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <editAdd
      :subjectDone="false"
      :isShow="isShow"
      :cataAndTags="cataAndTags"
      @onClickIsShow="onClickIsShow"
      :title="title"
      @refresh="refresh"
    ></editAdd>
  </div>
</template>

<script>
import editAdd from '@/components/Subjects/editAdd'
// 将封装好的状态导入进来
import { status } from '@/module-hmmm/components/constants'
export default {
  // inject: ['cataAndTags'],
  props: {
    cataAndTags: {
      type: Boolean
    }
  },
  created () {
  },
  data () {
    return {
      list: {
        // 目标名称
        directoryName: '',
        // 标签名称
        tagName: '',
        region: null,
        state: null,
        value: ''
      },
      options: status,
      isShow: false,
      // 判断是修改还是新增 false是修改 true是新增
      title: null

    }
  },
  methods: {
    // 清除表单数据
    resetForm (listForm) {
      this.$refs[listForm].resetFields()
    },
    query () {
      this.$emit('query', this.list)
      // console.log(this.list)
    },
    handAdd () {
      this.isShow = true
      this.title = true
    },
    // 选中下拉框触发
    onChange (val) {
      this.list.state = val
    },
    // 关闭dialog
    onClickIsShow (e) {
      this.isShow = e
    },
    refresh () {
      this.$emit('refresh')
    }
  },
  computed: {
    label () {
      return this.cataAndTags ? '标签' : '目录'
    }
  },
  watch: {},
  filters: {},
  components: {
    editAdd
  }
}
</script>

<style scoped>
</style>
