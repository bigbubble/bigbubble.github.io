<template>
    <Breadcrumb :style="{margin: '24px 0 24px 24px'}">
        <BreadcrumbItem v-for="item in pathList">{{item}}</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
    import {Breadcrumb, BreadcrumbItem} from 'iview';
    export default {
        components:{Breadcrumb, BreadcrumbItem},
        data:function () {
          return {}
        },
        props:{
            pathList: Array
        }
    }
</script>