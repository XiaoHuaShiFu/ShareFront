<template>
    <div style="width:500px;">
        <Input
            style="width:500px;"
            search
            placeholder="大家都在搜：东京奥组委发现首例新冠病毒感染者"
            clearable
            @on-search="onSearch"
        />
    </div>
</template>
<script>
import { Input } from "view-design";

export default {
    data() {
        return {};
    },
    components: {
        Input
    },
    methods: {
        onSearch(query) {
            console.log(query);
        }
    }
};
</script>