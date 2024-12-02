import { ro } from 'date-fns/locale';
import { User } from '../model/user';
import { resolve } from 'path';
import exp from 'constants';
import database from './database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: {
                groupchats: true,
            },
        });
        console.log(userPrisma)
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | undefined> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {
                groupchats: true
            },
        });
        return userPrisma ? User.from(userPrisma) : undefined;
        
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
        
    }
};

const getUserByFirstName = async (firstname: string): Promise<User | undefined> => {
    try{
        const userPrisma = await database.user.findFirst({
            where: { firstName: firstname },
            include: {
                groupchats:true,
            },
        });
        return userPrisma ? User.from(userPrisma) : undefined;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name: user.getName(),
                firstName: user.getFirstName(),
                password: user.getPassword(),
                role: user.getRole(),

            },
            include: {
                groupchats: true 
                
            },
        });
        return User.from(userPrisma);

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');  
    }
};

export default { getAllUsers, getUserById, createUser, getUserByFirstName };
