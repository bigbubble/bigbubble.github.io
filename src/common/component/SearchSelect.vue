<template lang="html">
    <div style="margin: 10px 20px">
        <Select filterable style="width: 200px;height: 40px;line-height: 30px" placeholder="搜索"
            @on-change="onChange">
            <Option v-for="item in this.searchList" :value="item.link" :key="item.link">{{item.value}}</Option>
        </Select>
    </div>
</template>
<script>
    import {Select, Option} from 'iview';
    import {searchList} from '../../common/config/searchList';
    export default {
        components: {Select, Option},
        data: function() {
            return {searchList: searchList}
        },
        methods:{
            onChange(value){
               window.location.href=value;
            }
        }

    }
</script>
