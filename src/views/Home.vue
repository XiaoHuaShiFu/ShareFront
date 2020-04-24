<template>
    <div class="container">
        <Layout :style="{ width: '100%' }">
            <Header :style="{ background: '#fff' }">
                <Row align="middle" justify="space-around">
                    <Col span="4">
                        <div style="position: relative; top: 10px;">
                            <img src="/images/logo.jpg" width="150px" />
                        </div>
                    </Col>
                    <Col span="16"><Search></Search></Col>
                    <Col span="4">
                        <Menu
                            style="width:136px"
                            mode="horizontal"
                            theme="light"
                            :active-name="activeName"
                            @on-select="onSelectMenu"
                        >
                            <LoginAndRegister
                                :modal="showLoginAndRegister"
                                :isLogin="registerOrLogin"
                            ></LoginAndRegister>
                            <div>
                                <MenuItem name="register">
                                    注册
                                </MenuItem>
                            </div>

                            <div>
                                <MenuItem name="login">
                                    登录
                                </MenuItem>
                            </div>
                        </Menu>
                    </Col>
                </Row>
            </Header>

            <div style="width:100%">
                <Layout>
                    <Row class="center-container">
                        <Col span="13" class="center-content">
                            <Share :shareList="shareList"></Share>
                        </Col>
                        <Col span="5" class="center-sider">
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
                </Layout>
            </div>

            <Footer></Footer>
        </Layout>
        <BackTop></BackTop>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Share from "@/components/Share2.vue";
import RankLike from "@/components/RankLike.vue";
import RankNew from "@/components/RankNew.vue";
import adaptString from "./../utils/StringUtils";
import changeTime from "./../utils/DateUtils";
import Footer from "@/components/Footer.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";

import { Layout, Header, Menu, MenuItem, Row, Col, BackTop } from "view-design";
export default {
    components: {
        Layout,
        Header,
        Footer,
        Menu,
        MenuItem,
        Search,
        Row,
        Col,
        Share,
        RankLike,
        RankNew,
        BackTop,
        LoginAndRegister
    },
    data() {
        return {
            shareList: [],
            shareLikeRankTitle: "分享点赞榜",
            shareNewRankTitle: "最新分享",
            shareLikeRankList: [],
            shareLikeNewList: [],
            activeName: "",
            showLoginAndRegister: false,
            registerOrLogin: "isLogin"
        };
    },
    created() {
        if (sessionStorage["Authorization"] == null) {
            sessionStorage.setItem("token", "anonymous");
        }
        this.listShares(1, 10, "share_time");
        this.getShareLikeRankList();
        this.getShareNewRankList();
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
                console.log(
                    "距顶部" +
                        scrollTop +
                        "可视区高度" +
                        windowHeight +
                        "滚动条总高度" +
                        scrollHeight
                );
                that.shareList.push(that.shareList[0]);
            }
        };
    },

    methods: {
        async listShares(pageNum, pageSize, orderBy) {
            let res = await this.$Http.listShares({
                pageNum: pageNum,
                pageSize: pageSize,
                orderBy: orderBy
            });
            this.shareList = res.data.list;
            for (let i = 0; i < this.shareList.length; i++) {
                this.shareList[i].content = adaptString(
                    this.shareList[i].content,
                    95
                );
                this.shareList[i].shareTime = changeTime(
                    this.shareList[i].shareTime
                );
                this.shareList[i].index = i + 1;
            }
        },
        async getShareLikeRankList() {
            let res = await this.$Http.listShares({
                pageNum: 1,
                pageSize: 10,
                orderBy: "likes"
            });
            this.shareLikeRankList = res.data.list;
            for (let i = 0; i < this.shareLikeRankList.length; i++) {
                this.shareLikeRankList[i].content = adaptString(
                    this.shareLikeRankList[i].content,
                    9
                );
                this.shareLikeRankList[i].index = i + 1;
            }
        },
        async getShareNewRankList() {
            let res = await this.$Http.listShares({
                pageNum: 1,
                pageSize: 10,
                orderBy: "share_time"
            });
            this.shareLikeNewList = res.data.list;
            for (let i = 0; i < this.shareLikeNewList.length; i++) {
                this.shareLikeNewList[i].content = adaptString(
                    this.shareLikeNewList[i].content,
                    12
                );
                this.shareLikeNewList[i].shareTime = changeTime(
                    this.shareLikeNewList[i].shareTime
                );
            }
        },
        handleReachBottom() {},
        onSelectMenu(res) {
            if (res == "login") {
                this.showLoginAndRegister = true;
                this.registerOrLogin = "isLogin0";
            } else {
                this.showLoginAndRegister = true;
                this.registerOrLogin = "isRegister";
            }
            this.activeName = "3";
        }
    }
};
</script>

<style>
.container {
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.center-container {
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.center-sider {
    /* width: 20%; */
    display: flex;
    flex-direction: column;
    align-content: center;
}
.center-content {
    background: #fff;
    /* width: 50%; */
    display: flex;
    flex-direction: column;
}
.center-sider-like {
    width: 90%;
}
.top {
    padding: 10px;
    background: rgba(0, 153, 229, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
</style>