import { Chat } from '../model/chat';
import chatDB from '../repository/chat.db';
import userDb from '../repository/user.db';
import { ChatInput } from '../types';

const getAllChat = async (): Promise<Chat[]> => chatDB.getAllChats();


const getChatByUserId = ({ userId }: { userId: number }) => {
    return chatDB.getChatByUserId(userId);
};

const getChatById = async ({ id }: { id: number }) => {
    const chat =  chatDB.getChatById(id);

    if (!chat) {
        throw new Error(`chat with id ${id} does not exist.`);
    }
    return chat
};
const createChat = async (chat: ChatInput) => {
    console.log("User :" + chat.user)

    if (chat.user === undefined) {
        throw new Error(`User ID is undefined.`);
    }
    const user = await userDb.getUserByFirstname(chat.user);
    console.log("test "+user?.getname())
    if (user === null || user === undefined) {
        throw new Error(`User with id ${chat.user} does not exist.`);
    }

    const newChat = new Chat({
        message: chat.message,
        createdAt: chat.createdAt,
        user: user // Use the complete User object here
    });



    return chatDB.createChat(newChat);
}
export default {
    getAllChat,
    getChatByUserId,
    getChatById,
    createChat
};
