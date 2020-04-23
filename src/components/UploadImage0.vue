<template>
    <div>
        <div v-if="uploadImg.url" class="demo-upload-list">
            <img :src="uploadImg.url" />
            <div class="demo-upload-list-cover">
                <Icon
                    type="ios-eye-outline"
                    @click.native="handleView(fileName)"
                ></Icon>
            </div>
        </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :before-upload="handleUpload"
            type="drag"
            action=""
            style="display: inline-block;width:58px;"
        >
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="查看大图" v-model="showBigImg">
            <img :src="uploadImg.url" style="width: 100%" />
        </Modal>
    </div>
</template>
<script>
import { Modal, Upload, Icon } from "view-design";
export default {
    components: {
        Modal,
        Upload,
        Icon
    },
    data() {
        return {
            uploadImg: {},
            showBigImg: false,
            fileName: ""
        };
    },
    methods: {
        handleView(name) {
            this.imgName = name;
            this.showBigImg = true;
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "文件格式不正确",
                desc:
                    "文件 " +
                    file.name +
                    " 格式不正确，请上传 jpg、jpeg 或 png 的图片文件。"
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "超出文件大小限制",
                desc: "文件 " + file.name + " 太大，不能超过 2M。"
            });
        },
        handleUpload(file) {
            console.log(file);
            this.fileName = file.name;
            if (
                file.type !== "image/jpg" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/png"
            ) {
                this.handleFormatError(file);
            } else if (file.size > 2 * 1024 * 1024) {
                this.handleMaxSize(file);
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    this.uploadImg = {
                        url: reader.result,
                        file
                    };
                };
            }
            return false;
        }
    }
};
</script>
<style>
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