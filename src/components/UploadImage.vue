<template>
    <div>
        <Upload
            ref="upload"
            :before-upload="handleUpload"
            type="select"
            action=""
            style="display: inline-block;width:58px;"
        >
            <div v-if="uploadImg.url" class="demo-upload-list">
                <img :src="uploadImg.url" />
            </div>
        </Upload>
    </div>
</template>
<script>
import { Upload } from "view-design";
export default {
    components: {
        Upload
    },
    data() {
        return {
            uploadImg: {
                url: "./icon/相机1.png"
            },
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
            this.$emit("receive", file);
            return false;
        }
    }
};
</script>
<style scoped>
.demo-upload-list {
    border: 1px dashed #cdcdcd;
    border-radius: 5px;
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    overflow: hidden;
    background: #fff;
    position: relative;
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