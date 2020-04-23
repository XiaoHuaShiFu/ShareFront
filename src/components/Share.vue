<template>
    <Card style="width:700px;" dis-hover="true">
        <Row class="share-container" >
            <Col class="share-image">
                <img
                    class="share-image1"
                    :src="share.shareImageList[0].imageUrl"
                />
            </Col>
            <Col class="share-content">
                <Col class="share-content2">
                    <Row class="share-content-text">{{ share.content }}</Row>
                    <Row class="share-content-else">
                        <Col class="share-content-else-left">
                            <Col>
                                <Avatar :src="share.user.avatarUrl" size="14" />
                            </Col>
                            <Col>{{ share.user.nickName }}</Col>
                            <Col>{{ share.shareTime }}</Col>
                        </Col>
                        <Col class="share-content-else-right">
                            <Col>
                                <img
                                    v-if="!share.collected"
                                    class="share-content-else-right-img"
                                    src="/icon/_收藏.png"
                                />
                                <img
                                    v-if="share.collected"
                                    class="share-content-else-right-img"
                                    src="/icon/_收藏2.png"
                                />
                            </Col>
                            <Col>{{ share.collections }}</Col>
                            <Col>|</Col>
                            <Col>
                                <img
                                    class="share-content-else-right-img"
                                    src="/icon/评论.png"
                                />
                            </Col>
                            <Col>{{ share.comments }}</Col>
                            <Col>|</Col>
                            <Col>
                                <img
                                    v-if="!share.liked"
                                    class="share-content-else-right-img"
                                    src="/icon/赞.png"
                                />
                                <img
                                    v-if="share.liked"
                                    class="share-content-else-right-img"
                                    src="/icon/赞2.png"
                                />
                            </Col>
                            <Col>{{ share.likes }}</Col>
                        </Col>
                    </Row>
                </Col>
            </Col>
        </Row>
    </Card>
</template>
<script>
import { Row, Col, Avatar, Card } from "view-design";

export default {
    components: { Row, Col, Avatar, Card },
    props: ["share"]
};
</script>

<style scoped>
.share-container {
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: row;
}
.share-image {
    width: 30%;
    height: 100%;
    overflow: hidden;
}
.share-image1 {
    width: 100%;
}

.share-content {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.share-content2 {
    width: 95%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.share-content-text {
    height: 80%;
    width: 100%;
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
}
.share-content-else {
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.share-content-else-left {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.share-content-else-right {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.share-content-else-right-img {
    height: 15px;
}
</style>