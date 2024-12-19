import { de } from 'date-fns/locale';
import userDB  from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput, Role } from '../types';
import { Chat } from '../model/chat';
import { generateJwtToken } from '../util/jwt';
import bcrypt from 'bcrypt'



const getAllUsers = async ({firstname,role}: {firstname:string,role:string}): Promise<User[]> => {
  if(role === 'admin'){
    return userDB.getAllUsers();
  }
  if(role === 'lecturer'){
    return userDB.getAllStudentAndLectures();
  }
  if(role === 'student'){
    return userDB.getAllStudent();
  }
  else{
    throw new Error('Unauthorized');
  }
}

const getUserById = async ({id}: {id:number}) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  return userDB.getUserById(id);
}
const createUser = async (user: UserInput) => {
  console.log(user)
  if(await userDB.getUserByFirstname(user.firstname) != undefined){
    throw new Error(`User already exists`)
  }
  const hashedpasswd = await bcrypt.hash(user.password,12) 

  const newUser = new User({
    password: hashedpasswd,
    firstname: user.firstname,
    name: user.name,
    role: user.role,
  });
  return userDB.createUser(newUser);
}
const getUserByName = async (firstname: string) => {
  return userDB.getUserByFirstname(firstname);
}

const authenticateUser = async ({firstname,password}:{firstname:string,password:string}): Promise<AuthenticationResponse> =>{


  const user = await getUserByName(firstname);
  if(!user){
      throw new Error(`Invalid credentials`)
  }
  if(!await bcrypt.compare(password,user.getPassword())){
      throw new Error(`Invalid credentials`)
  }
  return {
      id: user.getId(),
      firstname: user.getFirstname(),
      token: generateJwtToken({firstname:user.getFirstname(),role:user.getRole()}),
      fullname: `${user.getFirstname()} ${user.getname()}`,
      role: user.getRole() as Role
  }
}


const deleteUser = async (id: number) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  return userDB.deleteUser(id);
}

export default
{ 
  getAllUsers,
  getUserById,
  createUser,
  authenticateUser,
  getUserByName,
  deleteUser
 };