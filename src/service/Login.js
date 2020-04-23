import Http from './Http'

const login = async (username, password, tokenType)=>{
    let res = await Http.postToken({
        username: username,
        password: password,
        tokenType: tokenType,
    }, true);
    return res;
}

export default login