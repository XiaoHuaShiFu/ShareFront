<template>
    <Row class="header" justify="center" align="middle">
        <Col span="4"><img src="/images/logo.jpg" width="150px" /> </Col>
        <Col span="16"> <Search></Search></Col>
        <Col span="4">
            <Badge :count="100">
                <a href="#" class="demo-badge">
                    
                </a>
            </Badge>
        </Col>
    </Row>
</template>

<script>
import Search from "@/components/Search.vue";
import { Row, Col, Badge } from "view-design";
export default {
    components: {
        Row,
        Col,
        Search,
        Badge
    }
};
</script>

<style scoped>
.header {
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.demo-badge {
    width: 42px;
    height: 42px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
}
</style>