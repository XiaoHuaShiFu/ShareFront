const APIS = {
    listShares: {
        method: 'get',
        url: '/v1/shares'
    },
    newContactForm: {
        method: 'post',
        url: '/contact/new/form'
    },
    newContactJson: {
        method: 'post',
        url: '/contact/new/json'
    },
    editContact: {
        method: 'put',
        url: '/contact/edit'
    },
    delContact: {
        method: 'delete',
        url: '/contact'
    },
    postToken: {
        method: 'post',
        url: '/v1/tokens'
    },
    postUser: {
        method: 'post',
        url: '/v1/users'
    }
}

export default APIS