<template>
    <div>
        <Modal v-model="modal" width="400">
            <p slot="header" style="color:#f60;text-align:center"></p>
            <Row :gutter="32">
                <Col span="24" class="demo-tabs-style1">
                    <Tabs v-model="isLogin">
                        <TabPane label="登录" name="isLogin0">
                            <Form
                                ref="Login"
                                :model="Login"
                                :rules="ruleInline"
                                class="signin"
                                style="margin-top:30px"
                            >
                                <FormItem prop="username">
                                    <Input
                                        type="text"
                                        v-model="Login.username"
                                        placeholder="请输入用户名"
                                        @focus="errorUnshow"
                                    >
                                        <Icon
                                            type="md-person"
                                            slot="prepend"
                                        ></Icon>
                                    </Input>
                                    <p
                                        class="error-text"
                                        v-show="Login.error.username"
                                    >
                                        {{ Login.error.username }}
                                    </p>
                                </FormItem>
                                <FormItem prop="password">
                                    <Input
                                        type="password"
                                        v-model="Login.password"
                                        placeholder="请输入密码"
                                        @focus="errorUnshow"
                                    >
                                        <Icon
                                            type="ios-lock"
                                            slot="prepend"
                                        ></Icon>
                                    </Input>
                                    <p
                                        class="error-text"
                                        v-show="Login.error.password"
                                    >
                                        {{ Login.error.password }}
                                    </p>
                                </FormItem>
                                <FormItem style="text-align:center">
                                    <p
                                        class="error-text"
                                        v-show="Login.error.all"
                                    >
                                        {{ Login.error.all }}
                                    </p>
                                    <Button
                                        type="primary"
                                        @click="loginSubmit('Login')"
                                        style="width:60%;font-size:16px"
                                        >登录</Button
                                    >
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="注册" name="isRegister">
                            <Form
                                ref="Register"
                                :model="Register"
                                :rules="ruleInline"
                                class="signup"
                                style=" display: flex; width:100%;flex-direction: column;align-items: center;"
                            >
                                <FormItem
                                    prop="avatar"
                                    style="position:relative;"
                                >
                                    <UploadImage
                                        @receive="getImage"
                                    ></UploadImage>
                                </FormItem>
                                <FormItem
                                    prop="username"
                                    style="width:100%;position:relative;top:-20px"
                                >
                                    <Input
                                        type="text"
                                        v-model="Register.username"
                                        placeholder="请输入用户名"
                                        style="text-align:center"
                                    >
                                        <Icon
                                            type="md-person"
                                            slot="prepend"
                                        ></Icon>
                                    </Input>
                                    <p
                                        class="error-text marb8"
                                        v-show="Register.error.username"
                                    >
                                        {{ Register.error.username }}
                                    </p>
                                </FormItem>
                                <FormItem
                                    prop="nickName"
                                    style="width:100%;position:relative;top:-20px"
                                >
                                    <Input
                                        type="text"
                                        v-model="Register.nickName"
                                        placeholder="请输入昵称"
                                        style="text-align:center"
                                    >
                                        <Icon
                                            type="ios-happy"
                                            slot="prepend"
                                        ></Icon>
                                    </Input>
                                    <p
                                        class="error-text marb8"
                                        v-show="Register.error.nickName"
                                    >
                                        {{ Register.error.nickName }}
                                    </p>
                                </FormItem>

                                <FormItem
                                    prop="password"
                                    style="width:100%;position:relative;top:-20px"
                                >
                                    <Input
                                        type="password"
                                        v-model="Register.password"
                                        placeholder="请输入密码"
                                    >
                                        <Icon
                                            type="ios-lock"
                                            slot="prepend"
                                        ></Icon>
                                    </Input>
                                    <p
                                        class="error-text marb8"
                                        v-show="Register.error.password"
                                    >
                                        {{ Register.error.password }}
                                    </p>
                                </FormItem>
                                <FormItem
                                    prop="password2"
                                    style="width:100%;position:relative;top:-20px"
                                >
                                    <Input
                                        type="password"
                                        v-model="Register.password2"
                                        placeholder="请再次输入密码"
                                    >
                                        <Icon
                                            type="ios-lock"
                                            slot="prepend"
                                        ></Icon>
                                    </Input>
                                    <p
                                        class="error-text marb8"
                                        v-show="Register.error.password"
                                    >
                                        {{ Register.error.password }}
                                    </p>
                                </FormItem>
                                <FormItem
                                    style="text-align:center;width:100%;position:relative;top:-20px"
                                >
                                    <p
                                        class="error-text marb8"
                                        v-show="Register.error.error"
                                    >
                                        {{ Register.error.error }}
                                    </p>
                                    <Button
                                        type="primary"
                                        @click="registerSubmit('Register')"
                                        style="width:60%;font-size:16px"
                                        >注册</Button
                                    >
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <div slot="footer" style="text-align:center">
                <p></p>
            </div>
        </Modal>
    </div>
