module.exports = function (err, req, res, next){
    res.status(400).json({
        code: err.statusCode, 
        error: err.message
    })
}