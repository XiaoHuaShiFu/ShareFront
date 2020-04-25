const APIS = {
    // share
    listShares: {
        method: 'get',
        url: '/v1/shares'
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
    }
}

export default APIS