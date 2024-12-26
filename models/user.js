
module.exports = (sequelize , DataTypes) =>{
    const User = sequelize.define("user" , {
        username : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        },
        email : {
            type : DataTypes.STRING
        },
        phoneNumber : {
            type : DataTypes.BIGINT
        }
    })

    return User;
}