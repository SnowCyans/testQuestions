
import Warning from './Warning/index.vue'
import pagination from './Directorys/pagination'

export default {
  install (Vue) {
    Vue.component('Warning', Warning)
    Vue.component('pagination', pagination)
  }
}
