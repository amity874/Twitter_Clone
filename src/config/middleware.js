const setFlash=function(req,res,next){
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error'),
        'info':req.flash('info'),
        'tweet_create':req.flash('tweet_create')
    }
    next(); 
}
module.exports={setFlash};