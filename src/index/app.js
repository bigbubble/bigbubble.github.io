import Vue from 'vue';
import 'iview/dist/styles/iview.css';
import '../common/common.less';
import Layout2 from './component/Layout';

new Vue({
    render: h => h(Layout2)
}).$mount('#app');