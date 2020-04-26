import Http from './Http';

const UserApi = {};

UserApi["getUserAndSaveInSessionStorage"] = async (id)=> {
    let user = await UserApi.getUser(id);
    if (user.status != 200) {
        return user;
    }
    sessionStorage.setItem("user", JSON.stringify(user.data));
    return user.data
}

UserApi["getUser"]  = async (id)=>{
    let getUserResult = await Http.getUser({},false,{},"/" + id);
    return getUserResult
}

/**
 * 查询用户
 */
UserApi["listUsers"] = async (pageNum, pageSize, orderBy) => {
    let res = await Http.listUsers({
        pageNum: pageNum,
        pageSize: pageSize,
        orderBy: orderBy
    });

    return res.data
}

/**
 * 更新用户
 */
UserApi["updateUser"] = async (id, available) => {
    let res = await Http.putUser({
        id:id,
        available:available
    }, true);
    return res
}

export default UserApi