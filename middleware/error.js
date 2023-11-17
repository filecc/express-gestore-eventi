module.exports = function (err, req, res, next){
    res.json({
        code: err.statusCode, 
        error: err.message
    })
}