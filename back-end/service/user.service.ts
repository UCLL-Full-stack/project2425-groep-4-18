import { de } from 'date-fns/locale';
import userDB  from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput, Role } from '../types';
import { Chat } from '../model/chat';
import { generateJwtToken } from '../util/jwt';
import bcrypt from 'bcrypt'



const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserById = async ({id}: {id:number}) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  return userDB.getUserById(id);
}
const createUser = async (user: UserInput) => {
  console.log(user)
  if(await userDB.getUserByFirstName(user.firstname) != undefined){
    throw new Error(`User already exists`)
  }
  const hashedpasswd = await bcrypt.hash(user.password,12) 

  const newUser = new User({
    password: hashedpasswd,
    firstName: user.firstname,
    name: user.name,
    role: user.role,
  });
  return userDB.createUser(newUser);
}
const getUserByName = async (firstname: string) => {
  return userDB.getUserByFirstName(firstname);
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
      firstname: user.getFirstName(),
      token: generateJwtToken({firstname:user.getFirstName(),role:user.getRole()}),
      fullname: `${user.getFirstName()} ${user.getName()}`,
      role: user.getRole() as Role
  }
}

export default
{ 
  getAllUsers,
  getUserById,
  createUser,
  authenticateUser,
  getUserByName
 };