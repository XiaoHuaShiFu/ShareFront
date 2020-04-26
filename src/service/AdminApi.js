import Http from './Http';

const AdminApi = {};

/**
 * 获取admin并存储在缓存
 */
AdminApi["getAdminAndSaveInSessionStorage"] = async (id)=> {
    let admin = await AdminApi.getAdmin(id);
    if (admin.status != 200) {
        return admin;
    }
    sessionStorage.setItem("admin", JSON.stringify(admin.data));
    return admin.data
}

/**
 * 获取admin
 */
AdminApi["getAdmin"]  = async (id)=>{
    let getAdminResult = await Http.getAdmin({},false,{},"/" + id);
    return getAdminResult
}

// AdminApi["putUser"]  = async (id, isOpen)=>{
//     let getUserResult = await Http.putUser({
//         id:id,
//         open:isOpen
//     },true);
//     return getUserResult
// }


export default AdminApi