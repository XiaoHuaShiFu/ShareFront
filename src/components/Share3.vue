<template>
    <List item-layout="vertical" style="width:100%;">
        <Card style="width:100%;background:#F2F2F5;">
            <ListItem v-for="share in shareList" :key="share.id">
                <ListItemMeta
                    :avatar="share.user.avatarUrl"
                    :title="share.user.nickName"
                    :description="share.shareTime"
                />
                {{ share.content }}
                <template slot="action">
                    <li>
                        <Icon type="ios-star-outline" />
                        {{ share.collections }}
                    </li>
                    <li>
                        <Icon type="ios-thumbs-up-outline" />
                        {{ share.likes }}
                    </li>
                    <li>
                        <Icon type="ios-chatbubbles-outline" />
                        {{ share.comments }}
                    </li>
                </template>
                <template slot="extra">
                    <div class="share-image">
                        <img
                            class="share-image1"
                            :src="share.shareImageList[0].imageUrl"
                        />
                    </div>
                </template>
            </ListItem>
        </Card>
    </List>
</template>

<script>
import List from "view-design/src/components/list/list";
import ListItem from "view-design/src/components/list/list-item";
import ListItemMeta from "view-design/src/components/list/list-item-meta";
import { Icon, Card } from "view-design";

export default {
    components: {
        List,
        ListItem,
        ListItemMeta,
        Icon,
        Card
    },
    props: ["shareList", "handleReachBottom"]
};
</script>

<style scoped>
.share-image {
    width: 280px;
    height: 150px;
    overflow: hidden;
}
.share-image1 {
    width: 100%;
}
</style>