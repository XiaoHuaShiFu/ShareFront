<template>
    <Affix style="width:100%">
        <Row class="header" justify="center" align="middle">
            <Col span="4" @click="toHome"
                ><a
                    ><img @click="toHome" src="/images/logo.jpg" width="150px"
                /></a>
            </Col>
            <Col span="15"> <Search></Search></Col>
            <Col span="5">
                <a>
                    <Icon
                        type="md-settings"
                        size="25"
                        style="display:inline;"
                        color="#777"
                    />
                </a>
                <div style="margin-left:10px;display:inline;"></div>
                <Badge :count="messageCount">
                    <a href="#" @click="toMessage">
                        <Icon type="ios-mail-outline" size="30" color="#777" />
                    </a>
                </Badge>
            </Col>
        </Row>
    </Affix>
</template>

<script>
import Search from "@/components/Search.vue";
import UserNoticeApi from "./../service/UserNoticeApi";
import { Row, Col, Badge, Icon, Affix } from "view-design";
export default {
    components: {
        Row,
        Col,
        Search,
        Badge,
        Icon,
        Affix
    },
    data() {
        return {
            messageCount: 1
        };
    },
    async created() {
        // 加载页面数据
        let userId = sessionStorage.getItem("id");
        let result = await UserNoticeApi.countUserNotices(userId);
        this.messageCount = result.data;
    },
    methods: {
        toHome() {
            if (sessionStorage.getItem("token") != "anonymous") {
                this.$router.push({ path: "/user/home" });
            } else {
                this.$router.push({ path: "/" });
            }
        },
        /**
         * 去到消息页面
         */
        toMessage() {
            this.$router.push({ path: "/user/home/mymessage" });
        }
    }
};
</script>

<style scoped>
.header {
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #eee;
    z-index: 10;
}
</style>