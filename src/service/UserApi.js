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

export default UserApi