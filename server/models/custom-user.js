
module.exports = function(Customuser) {
    // 去掉强制的email验证
    delete Customuser.validations.email;
    delete Customuser.validations.username;
};
