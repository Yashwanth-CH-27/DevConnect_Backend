
const updateValidator = (req) => {
    const allowedKeys = [ "firstName", "lastName", "age", "about", "photoURL", "skills", "gender" ];
    const isUpdateValid = Object.keys(req.body).every(key => allowedKeys.includes(key));
    return isUpdateValid;
}

module.exports = updateValidator;