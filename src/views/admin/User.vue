<template>
    <Row style="width:100%;height:100%;">
        <Col span="4">
            <Menu active-name="用户管理" @on-select="onSelectMenu">
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
            /></Row>
            <Row style="width:100%;" v-if="showProgress">
                <Progress
                    :percent="percent"
                    :stroke-width="20"
                    status="active"
                    text-inside
                />
            </Row>
        </Col>
    </Row>
</template>
<script>
import UserApi from "./../../service/UserApi";
import ShareApi from "./../../service/ShareApi";
export default {
    data() {
        return {
            columns: [
                {
                    title: "ID",
                    key: "id"
                },
                {
                    title: "用户名",
                    key: "username"
                },
                {
                    title: "昵称",
                    key: "nickName"
                },
                {
                    title: "账号是否有效",
                    key: "available"
                },
                {
                    title: "操作",
                    key: "action",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            !params.row.available &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.open(params.row);
                                            }
                                        }
                                    },
                                    "公开"
                                ),
                            params.row.available &&
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.notOpen(params.row);
                                            }
                                        }
                                    },
                                    "禁用"
                                )
                        ]);
                    }
                }
            ],
            data: [],
            pageNum: 1,
            pageSize: 14,
            hasNextPage: true,
            total: 1,
            showProgress: false,
            percent: 0
        };
    },
    async created() {
        let result = await UserApi.listUsers(
            this.pageNum,
            this.pageSize,
            "available"
        );
        this.data = result.list;
        this.total = result.total;
    },
    methods: {
        /**
         * 解禁用户
         */
        async open(user) {
            this.showProgress = true;

            // 获取该用户所有share
            let shareList = await ShareApi.listMyShares(
                1,
                9999999,
                "id",
                user.id
            );
            shareList = shareList.shareList;
            this.percent = 10;

            // 改变该用户所有share的open属性为true
            for (let i = 0; i < shareList.length; i++) {
                await ShareApi.updateShare(shareList[i].id, user.id, true);
                this.percent = 10 + ((i + 1) / shareList.length) * 0.8 * 100;
            }

            // 该用户变为available true
            await UserApi.updateUser(user.id, true);
            this.percent = 100;

            // 通知和跳转
            this.$Notice.success({
                title: "解禁成功"
            });

            setTimeout(() => {
                this.$router.go(0);
            }, 300);
            this.showProgress = false;
        },
        /**
         * 禁用用户
         */
        async notOpen(user) {
            this.showProgress = true;
            // 获取该用户所有share
            let shareList = await ShareApi.listMyShares(
                1,
                9999999,
                "id",
                user.id
            );
            shareList = shareList.shareList;
            this.percent = 10;
            // 改变该用户所有share的open属性为false
            for (let i = 0; i < shareList.length; i++) {
                await ShareApi.updateShare(shareList[i].id, user.id, false);
                this.percent = 10 + ((i + 1) / shareList.length) * 0.8 * 100;
            }

            // 该用户变为available false
            await UserApi.updateUser(user.id, false);
            this.percent = 100;

            // 通知和跳转
            this.$Notice.success({
                title: "禁用成功"
            });

            setTimeout(() => {
                this.$router.go(0);
            }, 300);
            this.showProgress = false;
        },
        /**
         * 切换页码
         */
        async onChangePage(pageNum) {
            this.pageNum = pageNum;
            let result = await UserApi.listUsers(
                this.pageNum,
                this.pageSize,
                "available"
            );
            this.data = result.list;
            this.total = result.total;
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