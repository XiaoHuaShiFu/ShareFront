<template>
    <Card style="width:300px;height:535px;font-size:20px;margin-left:500px;margin-top:100px;color:#000;">
        <Row style="height:50px;line-height:50px;border:1px solid #ccc">浏览器</Row>
        <Row style="height:50px;line-height:50px;border:1px solid #ccc">Vue-cli</Row>
        <Row style="height:50px;line-height:50px;border:1px solid #ccc;
        background: url('/images/docker-logo2.png');background-repeat:repeat;background-size:78px auto;">Nginx</Row>
        <Row style="height:250px;">
            <Col span="4" style="line-height:124px; border:1px solid #ccc;">日志服务</Col>
            <Col span="16" >
                <Row style="line-height:48px;border:1px solid #ccc">TokenAuth</Row>
                <Row style="line-height:48px;border:1px solid #ccc">Controller</Row>
                <Row >
                    <Col span="20" style="line-height:48px;border:1px solid #ccc;">
                        Service
                    </Col>
                    <Col span="4" style="line-height:35px;font-size:58px;">↑</Col>
                </Row>
                <Row >
                    <Col span="4" style="line-height:35px;font-size:58px;">↓</Col>
                    <Col span="20" style="line-height:48px;border:1px solid #ccc;">
                        Manager
                    </Col>
                </Row>
                <Row style="line-height:48px;border:1px solid #ccc">DAO</Row>
            </Col>
            <Col span="4" style="line-height:125px;
                background: url('/images/docker-logo2.png');background-repeat:repeat;background-size:45px auto;">
                <Row style="line-height:41px;border:1px solid #ccc;">缓存服务redis</Row>
                <Row style="line-height:41px;border:1px solid #ccc;">静态资源FTP</Row>
            </Col>
        </Row>
        <Row style="height:50px;line-height:50px;border:1px solid #ccc;
        background: url('/images/docker-logo2.png');background-repeat:repeat;background-size:78px auto;">MySQL</Row>
        <Row style="height:50px;line-height:50px;border:1px solid #ccc">操作系统</Row>
    </Card>
</template>
<script>
export default {};
</script>
<style scoped>
.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>