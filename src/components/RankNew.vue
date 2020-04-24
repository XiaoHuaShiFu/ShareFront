<template>
    <Card style="background:#F2F2F5;">
        <p style="font-size:30px; color:#17233d; font-weight:bold;">
            {{ title }}
        </p>
        <List class="ListContainer">
            <Card>
                <ListItem v-for="share in shareListWithNew" :key="share.id">
                    <Avatar
                        shape="square"
                        icon="ios-person"
                        size="large"
                        :src="share.user.avatarUrl"
                    />
                    <div class="rank-container">
                        <div style="height:15px">{{ share.content }}</div>
                        <div style="height:15px; padding-top:5px; font-size:10px; color:#aaa; position:relactive; left:100px;">
                            <!-- <Time :time="share.shareTime" /> -->
                            {{ share.shareTime }}
                        </div>
                    </div>
                </ListItem>
            </Card>
        </List>
    </Card>
</template>
<script>
import List from "view-design/src/components/list/list";
import ListItem from "view-design/src/components/list/list-item";
import { Avatar, Card } from "view-design";
export default {
    components: {
        List,
        ListItem,
        Avatar,
        Card
    },
    props: ["shareListWithNew", "title"]
};
</script>

<style scoped>
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
.rank-container {
    position: relative;
    left: 10px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-content: flex-start;
}
</style>