import { ro } from 'date-fns/locale';
import { User } from '../model/user';
import { resolve } from 'path';
import exp from 'constants';
import database from './database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: {
                chats: true,
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
                chats: true
            },
        });
        return userPrisma ? User.from(userPrisma) : undefined;
        
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
        
    }
};

const getUserByFirstname = async (firstname: string): Promise<User | undefined> => {
    try{
        const userPrisma = await database.user.findFirst({
            where: { firstname: firstname },
            include: {
                chats:true,
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
                name: user.getname(),
                firstname: user.getFirstname(),
                password: user.getPassword(),
                role: user.getRole(),

            },
            include: {
                chats: true 
                
            },
        });
        return User.from(userPrisma);

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');  
    }
};

const getAllStudentAndLectures = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            where: {
                role: {
                    in: ['student', 'lecturer'],
                },
            },
            include: {
                chats: true,
            },
        });
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllStudent = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            where: {
                role: 'student',
            },
            include: {
                chats: true,
            },
        });
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default { getAllUsers, getUserById, createUser, getUserByFirstname,getAllStudentAndLectures,getAllStudent };
