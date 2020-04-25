<template>
    <div class="container">
        <Header></Header>
        <Row class="content">
            <Col span="13" class="centent-center">
                <Row>
                    <Card
                        style="width:100%;height:auto; background:#F2F2F5;margin-bottom:10px;"
                    >
                        <Row class="share-container">
                            <Col span="2" class="avatar">
                                <Avatar size="54" :src="share.user.avatarUrl" />
                            </Col>
                            <Col span="22" class="share-content">
                                <Row
                                    style="color:#555;display:flex; font-size:18px; font-weight:bold;"
                                    >{{ share.user.nickName }}</Row
                                >
                                <Row
                                    style="display:flex; font-size:13px;color:#aaa; "
                                    >{{ share.shareTime }}</Row
                                >
                                <Row>
                                    <Col span="24">
                                        <Row
                                            style="display: flex; color:#333;font-size:14px;text-align:left;"
                                        >
                                            {{ share.content }}
                                        </Row>
                                        <Row> </Row>
                                        <Row
                                            style="display: flex; flex-direction:row; flex-wrap:wrap;"
                                        >
                                            <div
                                                @click="
                                                    onClickShareImage(image)
                                                "
                                                style="margin:5px;"
                                                v-for="image in share.shareImageList"
                                                :key="image.id"
                                            >
                                                <Avatar
                                                    @click="
                                                        onClickShareImage(image)
                                                    "
                                                    :src="image.imageUrl"
                                                    shape="square"
                                                    size="200"
                                                />
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
                                            <img
                                                @click="comment(share)"
                                                class="share-content-else-right-img"
                                                src="/icon/评论.png"
                                            />
                                            <div style="width:5px;"></div>
                                            <div
                                                class="hoverChange"
                                                @click="comment(share)"
                                            >
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
                                            <div
                                                class="hoverChange"
                                                @click="like(share)"
                                            >
                                                {{ share.likes }}
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row
                            style="margin-top:10px; border-top:1px solid #ddd; 
                        display:flex; flex-direction: row;     justify-content: flex-start;"
                        >
                            <Col style="margin-top:10px; ">
                                <Avatar
                                    shape="square"
                                    size="30"
                                    :src="user.avatarUrl"
                                >
                                </Avatar>
                            </Col>
                            <Col
                                style="margin-top:10px; margin-left:10px; width:95%"
                            >
                                <Form
                                    ref="shareComment"
                                    :model="shareComment"
                                    inline
                                >
                                    <Row style="width:100%"
                                        ><Input
                                            v-model="shareComment.content"
                                            maxlength="100"
                                            show-word-limit
                                            type="textarea"
                                            placeholder="评论些什么。。。"
                                            style="width:100%; "
                                            :rows="1"
                                            autosize
                                    /></Row>
                                    <Row>
                                        <Col
                                            span="21"
                                            style="height:100%; margin-top:8px;"
                                        >
                                        </Col>
                                        <Col
                                            span="2"
                                            style="margin-top:8px; margin-left:8px;"
                                            ><Button
                                                type="info"
                                                @click="saveShareComment()"
                                                ghost
                                                style="width:80px;margin-top:1px;"
                                                >评论</Button
                                            ></Col
                                        >
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row
                            style="border-top:1px solid #ddd; margin-top:10px;"
                        >
                            <Row
                                v-for="shareComment0 in shareCommentList"
                                :key="shareComment0.id"
                                style="margin-top:15px;"
                            >
                                <Col span="1">
                                    <Avatar
                                        shape="square"
                                        size="30"
                                        :src="shareComment0.user.avatarUrl"
                                    />
                                </Col>
                                <Col style="margin-left:40px; width:95%;">
                                    <Row
                                        style="font-size:14px; display:flex; flex-direction:row ; justify-content: flex-start; "
                                    >
                                        <div
                                            style="color:#eb7350;display:inline;"
                                        >
                                            {{ shareComment0.user.nickName }}
                                        </div>
                                        <div
                                            style="color:#333; display:inline;"
                                        >
                                            ：{{ shareComment0.content }}
                                        </div>
                                    </Row>

                                    <Row
                                        style="display: flex; flex-direction:row;  justify-content: center; 
                                        align-items: center; margin-top:10px; margin-bottom:-10px; "
                                    >
                                        <Col
                                            span="3"
                                            style="display: flex; flex-direction:row;  justify-content: left; font-size:14px; color:#888;"
                                        >
                                            {{ shareComment0.commentTime }}
                                        </Col>
                                        <Col span="17"></Col>
                                        <Col
                                            @click="
                                                onShowShareCommentReply(
                                                    shareComment0
                                                )
                                            "
                                            span="2"
                                            style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center;height:100%;"
                                        >
                                            <div
                                                @click="
                                                    onShowShareCommentReply(
                                                        shareComment0
                                                    )
                                                "
                                            >
                                                回复
                                            </div>
                                        </Col>

                                        <Col
                                            style="display:flex; flex-direction:row; align-items: center;height:100%;"
                                            ><div
                                                style="border-left:1px solid #ccc; height:14px;"
                                            ></div
                                        ></Col>

                                        <Col
                                            span="2"
                                            style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center;height:100%;"
                                        >
                                            <Row
                                                style="font-size:14px; color:#888; line-height:30px;display: flex;flex-direction:row; 
                        justify-content: center;align-items: center;"
                                            >
                                                <img
                                                    @click="
                                                        likeComment(
                                                            shareComment0
                                                        )
                                                    "
                                                    v-if="!shareComment0.liked"
                                                    class="share-content-else-right-img"
                                                    src="/icon/赞.png"
                                                />
                                                <img
                                                    @click="
                                                        likeComment(
                                                            shareComment0
                                                        )
                                                    "
                                                    v-if="shareComment0.liked"
                                                    class="share-content-else-right-img"
                                                    src="/icon/赞2.png"
                                                />
                                                <div style="width:5px;"></div>
                                                <div
                                                    class="hoverChange"
                                                    @click="
                                                        likeComment(
                                                            shareComment0
                                                        )
                                                    "
                                                >
                                                    {{ shareComment0.likes }}
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <!-- 评论一级评论 -->
                                    <Col
                                        v-if="
                                            showShareCommentReply ==
                                                shareComment0.id
                                        "
                                        style="margin-top:10px;  width:98%; background:#fff; "
                                    >
                                        <Form
                                            ref="shareCommentComment"
                                            :model="shareCommentComment"
                                            inline
                                            style="width:100%;display:flex;
                                     flex-direction:column; align-items: center;"
                                        >
                                            <Row
                                                style="width:95%;margin-top:15px;"
                                                ><Input
                                                    v-model="
                                                        shareCommentComment.content
                                                    "
                                                    maxlength="100"
                                                    show-word-limit
                                                    type="textarea"
                                                    placeholder="回复些什么。。。"
                                                    style="width:100%; "
                                                    :rows="1"
                                                    autosize
                                            /></Row>
                                            <Row
                                                style="display:flex;
                                     flex-direction:row; width:100%;"
                                            >
                                                <Col
                                                    span="20"
                                                    style="height:100%; margin-top:8px;"
                                                >
                                                </Col>
                                                <Col
                                                    span="2"
                                                    style="margin-top:8px; margin-left:18px; margin-bottom:10px;"
                                                    ><Button
                                                        type="info"
                                                        @click="
                                                            saveShareCommentComment(
                                                                shareComment0,
                                                                0
                                                            )
                                                        "
                                                        ghost
                                                        style="width:80px;margin-top:1px;"
                                                        >评论</Button
                                                    ></Col
                                                >
                                            </Row>
                                        </Form>
                                    </Col>
                                    <!-- 评论一级评论 -->
                                    <Row
                                        v-if="
                                            shareComment0.comments != 0 &&
                                                showShareCommentComment !=
                                                    shareComment0.id
                                        "
                                        style="margin-top:15px;
                                    width:100%;background:#eaeaea;height:30px; line-height:30px; display:flex;"
                                    >
                                        <div
                                            @click="
                                                onShowShareCommentComment(
                                                    shareComment0
                                                )
                                            "
                                            style="margin-left:10px; color:#eb7350;"
                                        >
                                            共{{
                                                shareComment0.comments
                                            }}条回复，点击查看
                                        </div>
                                    </Row>
                                    <Row
                                        v-if="
                                            showShareCommentComment ==
                                                shareComment0.id
                                        "
                                    >
                                        <!-- 二级评论区域 -->
                                        <Card
                                            style="background:#eaeaea;margin-top:15px;"
                                        >
                                            <div
                                                v-for="shareCommentComment0 in shareCommentCommentList"
                                                :key="shareCommentComment0.id"
                                                style="margin-bottom:10px;  border-bottom:1px solid #ccc;"
                                            >
                                                <Row
                                                    style="font-size:14px; display:flex; flex-direction:row ; justify-content: flex-start; "
                                                >
                                                    <div style="color:#eb7350;">
                                                        {{
                                                            shareCommentComment0
                                                                .user.nickName
                                                        }}：
                                                    </div>
                                                    <div
                                                        v-if="
                                                            shareCommentComment0.parentShareCommentCommentId !=
                                                                0
                                                        "
                                                    >
                                                        <div
                                                            style="color:#333; display:inline;"
                                                        >
                                                            回复
                                                        </div>

                                                        <div
                                                            style="color:#eb7350; display:inline;"
                                                        >
                                                            @{{
                                                                shareCommentComment0
                                                                    .parentShareCommentCommentUser
                                                                    .nickName
                                                            }}
                                                        </div>
                                                        <div
                                                            style="color:#333; display:inline;"
                                                        >
                                                            :
                                                        </div>
                                                    </div>
                                                    <div style="color:#333; ">
                                                        {{
                                                            shareCommentComment0.content
                                                        }}
                                                    </div>
                                                </Row>

                                                <Row
                                                    style="display: flex; flex-direction:row;  justify-content: center; 
                                        align-items: center; margin-top:10px;"
                                                >
                                                    <Col
                                                        span="3"
                                                        style=" display: flex; flex-direction:row;  justify-content: left; font-size:14px; color:#888;"
                                                    >
                                                        {{
                                                            shareCommentComment0.commentTime
                                                        }}
                                                    </Col>
                                                    <Col span="17"></Col>
                                                    <Col
                                                        span="2"
                                                        style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center;height:100%;"
                                                    >
                                                    <div @click="
                                                    onShowShareCommentCommentReply(
                                                        shareCommentComment0
                                                    )
                                                ">回复</div>
                                                        
                                                    </Col>

                                                    <Col
                                                        style="display:flex; flex-direction:row; align-items: center;height:100%;"
                                                        ><div
                                                            style="border-left:1px solid #ccc; height:14px;"
                                                        ></div
                                                    ></Col>

                                                    <Col
                                                        span="2"
                                                        style="display: flex; flex-direction:row; 
                        justify-content: center;align-items: center;height:100%;"
                                                    >
                                                        <Row
                                                            style="font-size:14px; color:#888; line-height:30px;display: flex;flex-direction:row; 
                        justify-content: center;align-items: center;"
                                                        >
                                                            <img
                                                                @click="
                                                                    likeCommentComment(
                                                                        shareCommentComment0
                                                                    )
                                                                "
                                                                v-if="
                                                                    !shareCommentComment0.liked
                                                                "
                                                                class="share-content-else-right-img"
                                                                src="/icon/赞.png"
                                                            />
                                                            <img
                                                                @click="
                                                                    likeCommentComment(
                                                                        shareCommentComment0
                                                                    )
                                                                "
                                                                v-if="
                                                                    shareCommentComment0.liked
                                                                "
                                                                class="share-content-else-right-img"
                                                                src="/icon/赞2.png"
                                                            />
                                                            <div
                                                                style="width:5px;"
                                                            ></div>
                                                            <div
                                                                class="hoverChange"
                                                                @click="
                                                                    likeCommentComment(
                                                                        shareCommentComment0
                                                                    )
                                                                "
                                                            >
                                                                {{
                                                                    shareCommentComment0.likes
                                                                }}
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <!-- 二级评论的回复 -->
                                                <Row >
                                                    <Col
                                                        v-if="
                                                            showShareCommentCommentReply ==
                                                                shareCommentComment0.id
                                                        "
                                                        style="margin-top:10px;  width:100%; background:#fff; "
                                                    >
                                                        <Form
                                                            ref="shareCommentComment2"
                                                            :model="
                                                                shareCommentComment2
                                                            "
                                                            inline
                                                            style="width:100%;display:flex;
                                     flex-direction:column; align-items: center;"
                                                        >
                                                            <Row
                                                                style="width:95%;margin-top:15px;"
                                                                ><Input
                                                                    v-model="
                                                                        shareCommentComment2.content
                                                                    "
                                                                    maxlength="100"
                                                                    show-word-limit
                                                                    type="textarea"
                                                                    placeholder="回复些什么。。。"
                                                                    style="width:100%; "
                                                                    :rows="1"
                                                                    autosize
                                                            /></Row>
                                                            <Row
                                                                style="display:flex;
                                     flex-direction:row; width:100%;"
                                                            >
                                                                <Col
                                                                    span="20"
                                                                    style="height:100%; margin-top:8px;"
                                                                >
                                                                </Col>
                                                                <Col
                                                                    span="2"
                                                                    style="margin-top:8px; margin-left:12px; margin-bottom:10px;"
                                                                    ><Button
                                                                        type="info"
                                                                        @click="
                                                                            saveShareCommentComment2(
                                                                                shareComment0,
                                                                                shareCommentComment0.id
                                                                            )
                                                                        "
                                                                        ghost
                                                                        style="width:80px;"
                                                                        >评论</Button
                                                                    ></Col
                                                                >
                                                            </Row>
                                                        </Form>
                                                    </Col>
                                                </Row>
                                                <!-- 二级评论的回复 -->
                                            </div>
                                        </Card>
                                        <!-- 二级评论区域 -->
                                    </Row>
                                </Col>
                            </Row>
                        </Row>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Footer></Footer>
        <BackTop></BackTop>
        <Modal title="查看图片" v-model="visible">
            <img :src="visibleImageUrl" v-if="visible" style="width: 100%" />
        </Modal>
    </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import UserApi from "./../service/UserApi";
