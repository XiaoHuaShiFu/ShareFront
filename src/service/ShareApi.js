import Http from './Http';
import adaptString from "./../utils/StringUtils";
import changeTime from "./../utils/DateUtils";
import { Notice } from "view-design";

const ShareApi = {};

ShareApi["listShares"] = async (pageNum, pageSize, orderBy, contentLength) => {
    let res = await Http.listShares({
        pageNum: pageNum,
        pageSize: pageSize,
        orderBy: orderBy
    });
    let shareList = res.data.list;
    for (let i = 0; i < shareList.length; i++) {
        shareList[i].content = adaptString(
            shareList[i].content,
            contentLength
        );
        shareList[i].shareTime = changeTime(
            shareList[i].shareTime
        );
        shareList[i].index = i + 1;
    }

    return shareList
}

ShareApi["likeShare"] = async (userId, shareId) => {
    let res = await Http.postSharesLikes({
        userId: userId,
        shareId: shareId
    }, true);

    return res
}

ShareApi["notLikeShare"] = async (userId, shareId) => {
    let res = await Http.deleteSharesLikes({
        userId: userId,
        shareId: shareId
    });

    return res
}

ShareApi["collectShare"] = async (userId, shareId) => {
    let res = await Http.postSharesCollections({
        userId: userId,
        shareId: shareId
    }, true);

    return res
}

/**
 * 
 */
ShareApi["notCollectShare"] = async (userId, shareId) => {
    let res = await Http.deleteSharesCollections({
        userId: userId,
        shareId: shareId
    });

    return res
}

/**
 * 收藏分享
 */
ShareApi["collect"] = async (share) => {
    if (
        sessionStorage.getItem("id") != "" &&
        sessionStorage.getItem("id") != null
    ) {
        if (!share.collected) {
            let res = await ShareApi.collectShare(
                sessionStorage.getItem("id"),
                share.id
            );
            if (res.status == 201) {
                share.collections = share.collections + 1;
                share.collected = true;
                Notice.success({
                    title: "收藏成功"
                });
            } else {
                Notice.warning({
                    title: "收藏失败"
                });
            }
        } else {
            let res = await ShareApi.notCollectShare(
                sessionStorage.getItem("id"),
                share.id
            );
            console.log(res)
            if (res.status == 204) {
                share.collections = share.collections - 1;
                share.collected = false;
                Notice.success({
                    title: "取消收藏成功"
                });
            } else {
                Notice.warning({
                    title: "取消收藏失败"
                });
            }
        }
    } else {
        Notice.warning({
            title: "请登录后再收藏！"
        });
    }
}

/**
 * 点赞分享
 */
ShareApi["like"] = async (share) => {
    if (
        sessionStorage.getItem("id") != "" &&
        sessionStorage.getItem("id") != null
    ) {
        if (!share.liked) {
            let res = await ShareApi.likeShare(
                sessionStorage.getItem("id"),
                share.id
            );
            if (res.status == 201) {
                share.likes = share.likes + 1;
                share.liked = true;
                Notice.success({
                    title: "点赞成功"
                });
            } else {
                Notice.warning({
                    title: "点赞失败"
                });
            }
        } else {
            let res = await ShareApi.notLikeShare(
                sessionStorage.getItem("id"),
                share.id
            );
            console.log(res)
            if (res.status == 204) {
                share.likes = share.likes - 1;
                share.liked = false;
                Notice.success({
                    title: "取消点赞成功"
                });
            } else {
                Notice.warning({
                    title: "取消点赞失败"
                });
            }
        }
    } else {
        Notice.warning({
            title: "请登录后再点赞！"
        });
    }
}
export default ShareApi