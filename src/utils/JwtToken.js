const SendToken = (user , statusCode , res ) => {

    const token = user.getJWTToken();

    // option for cookie

    const options = {

       
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 *1000
        ),
        httpOnly: true,
        secure: true,
<<<<<<< HEAD
        SameSite: "none",
    
=======
      sameSite: "Strict"
        
      
>>>>>>> b5a754a8c3968bc9c3e800ced80f5df7da954bf3
    };

    res.status(statusCode).cookie("token", token , options ).json({
        success: true,
        user
    });


};

export { SendToken }
