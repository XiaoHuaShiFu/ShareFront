<template>
    <div class="container">
        <Header></Header>
        <Row class="content" style="margin-top:10px;">
            <Col span="4.2" class="centent-left">
                <Menu
                    :active-name="activeName"
                    @on-select="onSelectMenu"
                    style="z-index:1"
                >
                    <MenuItem name="首页">
                        首页
                    </MenuItem>
                    <MenuItem name="我的分享">
                        我的分享
                    </MenuItem>
                    <MenuItem name="我的收藏">
                        我的收藏
                    </MenuItem>
                    <MenuItem name="我的消息">
                        我的消息
                    </MenuItem>
                </Menu>
            </Col>
            <Col span="10" class="centent-center">
                <Card style="background:#F2F2F5; font-weight:bold; color:#333">
                    我的消息
                    <div style="display:inline;font-weight:normal;">
                        （共{{ total }}条）
                    </div>
                </Card>
                <div style="height:10px"></div>
                <Row>
                    <!-- 开始 -->
                    <!-- <Col span="24" style="height:50px;"
                            ><Row>{{ userNotice.content }} </Row>
                            <Row>{{ userNotice.noticeTime }}</Row>
                            {{ userNotice.keyValue }}
                        </Col> -->
                    <Card
                        v-for="userNotice in userNoticeList"
                        :key="userNotice.id"
                        style="width:100%;height:auto; background:#F2F2F5;margin-bottom:10px;"
                    >
                        <Row class="share-container">
                            <Col span="3" class="avatar">
                                <Avatar
                                    :src="userNotice.keyValue.avatarUrl"
                                    size="60"
                                />
                            </Col>
                            <Col span="21" class="share-content">
                                <Row
                                    style="color:#555;display:flex; font-size:14px; font-weight:bold; margin-left:1px;"
                                >
                                    {{ userNotice.keyValue.nickName }}
                                </Row>
                                <Row
                                    style="display:flex; font-size:13px;color:#aaa; "
                                    >{{ userNotice.noticeTime }}</Row
                                >
                                <Row>
                                    <a
                                        @click="toNoticePage(userNotice)"
                                        style="display: flex; color:#333;font-size:14px;text-align:left;"
                                        >{{ userNotice.content }}</a
                                    >
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                    <!-- 结束 -->
                </Row>
            </Col>
            <div style="width:10px"></div>
            <Col span="5" class="centent-right">
                <Card style="background:#F2F2F5;">
                    <Row>
                        <Avatar size="50" :src="user.avatarUrl" />
                    </Row>
                    <Row
                        style="font-size:20px; font-weight:bold; line-height:25px;"
                        >{{ user.nickName }}
                    </Row>
                    <Row
                        style="display: flex; flex-direction: row; justify-content: center;"
                    >
                        <Col span="5">
                            <Row style="font-size:15px; font-weight:bold;">{{
                                user.collections
                            }}</Row>
                            <Row>收藏</Row>
                        </Col>
                        <Col
                            span="1"
                            style="display: flex; flex-direction: row; justify-content: center;align-items: center;"
                        >
                            <div
                                style="border-left:1px solid #ccc; height:80%;"
                            ></div>
                        </Col>
                        <Col span="5">
                            <Row style="font-size:15px; font-weight:bold;">{{
                                user.comments
                            }}</Row>
                            <Row>评论</Row>
                        </Col>
                        <Col
                            span="1"
                            style="display: flex; flex-direction: row; justify-content: center;align-items: center;"
                        >
                            <div
                                style="border-left:1px solid #ccc; height:80%;"
                            ></div>
                        </Col>
                        <Col span="5">
                            <Row style="font-size:15px; font-weight:bold;">{{
                                user.shares
                            }}</Row>
                            <Row>分享</Row>
                        </Col>
                    </Row>
                </Card>
                <div style="height:10px"></div>
                <Card style="background:#F2F2F5">
                    <p slot="title" style="font-weight:bold;text-align:left;">
                        分享意见反馈
                    </p>
                    <div
                        style="display:flex; flex-direction:column; align-items: flex-start;text-align:left;"
                    >
                        <Row
                            >欢迎使用分享并提出宝贵建议。请点击这里提交分享意见反馈。</Row
                        >
                        <Row style="color:#ff8140">分享常见问题</Row>
                        <Row style="color:#ff8140">分享客服专区</Row>
                        <Row style="color:#ff8140"
                            >全国人大常委会《关于加强网络信息保护的决定》</Row
                        >
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="footer">
            <Footer class="layout-footer-center"></Footer>
        </Row>
        <BackTop></BackTop>
    </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

import UserApi from "./../service/UserApi";
import UserNoticeApi from "./../service/UserNoticeApi";
export default {
    components: {
        Footer,
        Header
    },
    data() {
        return {
            user: {},
            userNoticeList: [],
            pageNum: 1,
            pageSize: 10,
            hasNextPage: true,
            activeName: "我的消息",
            total: 0
        };
    },
    async created() {
        // 加载页面数据
        let userId = sessionStorage.getItem("id");
        this.user = await UserApi.getUserAndSaveInSessionStorage(userId);
        let result = await UserNoticeApi.listUserNotices(
            1,
            this.pageSize,
            userId,
            false
        );
        this.userNoticeList = result.data.list;
        this.total = result.data.total;

        // 监听触底事件
        let that = this;
        window.onscroll = function() {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            var windowHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            var scrollHeight =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight;

            if (scrollTop + windowHeight == scrollHeight) {
                that.pushUserNoticeList();
            }
        };
    },
    methods: {
        /**
         * 加载下一页
         */
        async pushUserNoticeList() {
            let result = await UserNoticeApi.listUserNotices(
                this.pageNum + 1,
                this.pageSize,
                this.user.id,
                false
            );
            let userNoticeList0 = result.data.list;
            this.total = result.data.total;

            if (userNoticeList0.length > 0) {
                for (let i = 0; i < userNoticeList0.length; i++) {
                    this.userNoticeList.push(userNoticeList0[i]);
                }

                this.pageNum++;
            } else {
                this.$Message.success("没有更多的通知了！！！");
            }
        },
        /**
         * 切换页面
         */
        onSelectMenu(name) {
            if (name == "首页") {
                this.$router.push({
                    path: "/user/home"
                });
            } else if (name == "我的收藏") {
                this.$router.push({
                    path: "/user/home/collection"
                });
            } else if (name == "我的分享") {
                this.$router.push({
                    path: "/user/home/myshare"
                });
            } else if (name == "我的消息") {
                this.$router.push({
                    path: "/user/home/mymessage"
                });
            }
        },
        /**
         * 跳转到消息的对应页面
         */
        toNoticePage(userNotice) {
            this.$router.push({
                path: "/share",
                query: {
                    shareId: userNotice.keyValue.shareId
                }
            });
        }
    }
};
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.header {
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
}
.content-container {
    height: 100%;
    width: 70%;
    border: 1px solid red;
}
.centent-left {
    height: 100%;
}
.centent-center {
    height: 100%;
}
.centent-right {
    height: 100%;
}
.top {
    padding: 10px;
    background: rgba(0, 153, 229, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
</style>