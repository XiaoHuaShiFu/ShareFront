<template>
    <div class="container">
        <Layout :style="{ width: '100%'}">
            <Header :style="{ background: '#fff' }">
                <Row align="middle" justify="space-around">
                    <Col span="4">
                        <div style="position: relative; top: 10px;">
                            <img src="/images/logo.jpg" width="150px" />
                        </div>
                    </Col>
                    <Col span="15"><Search></Search></Col>
                    <Col span="5">
                        <Menu mode="horizontal" theme="light" active-name="1">
                            <MenuItem name="1">
                                注册
                            </MenuItem>
                            <MenuItem name="2">
                                登录
                            </MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Row class="center-container">
                    <Col class="center-content">
                        <div  v-for="share in shareList" :key="share.id">
                            <Share :share="share"></Share>
                        </div>
                        
                    </Col>
                    <Col class="center-sider">2</Col>
                </Row>
            </Layout>
            <Footer class="layout-footer-center"
                >Copyright © 吴嘉贤 All Rights Reserved | 粤ICP备19038075号</Footer
            >
        </Layout>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Share from "@/components/Share.vue";
import adaptString from "./../service/StringUtils";
import { Layout, Header, Footer, Menu, MenuItem, Row, Col } from "view-design";

export default {
    name: "Home",
    data() {
        return {
            shareList: []
        };
    },
    created() {
        this.getList();
    },
    components: {
        Layout,
        Header,
        Footer,
        Menu,
        MenuItem,
        Search,
        Row,
        Col,
        Share
    },
    methods: {
        async getList() {
            let res = await this.$Http.getData();
            this.shareList = res.list;
            for (let i = 0; i < this.shareList.length; i++) {
                this.shareList[i].content = adaptString(
                    this.shareList[i].content,
                    95
                );
            }
        }
    }
};
</script>

<style scoped>
.container {
    background: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.center-container {
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.center-sider {
    background: green;
    width: 20%;
}
.center-content {
    background: #fff;
    width: 50%;
    display: flex;
    flex-direction: column;
}

.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center {
    text-align: center;
}
</style>