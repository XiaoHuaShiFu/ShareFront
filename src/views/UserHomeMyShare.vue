<template>
    <div class="container">
        <Row class="header" justify="center" align="middle">
            <Col span="4"><img src="/images/logo.jpg" width="150px" /> </Col>
            <Col span="16"> <Search></Search></Col>
            <Col span="4"> </Col>
        </Row>
        <Row class="content">
            <Col span="4.2" class="centent-left">
                <Menu :active-name="activeName" @on-select="onSelectMenu">
                    <MenuItem name="首页">
                        首页
                    </MenuItem>
                    <MenuItem name="我的分享">
                        我的分享
                    </MenuItem>
                    <MenuItem name="我的收藏">
                        我的收藏
                    </MenuItem>
                </Menu>
            </Col>
            <Col span="10" class="centent-center">
                <Card style="background:#F2F2F5; font-weight:bold; color:#333">
                    我的分享
                    <div style="display:inline;font-weight:normal;">
                        （共{{ total }}条）
                    </div>
                </Card>
                <div style="height:10px"></div>
                <Row>
                    <Share :shareList="shareList" :showDropdown="true"></Share>
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
                        微博意见反馈
                    </p>
                    <div
                        style="display:flex; flex-direction:column; align-items: flex-start;text-align:left;"
                    >
                        <Row
                            >欢迎使用微博并提出宝贵建议。请点击这里提交微博意见反馈。</Row
                        >
                        <Row style="color:#ff8140">微博常见问题</Row>
                        <Row style="color:#ff8140">微博客服专区</Row>
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
import Search from "@/components/Search.vue";

import Share from "@/components/Share3.vue";
import UserApi from "./../service/UserApi";
import ShareApi from "./../service/ShareApi";

import {
    Row,
    Col,
    BackTop,
    Menu,
    MenuItem,
    Card,
    Avatar,
    Notice,
    Message
} from "view-design";
export default {
    components: {
        Footer,
        Row,
        Col,
        Search,
        BackTop,
        Menu,
        MenuItem,
        Card,
        Avatar,
        Share
    },
    data() {
        return {
            list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            user: {},
            shareList: [],
            shareContent: "",
            share: {
                content: "",
                open: true,
                imageList: []
            },
            pageNum: 1,
            hasNextPage: true,
            activeName: "我的分享",
            total: 0
        };
    },
    async created() {
        // 加载页面数据
        let userId = sessionStorage.getItem("id");
        this.user = await UserApi.getUserAndSaveInSessionStorage(userId);
        let result = await ShareApi.listMyShares(1, 10, "share_time", userId);
        this.shareList = result.shareList;
        this.total = result.total;

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
                that.pushShareList();
            }
        };

        // 禁止后退
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function() {
            history.pushState(null, null, document.URL);
        });
    },
    methods: {
        async saveShare() {
            if (this.share.imageList.length < 1) {
                Notice.warning({
                    title: "分享的图片数量不能少于1"
                });
            } else {
                console.log(this.share.imageList);
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                let imageList0 = [];
                for (let i = 0; i < this.share.imageList.length; i++) {
                    imageList0.push(this.share.imageList[i].file);
                }
                let res = await this.$Http.postShares(
                    {
                        userId: sessionStorage.getItem("id"),
                        content: this.share.content,
                        open: this.share.open,
                        imageList: imageList0
                    },
                    true,
                    config
                );
                if (res.status == 201) {
                    Notice.success({
                        title: "分享成功"
                    });
                    this.$router.go(0);
                } else if (res.status == 403) {
                    Notice.success({
                        title: "分享失败",
                        desc: "未登录"
                    });
                } else if (res.status == 400) {
                    Notice.warning({
                        title: "评论失败",
                        desc: res.data.message
                    });
                }
            }
        },
        changeOpen(open) {
            if (open == "公开") {
                this.share.open = true;
            } else if (open == "不公开") {
                this.share.open = false;
            }
        },
        /**
         * 接收图片列表
         */
        reveiveImageList(shareImageList) {
            this.share.imageList = shareImageList;
        },
        /**
         * 加载下一页
         */
        async pushShareList() {
            let result = await ShareApi.listMyShares(
                this.pageNum + 1,
                10,
                "share_time",
                this.user.id
            );
            let shareList0 = result.shareList;
            this.total = result.total;

            if (shareList0.length > 0) {
                for (let i = 0; i < shareList0.length; i++) {
                    this.shareList.push(shareList0[i].share);
                }

                this.pageNum++;
            } else {
                Message.success("没有更多的分享了！！！");
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
            }
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