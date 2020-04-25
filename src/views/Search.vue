<template>
    <div class="container">
        <Row style=" width:100% ">
            <Header></Header>
            <Row
                style="height:100px; width:100%;display:flex; flex-direction:row;align-items: center; 
                justify-content: center;"
            >
                <Col span="3">
                    <img style="height:35px;" src="/icon/search.jpg" />
                </Col>
                <Col span="12"
                    ><Input
                        search
                        placeholder="大家都在搜：美国新冠肺炎确诊病例超90万例"
                        clearable
                        @on-search="onSearch"
                        v-model="query0"
                /></Col>
                <Col span="2">
                    <Button
                        @click="search"
                        ghost
                        style="background:#f85d00;width:100px;height:35px;font-size:17px;color:#fff"
                        >搜索</Button
                    >
                </Col>
            </Row>
            <Row style="width:100%">
                <Row>
                    <Row class="center-container">
                        <Col span="11" class="center-content">
                            <Share :shareList="shareList"></Share>
                            <Row v-if="shareList.length == 0">
                                <Alert type="info" show-icon>
                                    未找到任何匹配的分享
                                </Alert>
                            </Row>
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
                </Row>
            </Row>

            <Footer></Footer>
        </Row>
        <BackTop></BackTop>
    </div>
</template>

<script>
import Share from "@/components/Share3.vue";
import RankLike from "@/components/RankLike.vue";
import RankNew from "@/components/RankNew.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ShareApi from "./../service/ShareApi";
import { Row, Col, BackTop, Message, Input, Button, Alert } from "view-design";
export default {
    components: {
        Header,
        Footer,
        Row,
        Col,
        Share,
        RankLike,
        RankNew,
        BackTop,
        Input,
        Button,
        Alert
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
            pageNum: 1,
            query: "",
            query0: ""
        };
    },
    async created() {
        this.query = this.$route.query.query;
        this.query0 = this.query;
        if (sessionStorage["token"] == null) {
            sessionStorage.setItem("token", "anonymous");
        }
        this.shareList = await ShareApi.listSharesByContent(
            1,
            10,
            "likes",
            this.query,
            true
        );
        this.shareLikeRankList = await ShareApi.listShares(1, 10, "likes", 9);
        this.shareLikeNewList = await ShareApi.listShares(
            1,
            10,
            "share_time",
            12
        );
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
        /**
         * 加载下一页
         */
        async pushShareList() {
            let shareList0 = await ShareApi.listSharesByContent(
                this.pageNum + 1,
                10,
                "likes",
                this.query,
                true
            );
            if (shareList0.length > 0) {
                for (let i = 0; i < shareList0.length; i++) {
                    this.shareList.push(shareList0[i]);
                }
                this.pageNum++;
            } else {
                Message.success("没有更多的分享了！！！");
            }
        },
        /**
         * 点击搜索按钮
         */
        async search() {
            this.query = this.query0;
            this.shareList = await ShareApi.listSharesByContent(
                1,
                10,
                "likes",
                this.query,
                true
            );
        },
        onSearch() {
            this.search();
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