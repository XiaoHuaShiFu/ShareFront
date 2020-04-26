<style>
html,
body {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
}
.login {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
    position: relative;
}
.login .from-wrap {
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
}
.login h2 {
    text-align: center;
    margin-bottom: 20px;
}
.login FormItem {
    margin-bottom: 15px;
}
.login .form-footer {
    text-align: right;
}
.ivu-form-item-required .ivu-form-item-label:before {
    display: none;
}
</style>
<template>
    <div class="login">
        <div class="from-wrap">
            <h2>登录</h2>
            <Form
                ref="loginData"
                :model="loginData"
                :rules="ruleValidate"
                :label-width="80"
            >
                <FormItem label="账号" prop="acct">
                    <Input
                        v-model="loginData.acct"
                        placeholder="请输入账号"
                    ></Input>
                </FormItem>
                <FormItem label="密码" prop="pass">
                    <Input
                        type="password"
                        v-model="loginData.pass"
                        placeholder="请输入密码"
                    ></Input>
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')"
                        >Submit</Button
                    >
                    <Button
                        type="primary"
                        @click="handleReset('loginData')"
                        style="margin-left: 8px"
                        >Reset</Button
                    >
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { Form, FormItem, Input, Button, Notice } from "view-design";
import login from "./../../service/Login";
export default {
    components: {
        Form,
        FormItem,
        Input,
        Button
    },
    data() {
        return {
            loginData: {
                acct: "",
                pass: ""
            },
            ruleValidate: {
                acct: [
                    {
                        required: true,
                        message: "账号不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 16,
                        message: "账号长度3-16个字符",
                        trigger: "blur"
                    }
                ],
                pass: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        max: 16,
                        message: "密码长度6-16个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        /**
         * 登录
         */
        async handleSubmit() {
            let res = await login(
                this.loginData.acct,
                this.loginData.pass,
                "ADMIN"
            );
            console.log(res)
            // 密码错误
            if (res.status != 201) {
                Notice.warning({
                    title: "账号或密码错误"
                });
            }
            if (res.status == 201) {
                // 密码正确
                res = res.data;
                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("tokenType", res.type);
                sessionStorage.setItem("id", res.id);
                Notice.success({
                    title: "登录成功"
                });
                // 跳转到管理员主页
                this.$router.push("/admin/user");
            }
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>