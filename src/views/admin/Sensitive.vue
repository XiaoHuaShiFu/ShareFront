<template>
    <Row style="width:100%;height:100%;#fff">
        <Col span="4">
            <Menu active-name="敏感词管理" @on-select="onSelectMenu">
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
                <Col
                    span="3"
                    style="height:30px;display:inline;line-height:30px;font-size:20px;"
                    @click="addSensitiveWord"
                    ><Icon
                        @click="addSensitiveWord"
                        type="md-add-circle"
                        size="30"
                    />添加敏感词</Col
                >
                <Col span="18"
                    ><Page
                        @on-change="onChangePage"
                        :total="total"
                        :page-size="pageSize"
                        :current="pageNum"
                /></Col>
            </Row>
            <Row style="width:100%;" v-if="showProgress">
                <Progress
                    :percent="percent"
                    :stroke-width="20"
                    status="active"
                    text-inside
                />
            </Row>
        </Col>
        <Modal v-model="isAddSensitiveWord" title="添加敏感词" @on-ok="ok">
            <Input
                v-model="sensitiveWord"
                placeholder="输入敏感词"
                style="width: 100%"
            />
        </Modal>
    </Row>
</template>
<script>
import SensitiveWordApi from "./../../service/SensitiveWordApi";
export default {
    data() {
        return {
            columns: [
                {
                    title: "ID",
                    key: "id"
                },
                {
                    title: "敏感词",
                    key: "sensitiveWord"
                },
                {
                    title: "创建时间",
                    key: "createTime"
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
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.delete(params.row);
                                            }
                                        }
                                    },
                                    "删除"
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
            percent: 0,
            isAddSensitiveWord: false,
            sensitiveWord: ""
        };
    },
    async created() {
        let result = await SensitiveWordApi.listSensitiveWords(
            this.pageNum,
            this.pageSize
        );
        this.data = result.data.list;
        this.total = result.data.total;
    },
    methods: {
        /**
         * 删除敏感词
         */
        async delete(sensitiveWord) {
            this.showProgress = true;
            this.percent = 10;
            await SensitiveWordApi.deleteSensitiveWord(sensitiveWord.id);

            // 通知和跳转
            this.$Notice.success({
                title: "删除成功"
            });
            this.percent = 100;
            setTimeout(() => {
                this.$router.go(0);
            }, 300);
            this.showProgress = false;
        },
        /**
         * 添加敏感词
         */
        async ok() {
            this.showProgress = true;
            this.percent = 10;

            if (this.sensitiveWord == "" || this.sensitiveWord == null) {
                this.$Notice.warning({
                    title: "添加失败",
                    desc: "敏感词不能为空"
                });
            } else {
                let result = await SensitiveWordApi.saveSensitiveWord(
                    this.sensitiveWord
                );
                // 添加成功
                if (result.status == 201) {
                    this.percent = 100;

                    // 通知和跳转
                    this.$Notice.success({
                        title: "添加敏感词成功"
                    });

                    setTimeout(() => {
                        this.$router.go(0);
                    }, 300);
                } 
                // 添加失败
                else {
                    this.$Notice.warning({
                        title: "添加敏感词失败",
                        desc: "敏感词" + this.sensitiveWord + "已经存在"
                    });
                }
            }

            this.percent = 0;
            this.showProgress = false;
        },
        /**
         * 切换页码
         */
        async onChangePage(pageNum) {
            this.pageNum = pageNum;
            let result = await SensitiveWordApi.listSensitiveWords(
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
        },
        /**
         * 添加敏感词
         */
        addSensitiveWord() {
            this.isAddSensitiveWord = true;
        }
    }
};
</script>

<style>
html {
    background: #fff;
}
</style>