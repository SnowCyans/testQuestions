<template>
  <div>
    <!-- 新增 -->
    <el-dialog
      v-if="title"
      @close="close"
      title="提示"
      :visible.sync="isShow"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <!-- 学科显示 -->
      <el-form :model="subject" :rules="rules" v-if="subjectDone" ref="subForm">
        <el-form-item
          :label="titles + '学科'"
          label-width="80px"
          prop="subjectName"
        >
          <el-input v-model.trim="subject.subjectName"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            @change="swChangeEdit"
            v-model="subject.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <!-- 目录和标签显示 -->
      <el-form :model="catalogue" :rules="rules" v-else ref="cataForm">
        <el-form-item label="所属学科" prop="value">
          <el-select
            v-model="catalogue.value"
            placeholder="请选择"
            @change="change"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 标签名称 -->
        <el-form-item
          label="标签名称"
          label-width="80px"
          prop="tagName"
          v-if="cataAndTags"
        >
          <el-input v-model.trim="catalogue.tagName"></el-input>
        </el-form-item>
        <!-- 目录名称 -->
        <el-form-item
          label="目录名称"
          label-width="80px"
          prop="directoryName"
          v-else
        >
          <el-input v-model.trim="catalogue.directoryName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClickIsShow">取 消</el-button>
        <el-button type="primary" @click="onclick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      v-else
      @close="close"
      title="提示"
      :visible.sync="isShow"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <!-- 学科显示 -->
      <el-form :model="rows" :rules="rules" v-if="subjectDone" ref="subForm">
        <el-form-item
          :label="titles + '学科'"
          label-width="80px"
          prop="subjectName"
        >
          <el-input v-model.trim="rows.subjectName"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="rows.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <!-- 目录和标签显示 -->
      <el-form :model="catalogueEditObj" :rules="rules" v-else ref="cataForm">
        <el-form-item label="所属学科" prop="value">
          <el-select
            v-model="catalogueEditObj.subjectID"
            placeholder="请选择"
            @change="change"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 标签名称 -->
        <el-form-item
          label="标签名称"
          label-width="80px"
          prop="tagName"
          v-if="cataAndTags"
        >
          <el-input v-model.trim="catalogueEditObj.tagName"></el-input>
        </el-form-item>
        <!-- 目录名称 -->
        <el-form-item
          label="目录名称"
          label-width="80px"
          prop="directoryName"
          v-else
        >
          <el-input v-model.trim="catalogueEditObj.directoryName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClickIsShow">取 消</el-button>
        <el-button type="primary" @click="onclick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import _ from 'lodash'
import { tagsAdd, tagsUpdate } from '@/api/hmmm/tags'
import { direAdd } from '@/api/hmmm/directorys'
import { simple, add } from '@/api/hmmm/subjects'

export default {
  // inject: ['cataAndTags'],
  props: {
    isShow: {
      type: Boolean,
      require: true,
      default: false
    },
    // 学科组件标识
    subjectDone: {
      type: Boolean
    },
    // 判断是修改还是新增 false是修改 true是新增
    title: {
      type: Boolean
    },
    rows: {
      type: Object
    },
    cataAndTags: {
      type: Boolean
    }
  },
  created () {
    this.simple()
  },
  data () {
    return {
      // 学科 (新增)
      subject: {
        id: null,
        subjectName: '',
        isFrontDisplay: null
      },
      // 学科修改
      // subjectObj: _.cloneDeep(this.rows),
      subObj: this.rows,
      // subjectObj: { ...this.rows },

      // 目录和标签 (新增)
      catalogue: {
        subjectID: null,
        // 目录
        directoryName: '',
        // 标签
        tagName: '',
        value: ''
      },
      // 目录和标签 (修改)
      catalogueEditObj: { ...this.rows },
      // 学科简单列表数据 (下拉框用)
      options: [],
      rules: {
        subjectName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        directoryName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        tagName: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭dialog
    onClickIsShow () {
      this.$emit('onClickIsShow', !this.isShow)
    },
    // 获取学科简单列表
    async simple () {
      const res = await simple()
      console.log(res)
      this.options = res.data
    },
    // 选中下拉框是触发
    change (val) {
      console.log(val)
      this.catalogue.subjectID = val
    },
    // 点击开关组件触发
    swChangeEdit (val) {
      console.log(val)
      this.subject.isFrontDisplay = val
      console.log(this.subject.isFrontDisplay)
    },
    // 新增和修改
    async onclick () {
      // 为true走新增
      if (this.title) {
        // 学科新增
        if (this.subjectDone) {
          await add(this.subject)
        } else if (this.cataAndTags) {
          // 标签新增
          await tagsAdd(this.catalogue)
        } else {
          // 目录新增
          await direAdd(this.catalogue)
          this.$emit('refresh')
        }
        this.$emit('refresh')
        this.onClickIsShow()
        this.$message({
          message: '新增成功',
          type: 'success'
        })
      } else {
        // 否则走修改
        if (this.subjectDone) {
          // 学科修改
          console.log('学科修改')
          console.log(this.subObj)
          console.log(this.rows)
        } else if (this.cataAndTags) {
          // 标签修改
          await tagsUpdate(this.catalogueEditObj)
        } else {
          // 目录修改
          console.log('目录修改')
        }
        // this.onClickIsShow()
        // this.$emit('refreshEdit')
      }
    },
    // 关闭dialog清除表单内容
    close () {
      if (this.subjectDone) {
        this.$refs.subForm.resetFields()
      } else {
        this.$refs.cataForm.resetFields()
      }
    }
  },
  computed: {
    titles () {
      return this.title ? '新增' : '修改'
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