</template>

<script>
import {
    Modal,
    Button,
    Row,
    Col,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Input,
    Icon,
    Notice
    // Upload
} from "view-design";
import login from "./../service/Login";
import UploadImage from "@/components/UploadImage.vue";
import UserApi from "./../service/UserApi";
export default {
    components: {
        Modal,
        Button,
        Row,
        Col,
        Tabs,
        TabPane,
        Form,
        FormItem,
        Input,
        Icon,
        // Upload,
        UploadImage
    },
    props: ["username", "modal", "isLogin", "toPage"],
    data() {
        return {
            ruleInline: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 4,
                        message: "用户名长度应该大于等于4位！",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 30,
                        message: "用户名长度应该小于等于30位！",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码.",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: "密码长度应该大于等于6位！",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 16,
                        message: "密码长度应该小于等于16位！",
                        trigger: "blur"
                    }
                ],
                password2: [
                    {
                        required: true,
                        message: "请再次输入密码.",
                        trigger: "blur"
                    }
                ],
                nickName: [
                    {
                        required: true,
                        message: "请输入昵称.",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 1,
                        message: "昵称长度应该大于等于1位！",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 20,
                        message: "昵称长度应该小于等于20位！",
                        trigger: "blur"
                    }
                ],
                avatar: [
                    {
                        required: true,
                        message: "请设置头像.",
                        trigger: "blur"
                    }
                ]
            },
            Register: {
                error: {
                    username: "",
                    error: ""
                },
                username: "",
                password: "",
                password2: "",
                nickName: "",
                avatar: "",
                avatarFile: null
            },
            Login: {
                error: {
                    username: "",
                    all: ""
                },
                username: "",
                password: ""
            },
            uploadImgUrl: "",
            visible: true
        };
    },
    methods: {
        seedMessage() {},
        errorUnshow() {},
        /**
         * 登录
         */
        async loginSubmit(name) {
            let values = this.$refs[name].model;
            let res = await login(values.username, values.password, "USER");
            // 密码错误
            if (res.status != 201) {
                this.Login.error.all = "账号或密码错误";
            }
            if (res.status == 201) {
                // 密码正确
                res = res.data;
                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("tokenType", res.type);
                sessionStorage.setItem("id", res.id);
                this.Login.error.all = "登录成功";
                await UserApi.getUserAndSaveInSessionStorage(res.id);
                // 跳转到个人主页
                if (this.toPage == "/user/home") {
                    this.$router.push(this.toPage);
                } else {
                    this.$router.push(this.toPage);
                    this.$router.go(0);
                }
            }
        },
        /**
         * 注册
         */
        async registerSubmit(name) {
            let values = this.$refs[name].model;
            if (values.password != values.password2) {
                this.Register.error.error = "两个密码不一致！";
            } else {
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                let res = await this.$Http.postUser(
                    {
                        username: values.username,
                        password: values.password,
                        nickName: values.nickName,
                        avatar: this.Register.avatarFile
                    },
                    true,
                    config
                );
                if (res.status == 201) {
                    Notice.success({
                        title: "注册成功，即将跳转。"
                    });
                    let res = await login(
                        values.username,
                        values.password,
                        "USER"
                    );
                    if (res.status == 201) {
                        res = res.data;
                        sessionStorage.setItem("token", res.token);
                        sessionStorage.setItem("tokenType", res.type);
                        sessionStorage.setItem("id", res.id);
                        await UserApi.getUserAndSaveInSessionStorage(res.id);
                        // 跳转到个人主页
                        if (this.toPage == "/user/home") {
                            this.$router.push(this.toPage);
                        } else {
                            this.$router.push(this.toPage);
                            this.$router.go(0);
                        }
                    }
                } else {
                    Notice.success({
                        title: "注册失败，请重试。"
                    });
                }
            }
        },
        getImage(file) {
            this.Register.avatarFile = file;
        }
    }
};
</script>


<style>
.ivu-tabs-nav {
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
}
.qqwximg {
    height: 38px;
}
.error-text {
    color: #fa8341;
}
</style>