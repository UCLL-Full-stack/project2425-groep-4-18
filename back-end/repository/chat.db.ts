import { ca } from 'date-fns/locale';
import { Chat } from '../model/chat';
import database from './database';



const getAllChats = async (): Promise<Chat[]> => {
    try {
        const chatPrisma = await database.chat.findMany({
            include: {
                user: {
                    include: {
                        chats: true,
                    }
                }
            }
        });
        return chatPrisma.map((chatPrisma) => Chat.from(chatPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getChatByUserId = async (userId: number): Promise<Chat[]> => {
    try {
        const chatPrisma = await database.chat.findMany({
            where: { userId: userId },
            include: {
                user: {
                    include: {
                        chats: true,
                    }
                }
            }
        });
        return chatPrisma.map((chatPrisma) => Chat.from(chatPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getChatById = async (id: number): Promise<Chat | null> => {
    try {
        const chatPrisma = await database.chat.findUnique({
            where: {id: id},
            include: {
                user: {
                    include: {
                        chats: true,
                    }
                }
            }
        })  
        return chatPrisma ? Chat.from(chatPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const createChat = async (chat: Chat): Promise<Chat> => {
    try {
        const chatPrisma = await database.chat.create({
            data: {
                message: chat.getMessage(),
                createdAt: chat.getCreatedAt(),
                user: {connect: {id: chat.getUser().getId()}
                },
            },
            include: {
                user: {
                    include: {
                        chats: true,
                    }
                }
            }
        })
        return Chat.from(chatPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllChats, getChatByUserId, getChatById, createChat };
