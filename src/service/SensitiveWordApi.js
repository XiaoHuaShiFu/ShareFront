import Http from './Http';

const SensitiveWordApi = {};

/**
 * 查询敏感词
 */
SensitiveWordApi["listSensitiveWords"] = async (pageNum, pageSize) => {
    let res = await Http.listSensitiveWords({
        pageNum: pageNum,
        pageSize: pageSize,
    });

    return res
}

/**
 * 创建敏感词
 */
SensitiveWordApi["saveSensitiveWord"] = async (SensitiveWord) => {
    let res = await Http.postSensitiveWord({
        SensitiveWord: SensitiveWord,
    }, true);
    return res
}

/**
 * 删除敏感词
 */
SensitiveWordApi["deleteSensitiveWord"] = async (id) => {
    let res = await Http.deleteSensitiveWord({}, false, {}, "/" + id);
    return res
}


export default SensitiveWordApi