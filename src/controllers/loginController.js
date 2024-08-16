import  User  from '../models/usersModel.js';

const getUserLoginData = async()=>{
    try {
        let userLoginData = await User.find({}, 'userID userEmail userPassword');
        return userLoginData;
    } catch (error) {
        console.log('error al obtener la lsita de usuarios / loginController.js - userLoginData', error);
        throw error;        
    }
}

// busco si existe el correo electronico y devuelve los datos de usuario 
// devuelvo el id, email y el passeord , si el user no existe devuelvo false 
const getUserByEmail = async(emailForm)=>{
    let userLoginData = await getUserLoginData();
    let userEmail = emailForm.toLowerCase()
    let userDataLogin = false;
    for (let i = 0; i < userLoginData.length; i++){
        if (userLoginData[i].userEmail === userEmail ){
            userDataLogin = userLoginData[i];
            break
        }
    }
    return userDataLogin;
}

export { getUserLoginData, getUserByEmail};