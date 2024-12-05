import { tr } from "date-fns/locale"
import database from "./database";
import { GroupChat } from "../model/groupchat";
import { User } from "../model/user";
import { Chat } from "../model/chat";


const getAllGroupChats = async () => {
    try {
        const groupChatPrisma = await database.groupChat.findMany({
            include: { 
                chats: {
                    include: {
                        user: true,
                    },
                },
             },
        });
        return groupChatPrisma.map((groupChatPrisma) => GroupChat.from(groupChatPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }

}

const getGroupChatById = async (id: number) => {
    try {
        const groupChatPrisma = await database.groupChat.findUnique({
            where: { id },
            include: { 
                chats: {
                    include: {
                        user: true,
                    },
                },
             },
        });
        return groupChatPrisma ? GroupChat.from(groupChatPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createGroupChat = async (groupChat: GroupChat): Promise<GroupChat> => {
    try {
        const groupChatPrisma = await database.groupChat.create({
            data: {
                name: groupChat.getName(),
                description: groupChat.getDescription(),
                createdAt: groupChat.getCreatedAt(),
            },
            include: { 
                chats: {
                    include: {
                        user: true,
                    },
                },
             },
        });
        return GroupChat.from(groupChatPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const addchattoGroupChat = async (groupChatid:number, chatid: number): Promise<GroupChat> => {
    try {

        const groupChatPrisma = await database.groupChat.update({
            where: { id: groupChatid },
            data: {
                chats: {
                    connect: { id: chatid },
                },
            },
            include: { 
                chats: {
                    include: {
                        user: true,
                    },
                },
             },
        });
        return GroupChat.from(groupChatPrisma);
        
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
        
    }
}

export default {
    getAllGroupChats,
    getGroupChatById,
    createGroupChat,
    addchattoGroupChat,
};