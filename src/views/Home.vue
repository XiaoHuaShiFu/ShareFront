<template>
    <div class="container">
        <Layout :style="{ width: '100%' }">
            <Header :style="{ background: '#fff' }">
                <Row align="middle" justify="space-around">
                    <Col span="4">
                        <div style="position: relative; top: 10px;">
                            <a><img @click="toHome" src="/images/logo.jpg" width="150px" /></a>
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
                        <Col span="11" class="center-content">
                            <Share :shareList="shareList"></Share>
                        </Col>
                        <div style="width:10px;"></div>
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
import Share from "@/components/Share3.vue";
import RankLike from "@/components/RankLike.vue";
import RankNew from "@/components/RankNew.vue";
import Footer from "@/components/Footer.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
import ShareApi from "./../service/ShareApi";
import { Layout, Header, Menu, MenuItem, Row, Col, BackTop,Message } from "view-design";
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
            registerOrLogin: "isLogin",
            pageNum:1
        };
    },
    async created() {
        if (sessionStorage["token"] == null) {
            sessionStorage.setItem("token", "anonymous");
        }
        this.shareList = await ShareApi.listShares(1, 10, "share_time", 300);
        this.shareLikeRankList = await ShareApi.listShares(1, 10, "likes", 13);
        this.shareLikeNewList = await ShareApi.listShares(1, 10, "share_time", 14);
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
        onSelectMenu(res) {
            if (res == "login") {
                this.showLoginAndRegister = true;
                this.registerOrLogin = "isLogin0";
            } else {
                this.showLoginAndRegister = true;
                this.registerOrLogin = "isRegister";
            }
            this.activeName = "3";
        },
        /**
         * 加载下一页
         */
        async pushShareList() {
            let shareList0 = await ShareApi.listShares(this.pageNum + 1, 10, "share_time", 300);
            if (shareList0.length > 0) {
                for (let i = 0; i < shareList0.length; i++) {
                    this.shareList.push(shareList0[i]);
                }
                this.pageNum++;
            } else {
                Message.success('没有更多的分享了！！！');
            }
        },
        /**
         * 首页跳转
         */
        toHome() {
            console.log("dasdsa")
            if (sessionStorage.getItem("token") != "anonymous") {
                this.$router.push({path:'/user/home'});
            } else {
                this.$router.push({path:'/'});
            }
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