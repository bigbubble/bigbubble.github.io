<template>
    <Layout>
        <slot name="header"></slot>
        <Content class="pb-layout-content">
            <Navigator :pathList="['Home','asdf','ddd']" />
            <Content class="pb-layout-inner-content">

            </Content>
        </Content>
        <slot name="footer"></slot>
    </Layout>
</template>
<script>
    import {Layout,Content} from 'iview';
    import Navigator from '../../common/component/Navigator';
    export default {
        components: {Navigator, Layout, Content},
        data:function () {
            return {}
        },
    }
</script>