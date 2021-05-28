function createCookie(res, token) {
    res.cookie('jwt', token, {sameSite: "strict", path: '/', httpOnly: true});
}

module.exports = createCookie;