<template>
    <div>
        <div
            class="demo-upload-list"
            v-for="shareImage in shareImageList"
            :key="shareImage.url"
        >
            <img :src="shareImage.url" />
            <div class="demo-upload-list-cover">
                <Icon
                    type="ios-trash-outline"
                    @click.native="handleRemove(shareImage)"
                ></Icon>
            </div>
        </div>
        
        <Upload  v-if="shareImageList.length < 6"
            ref="upload"
            :show-upload-list="false"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="10000"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="addImage"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;"
        >
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
            <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
            />
        </Modal>
    </div>
</template>
<script>
import { Modal, Upload, Icon, Notice } from "view-design";
export default {
    components: {
        Modal,
        Upload,
        Icon
    },
    data() {
        return {
            imgName: "",
            visible: false,
            uploadList: [],
            shareImageList: []
        };
    },
    methods: {
        /**
         * 删除一张图片
         */
        handleRemove(file) {
            this.shareImageList.splice(this.shareImageList.indexOf(file), 1);
            this.$emit("receive", this.shareImageList);
        },
        /**
         * 图片格式错误提示
         */
        handleFormatError() {
            Notice.warning({
                title: "图片格式不对",
                desc: "正确的图片格式应该是jpg或png"
            });
        },
        /**
         * 图片大小错误提示
         */
        handleMaxSize() {
            Notice.warning({
                title: "图片太大",
                desc: "图片尺寸应该小于10MB"
            });
        },
        /**
         * 添加图片处理
         */
        addImage(file) {
            const check = this.shareImageList.length < 6;
            if (!check) {
                Notice.warning({
                    title: "最多分享6张图片。"
                });
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    this.shareImageList.push({
                        url: reader.result,
                        file
                    });
                };
            }
            this.$emit("receive", this.shareImageList);
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    }
};
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
