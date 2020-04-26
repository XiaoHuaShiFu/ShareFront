const APIS = {
    // share
    listShares: {
        method: 'get',
        url: '/v1/shares'
    },
    // 收藏列表
    listSharesCollections: {
        method: 'get',
        url: '/v1/shares/collections'
    },
    listShareComments: {
        method: 'get',
        url: '/v1/shares/comments'
    },
    postShareComment: {
        method: 'post',
        url: '/v1/shares/comments'
    },
    listShareCommentComments: {
        method: 'get',
        url: '/v1/shares/comments/comments'
    },
    postShareCommentComment: {
        method: 'post',
        url: '/v1/shares/comments/comments'
    },
    getShare: {
        method: 'get',
        url: '/v1/shares'
    },
    postShares: {
        method: 'post',
        url: '/v1/shares'
    },
    putShares: {
        method: 'put',
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
    postSharesCommentsLikes: {
        method: 'post',
        url: '/v1/shares/comments/likes'
    },
    deleteSharesCommentsLikes: {
        method: 'delete',
        url: '/v1/shares/comments/likes'
    },
    postSharesCommentsCommentsLikes: {
        method: 'post',
        url: '/v1/shares/comments/comments/likes'
    },
    deleteSharesCommentsCommentsLikes: {
        method: 'delete',
        url: '/v1/shares/comments/comments/likes'
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
    },
    listUsers: {
        method: 'get',
        url: '/v1/users'
    },
    // 更新用户
    putUser: {
        method: 'put',
        url: '/v1/users'
    },

    // 管理员
    postAdmin: {
        method: 'post',
        url: '/v1/admins'
    },
    getAdmin: {
        method: 'get',
        url: '/v1/admins'
    },
    listAdminLog: {
        method: 'get',
        url: '/v1/admins/logs'
    },

    // 敏感词
    postSensitiveWord: {
        method: 'post',
        url: '/v1/sensitive_words'
    },
    listSensitiveWords: {
        method: 'get',
        url: '/v1/sensitive_words'
    },
    deleteSensitiveWord: {
        method: 'delete',
        url: '/v1/sensitive_words'
    }
    
}

export default APIS