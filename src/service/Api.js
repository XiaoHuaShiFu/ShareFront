const APIS = {
    // share
    listShares: {
        method: 'get',
        url: '/v1/shares'
    },
    postShares: {
        method: 'post',
        url: '/v1/shares'
    },
    postSharesLikes: {
        method: 'post',
        url: '/v1/shares/likes'
    },
    deleteSharesLikes: {
        method: 'delete',
        url: '/v1/shares/likes'
    },
    postSharesCollections: {
        method: 'post',
        url: '/v1/shares/collections'
    },
    deleteSharesCollections: {
        method: 'delete',
        url: '/v1/shares/collections'
    },

    // token
    postToken: {
        method: 'post',
        url: '/v1/tokens'
    },


    // user
    postUser: {
        method: 'post',
        url: '/v1/users'
    },
    getUser: {
        method: 'get',
        url: '/v1/users'
    }
}

export default APIS