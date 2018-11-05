const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

const checkAuth = (req, res, next) => {
  
  const token = req.cookies.token //  || req.body.token || req.headers['x-access-token'] || req.query.token

  try {
    
    if (!token) {
      res.redirect('/app/login.html');
    }
    
    if (!!req.route.path.match(/login/) || !!req.route.path.match(/signup/)) {
      res.redirect('/app/index.html');
      // res.redirect('back');
    }
    
    jwt.verify(token, secret, (err, decoded) => {
      
      if (err) {
        console.log(`checkauth err`, err);
        
        if (err.TokenExpiredError) {
          let yest = new Date();
          yest.setDate(yest.getDate() - 1);
          
          res.clearCookie("token");
          res.redirect('/app/login.html');
        }
        
        res.send('Unauthorized');
      }

      console.log(`checkauth decoded`, decoded);

      next();
    })

  } catch (error) {
    console.log(`checkAuth error:`, error)
  }

  
}

module.exports = checkAuth;