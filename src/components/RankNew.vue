<template>
    <Card style="background:#F2F2F5;">
        <Row
            style="font-size:15px; font-weight:bold; color:#333; display: flex; 
        flex-direction: row; align-items: left; "
        >
            {{ title }}
        </Row>
        <Row
            class="ListContainer"
            style="border-top:1px solid #ddd; margin-top:10px;padding-top:10px; "
        >
            <a
                @click="comment(share)"
                v-for="share in shareListWithNew"
                :key="share.id"
            >
                <Row
                    style="height:50px;text-align:left; 
            font-size:15px; margin-top:5px; color:#515a6e; border-bottom:1px solid #ddd;"
                >
                    <Col span="4" @click="comment(share)"
                        ><Avatar
                            @click="comment(share)"
                            shape="square"
                            size="40"
                            :src="share.shareImageList[0].imageUrl"
                        ></Avatar
                    ></Col>
                    <Col
                        @click="comment(share)"
                        span="19"
                        style="margin-left:5px;"
                        ><Row style="">
                            {{ share.content }}
                        </Row>
                        <Row style="height:15px; font-size:10px; color:#aaa; ">
                            <!-- <Time :time="share.shareTime" /> -->
                            {{ share.shareTime }}
                        </Row></Col
                    >
                </Row>
            </a>
        </Row>
    </Card>
</template>
<script>
import { Card, Row, Col, Avatar } from "view-design";
export default {
    components: {
        Card,
        Row,
        Col,
        Avatar
    },
    props: ["shareListWithNew", "title"],
    methods: {
        // 点击评论按钮
        comment(share) {
            this.$router.push({
                path: "/share",
                query: {
                    shareId: share.id
                }
            });
        }
    }
};
</script>

<style scoped>
.ListContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.share-image {
    width: 50px;
    height: auto;
    overflow: hidden;
}
.share-image1 {
    width: 100%;
}
.rank-container {
    position: relative;
    left: 10px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-content: flex-start;
}
</style>