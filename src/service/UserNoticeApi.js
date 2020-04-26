import Http from './Http';
import changeTime from "./../utils/DateUtils";
const UserNoticeApi = {};

/**
 * 查询用户通知
 */
UserNoticeApi["listUserNotices"] = async (pageNum, pageSize, userId, count=false) => {
    let res = await Http.listUserNotices({
        pageNum: pageNum,
        pageSize: pageSize,
        userId:userId,
        count:count
    });
    for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].noticeTime = changeTime(
            res.data.list[i].noticeTime
        );
        res.data.list[i].keyValue = JSON.parse(res.data.list[i].keyValue);
    }
    return res
}

/**
 * 查询用户通知数量
 */
UserNoticeApi["countUserNotices"] = async (userId) => {
    let res = await Http.listUserNotices({
        userId:userId,
        count:true
    });
    return res
}

export default UserNoticeApi