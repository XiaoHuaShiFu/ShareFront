<template>
    <Row style="width:100%;height:100%;#fff">
        <Col span="4">
            <Menu active-name="操作记录" @on-select="onSelectMenu">
                <MenuItem name="用户管理">
                    <Icon type="md-person" />
                    用户管理
                </MenuItem>
                <MenuItem name="敏感词管理">
                    <Icon type="logo-wordpress" />
                    敏感词管理
                </MenuItem>
                <MenuItem name="操作记录">
                    <Icon type="logo-wordpress" />
                    操作记录
                </MenuItem>
            </Menu>
        </Col>
        <Col span="20">
            <Row><Table border :columns="columns" :data="data"></Table></Row>
            <Row style="margin-top:10px;">
                <Page
                        @on-change="onChangePage"
                        :total="total"
                        :page-size="pageSize"
                        :current="pageNum"
                />
            </Row>
        </Col>
    </Row>
</template>
<script>
import AdminApi from "./../../service/AdminApi";
export default {
    data() {
        return {
            columns: [
                {
                    title: "ID",
                    key: "id",
                    width: 200
                },
                {
                    title: "操作内容",
                    key: "content"
                },
                {
                    title: "操作时间",
                    key: "createTime",
                    width: 300
                },
                
            ],
            data: [],
            pageNum: 1,
            pageSize: 14,
            hasNextPage: true,
            total: 1,
        };
    },
    async created() {
        let result = await AdminApi.listAdminLogs(
            this.pageNum,
            this.pageSize
        );
        this.data = result.data.list;
        this.total = result.data.total;
    },
    methods: {
        /**
         * 切换页码
         */
        async onChangePage(pageNum) {
            this.pageNum = pageNum;
            let result = await AdminApi.listAdminLogs(
                this.pageNum,
                this.pageSize
            );
            this.data = result.data.list;
            this.total = result.data.total;
        },
        /**
         * 页面切换
         */
        onSelectMenu(name) {
            if (name == "用户管理") {
                this.$router.push({
                    path: "/admin/user"
                });
            } else if (name == "敏感词管理") {
                this.$router.push({
                    path: "/admin/sensitive"
                });
            } else if (name == "操作记录") {
                this.$router.push({
                    path: "/admin/log"
                });
            }
        }
    }
};
</script>

<style>
html {
    background: #fff;
}
</style>