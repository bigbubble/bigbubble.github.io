<template lang="html">
    <ContentBody>
        <!-- header -->
        <template slot="header">

        </template>
        <!-- footer -->
        <template slot="footer">
            <Footer>
                <div style="text-align: center">
                    <hr style="height:1px;border:none;border-top:1px solid #555555;" />
                    <em>pengbo.me</em>
                </div>
            </Footer>
        </template>
    </ContentBody>
</template>
<script>
    import {Layout, Footer, Row, Col, Breadcrumb, BreadcrumbItem} from 'iview';
    import SearchSelect from '../../common/component/SearchSelect';
    import ContentBody from './ContentBody';
    export default {
        data:function () {
            return {}
        },
        components: {Layout, Row, Col, Footer, Breadcrumb, BreadcrumbItem, SearchSelect, ContentBody},
    }
</script>