function checkAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).send('Access denied. Admin only.'); 
    }
}

module.exports = checkAdmin;
