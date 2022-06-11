//x优化 component异步
// const JModal = () => import('./JModal')
import JModal from './JModal'
const JFormContainer = () => import('./JFormContainer.vue')
const JPopup = () => import('./JPopup.vue')
const JMarkdownEditor = () => import('./JMarkdownEditor')
const JCodeEditor = () => import('./JCodeEditor.vue')
const JEditor = () => import('./JEditor.vue')
const JEditableTable = () => import('./JEditableTable.vue')
const JAreaLinkage = () => import('./JAreaLinkage.vue')
const JSuperQuery = () => import('./JSuperQuery.vue')
const JUpload = () => import('./JUpload.vue')
const JTreeSelect = () => import('./JTreeSelect.vue')
const JCategorySelect = () => import('./JCategorySelect.vue')
const JImageUpload = () => import('./JImageUpload.vue')
const JImportModal = () => import('./JImportModal.vue')
const JTreeDict = () => import('./JTreeDict.vue')
const JCheckbox = () => import('./JCheckbox.vue')
const JCron = () => import('./JCron.vue')
const JDate = () => import('./JDate.vue')
const JEllipsis = () => import('./JEllipsis.vue')
const JInput = () => import('./JInput.vue')
const JPopupOnlReport = () => import('./modal/JPopupOnlReport.vue')
const JFilePop = () => import('./minipop/JFilePop.vue')
const JInputPop = () => import('./minipop/JInputPop.vue')
const JSelectMultiple = () => import('./JSelectMultiple.vue')
const JSlider = () => import('./JSlider.vue')
const JSwitch = () => import('./JSwitch.vue')
const JTime = () => import('./JTime.vue')
const JTreeTable = () => import('./JTreeTable.vue')
import JEasyCron from "@/components/jeecg/JEasyCron";

//jeecgbiz
const JSelectDepart = () => import('../jeecgbiz/JSelectDepart.vue')
const JSelectMultiUser = () => import('../jeecgbiz/JSelectMultiUser.vue')
const JSelectPosition = () => import('../jeecgbiz/JSelectPosition.vue')
const JSelectRole = () => import('../jeecgbiz/JSelectRole.vue')
const JSelectUserByDep = () => import('../jeecgbiz/JSelectUserByDep.vue')

//引入需要全局注册的js函数和变量
import { Modal, notification,message } from 'ant-design-vue'
import lodash_object from 'lodash'
import debounce from 'lodash/debounce'
import pick from 'lodash.pick'
import data from 'china-area-data'

export default {
  install(Vue) {
    Vue.use(JModal)
    Vue.component('JMarkdownEditor', JMarkdownEditor)
    Vue.component('JPopupOnlReport', JPopupOnlReport)
    Vue.component('JFilePop', JFilePop)
    Vue.component('JInputPop', JInputPop)
    Vue.component('JAreaLinkage', JAreaLinkage)
    Vue.component('JCategorySelect', JCategorySelect)
    Vue.component('JCheckbox', JCheckbox)
    Vue.component('JCodeEditor', JCodeEditor)
    Vue.component('JCron', JCron)
    Vue.component('JDate', JDate)
    Vue.component('JEditableTable', JEditableTable)
    Vue.component('JEditor', JEditor)
    Vue.component('JEllipsis', JEllipsis)
    Vue.component('JFormContainer', JFormContainer)
    Vue.component('JImageUpload', JImageUpload)
    Vue.component('JImportModal', JImportModal)
    Vue.component('JInput', JInput)
    Vue.component('JPopup', JPopup)
    Vue.component('JSelectMultiple', JSelectMultiple)
    Vue.component('JSlider', JSlider)
    Vue.component('JSuperQuery', JSuperQuery)
    Vue.component('JSwitch', JSwitch)
    Vue.component('JTime', JTime)
    Vue.component('JTreeDict', JTreeDict)
    Vue.component('JTreeSelect', JTreeSelect)
    Vue.component('JTreeTable', JTreeTable)
    Vue.component('JUpload', JUpload)

    //jeecgbiz
    Vue.component('JSelectDepart', JSelectDepart)
    Vue.component('JSelectMultiUser', JSelectMultiUser)
    Vue.component('JSelectPosition', JSelectPosition)
    Vue.component('JSelectRole', JSelectRole)
    Vue.component('JSelectUserByDep', JSelectUserByDep)
    Vue.component(JEasyCron.name, JEasyCron)

    //注册全局js函数和变量
    Vue.prototype.$Jnotification = notification
    Vue.prototype.$Jmodal = Modal
    Vue.prototype.$Jmessage = message
    Vue.prototype.$Jlodash = lodash_object
    Vue.prototype.$Jdebounce= debounce
    Vue.prototype.$Jpick = pick
    Vue.prototype.$Jpcaa = data
  }
}