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
                v-for="share in shareListWithLike"
                :key="share.id"
            >
                <Row
                    style="height:30px;text-align:left; 
            font-size:15px; margin-top:5px; color:#515a6e;"
                >
                    <Col
                        span="1"
                        style="font-weight:bold; color:#FF8140; width:11px; display:inline; "
                    >
                        {{ share.index }}
                    </Col>
                    <Col span="20" style="margin-left:15px;">
                        {{ share.content }}
                    </Col>
                    <Col
                        span="1"
                        style="font-size:10px; color:#aaa; text-align: right;"
                    >
                        {{ share.likes }}
                    </Col>
                </Row>
            </a>
        </Row>
    </Card>
</template>
<script>
import { Card, Row, Col } from "view-design";
export default {
    components: {
        Card,
        Row,
        Col
    },
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
    },
    props: ["shareListWithLike", "title"]
};
</script>

<style  scoped>
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
</style>