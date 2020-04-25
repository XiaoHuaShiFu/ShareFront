<template>
    <Row class="header" justify="center" align="middle">
        <Col span="4"><img src="/images/logo.jpg" width="150px" /> </Col>
        <Col span="16"> <Search></Search></Col>
        <Col span="4"> </Col>
    </Row>
</template>

<script>
import Search from "@/components/Search.vue";
import { Row, Col } from "view-design";
export default {
    components: {
        Row,
        Col,
        Search
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
</style>