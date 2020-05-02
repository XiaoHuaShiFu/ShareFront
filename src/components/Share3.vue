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
                    >
                        <Col span="23" style="text-align:left;">{{
                            share.user.nickName
                        }}</Col>

                        <Col>
                            <a
                                span="1"
                                v-if="showDropdown"
                                style="font-weight:normal;"
                                @click="onClickDropDown0(share)"
                            >
                                <Dropdown
                                    @on-click="onClickDropDown"
                                    @click="onClickDropDown0(share)"
                                >
                                    <Icon
                                        type="ios-arrow-down"
                                        @click="onClickDropDown0(share)"
                                        color="#aaa"
                                    ></Icon>
                                    <DropdownMenu
                                        slot="list"
                                        @click="onClickDropDown0(share)"
                                    >
                                        <DropdownItem
                                            v-if="share.open"
                                            name="仅自己可见"
                                            :selected="!share.open"
                                            @click="onClickDropDown0(share)"
                                            >设置为仅自己可见</DropdownItem
                                        >
                                        <DropdownItem
                                            v-if="!share.open"
                                            name="公开"
                                            :selected="share.open"
                                            @click="onClickDropDown0(share)"
                                            >设置为所有人可见</DropdownItem
                                        >
                                        <DropdownItem
                                            name="谁赞了我"
                                            @click="onClickDropDown0(share)"
                                            >谁赞了我</DropdownItem
                                        >
                                    </DropdownMenu>
                                </Dropdown>
                            </a>
                        </Col>
                    </Row>
                    <Row style="display:flex; font-size:13px;color:#aaa; ">{{
                        share.shareTime
                    }}</Row>
                    <Row>
                        <Col span="24">
                            <Row
                                style="display: flex; color:#333;font-size:14px;text-align:left;"
                                ><div style="white-space: pre-wrap">
                                    {{ share.content }}
                                </div></Row
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
                                    <a>
                                        <Avatar
                                            @click="onClickShareImage(image)"
                                            :src="image.imageUrl"
                                            shape="square"
                                            size="113"
                                        ></Avatar>
                                    </a>
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
                            <Row>
                                <a
                                    href="#"
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
                                </a>
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
                            <Row>
                                <a
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
                                </a>
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
                            <Row>
                                <a
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
                                </a>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            

        </Card>
                         <LoginAndRegister
            :modal="showLoginAndRegister"
            :isLogin="registerOrLogin"
            :toPage="toPage"
            ></LoginAndRegister>  
            
            <Modal title="查看图片" v-model="visible">
                <img
                    :src="visibleImageUrl"
                    v-if="visible"
                    style="width: 100%"
                />
            </Modal> 
            <Modal width="300" v-model="showLikeList" title="点赞列表">
                <Row
                    v-for="like0 in likeList"
                    :key="like0.id"
                    style="height:40px;margin-top:10px;"
                >
                    <Col span="4">
                        <Avatar :src="like0.user.avatarUrl"></Avatar>
                    </Col>
                    <Col span="20" style="border-bottom:1px solid #eee;height:40px;">
                        <Row>
                            <Col
                                span="22"
                                style="display:flex;flex-direction:row;justify-content: left;
                    text-align:left;line-height:30px;"
                            >
                                {{ like0.user.nickName }}
                            </Col>
                            <Col span="2"><Icon type="md-thumbs-up"/></Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
    </div>
</template>

<script>
import {
    Card,
    Col,
    Row,
    Avatar,
    Modal,
    Icon,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Notice
} from "view-design";
import ShareApi from "./../service/ShareApi";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
export default {
    components: {
        Card,
        Col,
        Row,
        Avatar,
        Modal,
        Icon,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        LoginAndRegister
    },
    props: ["shareList", "handleReachBottom", "showDropdown", "toPage"],
    data() {
        return {
            visible: false,
            visibleImageUrl: "",
            onClickDropDownShare: {},
            showLikeList: false,
            likeList: [],
            showLoginAndRegister: false,
            registerOrLogin: "isLogin0"
        };
    },
    methods: {
        // 点击收藏按钮
        collect(share) {
            if (sessionStorage.getItem("token") != "anonymous") {
                ShareApi.collect(share);
            } else {
                Notice.warning({
                    title: "请登录后再收藏"
                });
                this.showLoginAndRegister = true;
            }
        },
        // 点击点赞按钮
        like(share) {
            if (sessionStorage.getItem("token") != "anonymous") {
                ShareApi.like(share);
            } else {
                this.showLoginAndRegister = true;
                Notice.warning({
                    title: "请登录后再点赞"
                });
            }
            
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
        },
        // 点击下拉事件
        async onClickDropDown(name) {
            if (name == "公开") {
                let res = await ShareApi.updateShare(
                    this.onClickDropDownShare.id,
                    sessionStorage.getItem("id"),
                    true
                );
                if (res.status == 200) {
                    Notice.success({
                        title: "公开成功"
                    });
                    this.$router.go(0);
                } else {
                    console.log(res);
                    Notice.success({
                        title: "公开失败",
                        desc: "未登录"
                    });
                }
            } else if (name == "仅自己可见") {
                let res = await ShareApi.updateShare(
                    this.onClickDropDownShare.id,
                    sessionStorage.getItem("id"),
                    false
                );
                if (res.status == 200) {
                    Notice.success({
                        title: "隐藏成功"
                    });
                    this.$router.go(0);
                } else {
                    Notice.success({
                        title: "隐藏失败",
                        desc: "未登录"
                    });
                }
            } else if (name == "谁赞了我") {
                let result = await ShareApi.listShareLikes(
                    1,
                    9999,
                    this.onClickDropDownShare.id
                );
                this.likeList = result.data.list;
                this.showLikeList = true;
            }
        },
        // 点击下拉按钮
        onClickDropDown0(share) {
            this.onClickDropDownShare = share;
        }
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
    margin-left: 20px;
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