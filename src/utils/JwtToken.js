const SendToken = (user , statusCode , res ) => {

    const token = user.getJWTToken();

    // option for cookie

    const options = {

       
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 *1000
        ),
        httpOnly: true,
        secure: true
        
      
    };

    res.status(statusCode).cookie("token", token , options ).json({
        success: true,
        user
    });


};

export { SendToken }
