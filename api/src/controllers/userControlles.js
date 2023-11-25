const {User} = require('../db')

const createUserDB = async (name, email, password) =>{
    return await User.create({
        name, email, password
    })
}

const loginUserDB = async (email, password)=>{
    const mailFind = await User.findOne({
        where: {email: email}
    })
    if (mailFind) {
        const passFind = await User.findOne({
            where: {password: password}
        })
        if (passFind) {
            return {access: true}
        } else { throw Error ('Password failed') }
    }  else { throw Error ('Email failed') }

}

module.exports = {
    createUserDB,
    loginUserDB
}