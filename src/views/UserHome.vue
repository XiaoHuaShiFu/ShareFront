<template>
    <div class="container">
        <Row class="header" justify="center" align="middle">
            <Col span="4"><img src="/images/logo.jpg" width="150px" /> </Col>
            <Col span="16"> <Search></Search></Col>
            <Col span="4"> </Col>
        </Row>
        <Row class="content">
            <Col span="4.2" class="centent-left">
                <Menu active-name="首页">
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
                <Card style="background:#F2F2F5">
                    <Form ref="share" :model="share" inline>
                        <Row
                            ><Input
                                v-model="share.content"
                                maxlength="300"
                                show-word-limit
                                type="textarea"
                                placeholder="分享些什么。。。"
                                style="width:100%; "
                                :rows="4"
                        /></Row>
                        <Row style="margin-top:10px;">
                            <Col
                                span="17"
                                style="display: flex; flex-direction: row; align-items: left;"
                            >
                                <UploadImageList
                                    @receive="reveiveImageList"
                                ></UploadImageList>
                            </Col>
                            <Col span="3" style="height:100%; margin-top:5px;">
                                <Dropdown
                                    trigger="click"
                                    @on-click="changeOpen"
                                    style="margin-top:12px;"
                                >
                                    <a href="javascript:void(0)">
                                        <div v-if="share.open">
                                            公开<Icon
                                                type="ios-arrow-down"
                                            ></Icon>
                                        </div>
                                        <div v-if="!share.open">
                                            不公开<Icon
                                                type="ios-arrow-down"
                                            ></Icon>
                                        </div>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="公开"
                                            >公开</DropdownItem
                                        >
                                        <DropdownItem name="不公开"
                                            >不公开</DropdownItem
                                        >
                                    </DropdownMenu>
                                </Dropdown></Col
                            >
                            <Col span="4"
                                ><Button
                                    type="info"
                                    @click="saveShare()"
                                    ghost
                                    style="width:80px;margin-top:12px;"
                                    >发布</Button
                                ></Col
                            >
                        </Row>
                    </Form>
                </Card>
                <div style="height:10px"></div>
                <Row>
                    <Share :shareList="shareList"></Share>
                </Row>
            </Col>
            <div style="width:10px"></div>
            <Col span="5" class="centent-right">
                <Card style="background:#F2F2F5;">
                    <Row>
                        <Avatar size="60" :src="user.avatarUrl" />
                    </Row>
                    <Row
                        style="font-size:20px; font-weight:bold; line-height:25px;"
                        >{{ user.nickName }}</Row
                    >
                    <Row
                        style="display: flex; flex-direction: row; justify-content: center;"
                    >
                        <Col span="5">
                            <Row style="font-size:15px; font-weight:bold;">{{
                                user.followings
                            }}</Row>
                            <Row>关注</Row>
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
                                user.followers
                            }}</Row>
                            <Row>粉丝</Row>
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
                <RankLike
                    :shareListWithLike="shareLikeRankList"
                    :title="shareLikeRankTitle"
                ></RankLike>
                <div style="height:10px"></div>
                <RankNew
                    :shareListWithNew="shareLikeNewList"
                    :title="shareNewRankTitle"
                ></RankNew>
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
import RankLike from "@/components/RankLike.vue";
import RankNew from "@/components/RankNew.vue";
import UploadImageList from "@/components/UploadImageList.vue";
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
    Input,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Notice
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
        RankLike,
        RankNew,
        Share,
        Input,
        Button,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Icon,
        UploadImageList
    },
    data() {
        return {
            list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            user: {},
            shareLikeRankTitle: "分享点赞榜",
            shareNewRankTitle: "最新分享",
            shareLikeRankList: [],
            shareLikeNewList: [],
            shareList: [],
            shareContent: "",
            share: {
                content: "",
                open: true,
                imageList: []
            },
            pageNum:1,
            hasNextPage: true
        };
    },
    async created() {
        let userId = sessionStorage.getItem("id");
        this.user = await UserApi.getUserAndSaveInSessionStorage(userId);
        this.shareList = await ShareApi.listShares(1, 10, "share_time", 95);
        this.shareLikeRankList = await ShareApi.listShares(1, 10, "likes", 9);
        this.shareLikeNewList = await ShareApi.listShares(1, 10, "share_time", 12);
        
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
    },
    methods: {
        handleReachBottom() {
            return new Promise(resolve => {
                setTimeout(() => {
                    const last = this.list1[this.list1.length - 1];
                    for (let i = 1; i < 11; i++) {
                        this.list1.push(last + i);
                    }
                    resolve();
                }, 2000);
            });
        },
        handleReachTop() {
            return new Promise(resolve => {
                setTimeout(() => {
                    const first = this.list2[0];
                    for (let i = 1; i < 11; i++) {
                        this.list2.unshift(first - i);
                    }
                    resolve();
                }, 2000);
            });
        },
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
                    console.log(res);
                    Notice.success({
                        title: "分享成功"
                    });
                    this.$router.go(0);
                } else if (res.status == 403) {
                    Notice.success({
                        title: "分享失败",
                        desc: "未登录"
                    });
                } else {
                    Notice.success({
                        title: "分享失败"
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
            console.log("dsadasdsa")
            let shareList0 = await ShareApi.listShares(this.pageNum + 1, 10, "share_time", 95);
            console.log(shareList0);
            console.log("pageNum=" + this.pageNum)
            for (let i = 0; i < shareList0.length; i++) {
                this.shareList.push(shareList0[i]);
            }
            this.pageNum++;
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