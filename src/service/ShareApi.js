import Http from './Http';
import adaptString from "./../utils/StringUtils";
import changeTime from "./../utils/DateUtils";

const ShareApi = {};

ShareApi["listShares"] = async (pageNum, pageSize, orderBy, contentLength)=> {
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

export default ShareApi