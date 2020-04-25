<template>
    <div>
        <Card
            v-for="share in shareList"
            :key="share.id"
            style="width:100%;height:auto; background:#F2F2F5;margin-bottom:10px;"
        >
            <Row class="share-container">
                <Col span="2" class="avatar">
                    <Avatar :src="share.user.avatarUrl" size="54" />
                </Col>
                <Col span="21" class="share-content">
                    <Row
                        style="color:#555;display:flex; font-size:14px; font-weight:bold;"
                        >{{ share.user.nickName }}</Row
                    >
                    <Row style="display:flex; font-size:13px;color:#aaa; ">{{
                        share.shareTime
                    }}</Row>
                    <Row>
                        <Col span="24">
                            <Row
                                style="display: flex; color:#333;font-size:14px;text-align:left;"
                                >{{ share.content }}</Row
                            >

                            <Row
                                style="display: flex; flex-direction:row; flex-wrap:wrap;"
                            >
                                <div 
                                        @click="onClickShareImage(image)"
                                    style="margin:5px;"
                                    v-for="image in share.shareImageList"
                                    :key="image.id"
                                >
                                    <Avatar 
                                        @click="onClickShareImage(image)"
                                        :src="image.imageUrl"
                                        shape="square"
                                        size="113"
                                    ></Avatar>
                                </div>
                            </Row>
                        </Col>
                    </Row>

                    <Row
                        style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center; margin-top:10px; margin-bottom:-10px; border-top:1px solid #ddd"
                    >
                        <Col
                            span="7"
                            style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center; height:100%;"
                        >
                            <Row
                                style="font-size:14px; color:#888; line-height:30px;display: flex;flex-direction:row; 
                        justify-content: center;align-items: center;"
                            >
                                <img
                                    @click="collect(share)"
                                    v-if="!share.collected"
                                    class="share-content-else-right-img"
                                    src="/icon/_收藏.png"
                                />
                                <img
                                    @click="collect(share)"
                                    v-if="share.collected"
                                    class="share-content-else-right-img"
                                    src="/icon/_收藏2.png"
                                />

                                <div style="width:5px;"></div>
                                <div
                                    @click="collect(share)"
                                    class="hoverChange"
                                >
                                    收藏
                                </div>
                            </Row>
                        </Col>

                        <Col
                            style="display:flex; flex-direction:row; align-items: center;height:100%;"
                            ><div
                                style="border-left:1px solid #ccc; height:20px;"
                            ></div
                        ></Col>

                        <Col
                            span="7"
                            style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center;height:100%;"
                        >
                            <Row
                                style="font-size:14px; color:#888; line-height:30px;display: flex;flex-direction:row; 
                        justify-content: center;align-items: center;"
                            >
                                <img @click="comment(share)"
                                    class="share-content-else-right-img"
                                    src="/icon/评论.png"
                                />
                                <div style="width:5px;"></div>
                                <div class="hoverChange" @click="comment(share)">
                                    {{ share.comments }}
                                </div>
                            </Row>
                        </Col>

                        <Col
                            style="display:flex; flex-direction:row; align-items: center;height:100%;"
                            ><div
                                style="border-left:1px solid #ccc; height:20px;"
                            ></div
                        ></Col>

                        <Col
                            span="7"
                            style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center;height:100%;"
                        >
                            <Row
                                style="font-size:14px; color:#888; line-height:30px;display: flex;flex-direction:row; 
                        justify-content: center;align-items: center;"
                            >
                                <img
                                    @click="like(share)"
                                    v-if="!share.liked"
                                    class="share-content-else-right-img"
                                    src="/icon/赞.png"
                                />
                                <img
                                    @click="like(share)"
                                    v-if="share.liked"
                                    class="share-content-else-right-img"
                                    src="/icon/赞2.png"
                                />
                                <div style="width:5px;"></div>
                                <div class="hoverChange" @click="like(share)">{{ share.likes }}</div>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
             <Modal title="查看图片" v-model="visible">
            <img :src="visibleImageUrl" v-if="visible" style="width: 100%" />
        </Modal>
        </Card>
       
    </div>
</template>

<script>
import { Card, Col, Row, Avatar, Modal} from "view-design";

import ShareApi from "./../service/ShareApi";
export default {
    components: {
        Card,
        Col,
        Row,
        Avatar,Modal
    },
    props: ["shareList", "handleReachBottom"],
    data() {
        return {
            visible: false,
            visibleImageUrl: "",
        }
    },
    methods: {
        // 点击收藏按钮
        collect(share) {
            ShareApi.collect(share);
        },
        // 点击点赞按钮
        like(share) {
            ShareApi.like(share);
        },
        // 点击评论按钮
        comment(share) {
            this.$router.push({path:"/share", query: {
                shareId:share.id,
            }});
        },
        // 点击图片
        onClickShareImage(image) {
            this.visibleImageUrl = image.imageUrl;
            this.visible = true;
        },
    }
};
</script>

<style scoped>
.share-image {
    width: 100%;
    height: 50px;
    overflow: hidden;
}
.share-image1 {
    width: 50px;
}

.share-content {
    margin-left:20px;
    display: flex;
    flex-direction: column;
    justify-content: left;
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
    height: 14px;
}
.hoverChange:hover {
    color: #ff8140;
}
</style>