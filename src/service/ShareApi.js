import Http from './Http';
import adaptString from "./../utils/StringUtils";
import changeTime from "./../utils/DateUtils";
import { Notice } from "view-design";

const ShareApi = {};

/**
 * 查询分享
 */
ShareApi["listShares"] = async (pageNum, pageSize, orderBy, contentLength, open=true) => {
    let res = await Http.listShares({
        pageNum: pageNum,
        pageSize: pageSize,
        open:open,
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

/**
 * 查询分享通过内容
 */
ShareApi["listSharesByContent"] = async (pageNum, pageSize, orderBy, content, open=true) => {
    let res = await Http.listShares({
        pageNum: pageNum,
        pageSize: pageSize,
        open:open,
        orderBy: orderBy,
        content:content
    });
    console.log(res)
    let shareList = res.data.list;
    for (let i = 0; i < shareList.length; i++) {
        shareList[i].shareTime = changeTime(
            shareList[i].shareTime
        );
    }

    return shareList
}


/**
 * 查询我的分享
 */
ShareApi["listMyShares"] = async (pageNum, pageSize, orderBy, userId) => {
    let res = await Http.listShares({
        pageNum: pageNum,
        pageSize: pageSize,
        orderBy: orderBy,
        userId: userId
    });
    let shareList = res.data.list;
    for (let i = 0; i < shareList.length; i++) {
        shareList[i].shareTime = changeTime(
            shareList[i].shareTime
        );
    }

    return {
        shareList: shareList,
        total: res.data.total
    }
}

/**
 * 查询分享评论
 */
ShareApi["listShareComments"] = async (pageNum, pageSize, shareId) => {
    let res = await Http.listShareComments({
        pageNum: pageNum,
        pageSize: pageSize,
        shareId:shareId
    });
    let shareCommentList = res.data.list;
    for (let i = 0; i < shareCommentList.length; i++) {
        shareCommentList[i].commentTime = changeTime(
            shareCommentList[i].commentTime
        );
    }

    return shareCommentList
}

/**
 * 查询分享评论的评论
 */
ShareApi["listShareCommentComments"] = async (pageNum, pageSize, shareCommentId) => {
    let res = await Http.listShareCommentComments({
        pageNum: pageNum,
        pageSize: pageSize,
        shareCommentId:shareCommentId
    });
    let shareCommentCommentList = res.data.list;
    for (let i = 0; i < shareCommentCommentList.length; i++) {
        shareCommentCommentList[i].commentTime = changeTime(
            shareCommentCommentList[i].commentTime
        );
    }

    return shareCommentCommentList
}

/**
 * 查询收藏列表
 */
ShareApi["listShareCollections"] = async (pageNum, pageSize, userId) => {
    let res = await Http.listSharesCollections({
        pageNum: pageNum,
        pageSize: pageSize,
        userId: userId
    });
    let shareCollectionList = res.data.list;
    let shareList = [];
    for (let i = 0; i < shareCollectionList.length; i++) {
        shareCollectionList[i].share.shareTime = changeTime(
            shareCollectionList[i].share.shareTime
        );
        shareList.push(shareCollectionList[i].share)
    }

    return {
        shareList: shareList,
        total: res.data.total
    }
}



/**
 * 创建分享评论
 */
ShareApi["saveShareComment"] = async (userId, shareId, content) => {
    let res = await Http.postShareComment({
        userId: userId,
        content: content,
        shareId:shareId
    }, true);
    return res
}

/**
 * 更新分享
 */
ShareApi["updateShare"] = async (id, userId, open) => {
    let res = await Http.putShares({
        userId: userId,
        id:id,
        open:open
    }, true);
    console.log(res)
    return res
}

/**
 * 创建分享评论的评论
 */
ShareApi["saveShareCommentComment"] = async (userId, shareCommentId, parentShareCommentCommentId, content) => {
    let res = await Http.postShareCommentComment({
        userId: userId,
        content: content,
        parentShareCommentCommentId: parentShareCommentCommentId,
        shareCommentId:shareCommentId
    }, true);

    return res
}


/**
 * 获取分享通过id
 */
ShareApi["getShare"] = async (shareId, contentLength) => {
    let res = await Http.getShare({}, false, {}, "/" + shareId);
    let share = res.data;
    share.content = adaptString(
        share.content,
        contentLength
    );
    share.shareTime = changeTime(
        share.shareTime
    );

    return share
}

/**
 * 点赞分享
 */
ShareApi["likeShare"] = async (userId, shareId) => {
    let res = await Http.postSharesLikes({
        userId: userId,
        shareId: shareId
    }, true);

    return res
}

/**
 * 取消点赞分享
 */
ShareApi["notLikeShare"] = async (userId, shareId) => {
    let res = await Http.deleteSharesLikes({
        userId: userId,
        shareId: shareId
    });

    return res
}

/**
 * 收藏分享
 */
ShareApi["collectShare"] = async (userId, shareId) => {
    let res = await Http.postSharesCollections({
        userId: userId,
        shareId: shareId
    }, true);

    return res
}

/**
 * 取消收藏分享
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
                    title: "收藏失败",
                    desc: "请登录后再重试"
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
                    title: "点赞失败",
                    desc:"请登录后再重试"
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

/**
 * 点赞评论
 */
ShareApi["likeComment"] = async (userId, shareCommentId) => {
    let res = await Http.postSharesCommentsLikes({
        userId: userId,
        shareCommentId: shareCommentId
    }, true);

    return res
}

/**
 * 取消点赞评论
 */
ShareApi["notLikeComment"] = async (userId, shareCommentId) => {
    let res = await Http.deleteSharesCommentsLikes({
        userId: userId,
        shareCommentId: shareCommentId
    });

    return res
}

/**
 * 点赞分享评论
 */
ShareApi["likeShareComment"] = async (shareComment) => {
    if (
        sessionStorage.getItem("id") != "" &&
        sessionStorage.getItem("id") != null
    ) {
        if (!shareComment.liked) {
            let res = await ShareApi.likeComment(
                sessionStorage.getItem("id"),
                shareComment.id
            );
            if (res.status == 201) {
                shareComment.likes = shareComment.likes + 1;
                shareComment.liked = true;
                Notice.success({
                    title: "点赞成功"
                });
            } else {
                Notice.warning({
                    title: "点赞失败"
                });
            }
        } else {
            let res = await ShareApi.notLikeComment(
                sessionStorage.getItem("id"),
                shareComment.id
            );
            if (res.status == 204) {
                shareComment.likes = shareComment.likes - 1;
                shareComment.liked = false;
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


/**
 * 点赞评论的评论
 */
ShareApi["likeCommentComment"] = async (userId, shareCommentCommentId) => {
    let res = await Http.postSharesCommentsCommentsLikes({
        userId: userId,
        shareCommentCommentId: shareCommentCommentId
    }, true);

    return res
}

/**
 * 取消点赞评论的评论
 */
ShareApi["notLikeCommentComment"] = async (userId, shareCommentCommentId) => {
    let res = await Http.deleteSharesCommentsCommentsLikes({
        userId: userId,
        shareCommentCommentId: shareCommentCommentId
    });

    return res
}

/**
 * 点赞分享评论
 */
ShareApi["likeShareCommentComment"] = async (shareCommentComment) => {
    if (
        sessionStorage.getItem("id") != "" &&
        sessionStorage.getItem("id") != null
    ) {
        if (!shareCommentComment.liked) {
            let res = await ShareApi.likeCommentComment(
                sessionStorage.getItem("id"),
                shareCommentComment.id
            );
            if (res.status == 201) {
                shareCommentComment.likes = shareCommentComment.likes + 1;
                shareCommentComment.liked = true;
                Notice.success({
                    title: "点赞成功"
                });
            } else {
                Notice.warning({
                    title: "点赞失败"
                });
            }
        } else {
            let res = await ShareApi.notLikeCommentComment(
                sessionStorage.getItem("id"),
                shareCommentComment.id
            );
            if (res.status == 204) {
                shareCommentComment.likes = shareCommentComment.likes - 1;
                shareCommentComment.liked = false;
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