import ShareApi from "./../service/ShareApi";
import adaptString from "./../utils/StringUtils";
import {
    Row,
    Col,
    BackTop,
    Notice,
    Message,
    Card,
    Avatar,
    Modal,
    Button,
    Input
} from "view-design";
export default {
    components: {
        Footer,
        Row,
        Col,
        BackTop,
        Header,
        Card,
        Avatar,
        Modal,
        Button,
        Input
    },
    data() {
        return {
            user: {},
            share: {},
            pageNum: 1,
            pageSize: 3,
            hasNextPage: true,
            visible: false,
            visibleImageUrl: "",
            shareComment: {},
            shareCommentList: [],
            showShareCommentComment: 0,
            shareCommentCommentList: [],
            showShareCommentReply: 0,
            shareCommentComment: {},
            showShareCommentCommentReply:0,
            shareCommentComment2: {},
        };
    },
    async created() {
        // 加载页面数据
        let userId = sessionStorage.getItem("id");
        this.user = await UserApi.getUserAndSaveInSessionStorage(userId);
        this.share = await ShareApi.getShare(this.$route.query.shareId, 300);
        this.shareCommentList = await ShareApi.listShareComments(
            this.pageNum,
            this.pageSize,
            this.share.id
        );

        // 监听触底事件
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
                that.pushShareCommentList();
            }
        };

        // 修改页面标题
        document.title = adaptString(this.share.content, 20) + " 来自" + this.share.user.nickName +  "-分享"
    },
    methods: {
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
        /**
         * 接收图片列表
         */
        reveiveImageList(shareImageList) {
            this.share.imageList = shareImageList;
        },
        /**
         * 加载下一页
         */
        async pushShareCommentList() {
            let shareCommentList0 = await ShareApi.listShareComments(
                this.pageNum + 1,
                this.pageSize,
                this.share.id
            );
            if (shareCommentList0.length > 0) {
                for (let i = 0; i < shareCommentList0.length; i++) {
                    this.shareCommentList.push(shareCommentList0[i]);
                }
                this.pageNum++;
            } else {
                Message.success("没有更多的评论了！！！");
            }
        },
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
            this.$router.push({
                path: "/share",
                query: {
                    shareId: share.id
                }
            });
        },
        // 点击图片
        onClickShareImage(image) {
            this.visibleImageUrl = image.imageUrl;
            this.visible = true;
            console.log("dadasdas");
        },
        // 点击评论点赞按钮
        likeComment(shareComment) {
            ShareApi.likeShareComment(shareComment);
        },
        // 保存评论
        async saveShareComment() {
            if (
                this.shareComment.content == "" ||
                this.shareComment.content == null
            ) {
                Notice.warning({
                    title: "评论不能为空"
                });
            } else {
                let res = await ShareApi.saveShareComment(
                    this.user.id,
                    this.share.id,
                    this.shareComment.content
                );
                console.log(res);
                if (res.status == 201) {
                    Notice.success({
                        title: "评论成功"
                    });
                    this.$router.go(0);
                } else {
                    Notice.warning({
                        title: "评论失败",
                        desc: res.data.message
                    });
                }
            }
        },
        /**
         * 加载评论的评论
         */
        async onShowShareCommentComment(shareComment0) {
            this.shareCommentCommentList = await ShareApi.listShareCommentComments(
                1,
                10000,
                shareComment0.id
            );
            this.showShareCommentComment = shareComment0.id;
        },
        /**
         * 点赞评论的评论
         */
        likeCommentComment(shareCommentComment0) {
            ShareApi.likeShareCommentComment(shareCommentComment0);
        },
        /**
         * 点击回复评论
         */
        onShowShareCommentReply(shareComment0) {
            if (this.showShareCommentReply == shareComment0.id) {
                this.showShareCommentReply = 0;
            } else {
                this.showShareCommentReply = shareComment0.id;
            }
        },
        /**
         * 点击回复评论的评论
         */
        onShowShareCommentCommentReply(shareCommentComment0) {
            if (this.showShareCommentCommentReply == shareCommentComment0.id) {
                this.showShareCommentCommentReply = 0;
            } else {
                this.showShareCommentCommentReply = shareCommentComment0.id;
            }                
        },
        /**
         * 评论一级的评论
         */
        async saveShareCommentComment(
            shareComment0,
            parentShareCommentCommentId
        ) {
            if (
                this.shareCommentComment.content == "" ||
                this.shareCommentComment.content == null
            ) {
                Notice.warning({
                    title: "回复不能为空"
                });
            } else {
                let res = await ShareApi.saveShareCommentComment(
                    this.user.id,
                    shareComment0.id,
                    parentShareCommentCommentId,
                    this.shareCommentComment.content
                );
                console.log(res);
                if (res.status == 201) {
                    Notice.success({
                        title: "回复成功"
                    });
                    this.$router.go(0);
                } else {
                    Notice.warning({
                        title: "回复失败",
                        desc: res.data.message
                    });
                }
            }
        },
        /**
         * 评论二级的评论
         */
        async saveShareCommentComment2(shareComment0, parentShareCommentCommentId) {
            if (
                this.shareCommentComment2.content == "" ||
                this.shareCommentComment2.content == null
            ) {
                Notice.warning({
                    title: "回复不能为空"
                });
            } else {
                let res = await ShareApi.saveShareCommentComment(
                    this.user.id,
                    shareComment0.id,
                    parentShareCommentCommentId,
                    this.shareCommentComment2.content
                );
                if (res.status == 201) {
                    Notice.success({
                        title: "回复成功"
                    });
                    this.$router.go(0);
                } else {
                    Notice.warning({
                        title: "回复失败",
                        desc: res.data.message
                    });
                }
            }
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

.share-image {
    width: 100%;
    height: 50px;
    overflow: hidden;
}
.share-image1 {
    width: 50px;
}

.share-content {
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