<template>
    <Card style="background:#F2F2F5; ">
        <p style="font-size:30px; color:#17233d; font-weight:bold;">
            {{ title }}
        </p>
        <List class="ListContainer">
            <Card>
                <ListItem v-for="share in shareListWithLike" :key="share.id">
                    <div style="font-weight:bold; color:#FF8140; width:11px;">
                        {{ share.index }}
                    </div>
                    <Avatar
                        style="position:relative; left:10px;"
                        shape="square"
                        icon="ios-person"
                        size="large"
                        :src="share.user.avatarUrl"
                    />
                    <div style="position:relative; left:25px;">
                        {{ share.content }}
                    </div>
                    <div
                        style="font-size:10px; color:#aaa; position:relative; left:35px;"
                    >
                        {{ share.likes }}
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
    props: ["shareListWithLike", "title"]
};
</script>

<style  scoped>
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
</style>