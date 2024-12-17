import { GroupChat } from "../model/groupchat";
import { GroupChatInput } from "../types";
import groupChatDB from "../repository/groupchat.db";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import userService from "./user.service";
import chatDb from "../repository/chat.db";

const getAllGroupChats = async () => groupChatDB.getAllGroupChats();

const getGroupChatById = async ({ id }: { id: number }) => {
    const groupChat = groupChatDB.getGroupChatById(id);

    if (!groupChat) {
        throw new Error(`groupChat with id ${id} does not exist.`);
    }
    return groupChat
};

const createGroupChat = async (groupChat: GroupChatInput) => {

    const newGroupChat = new GroupChat({
        id: groupChat.id,
        name: groupChat.name,
        description: groupChat.description,
        createdAt: groupChat.createdAt
    });

    return groupChatDB.createGroupChat(newGroupChat);
}
const addchattoGroupChat = async (groupChatId: number, chatId: number) => {
    const groupChat = await groupChatDB.getGroupChatById(groupChatId);
    if (!groupChat) {
        throw new Error(`GroupChat with id ${groupChatId} does not exist.`);
    }
    const chat = await chatDb.getChatById(chatId);
    if (!chat) {
        throw new Error(`Chat with id ${chatId} does not exist.`);
    }
    return groupChatDB.addchattoGroupChat(groupChatId, chatId);
}

const getGroupchatbyFirstname = async (firstname: string) => {
    const user = await userDb.getUserByFirstname(firstname);
    if (!user) {
        throw new Error(`User with firstname ${firstname} does not exist.`);
    }
    console.log(user);
    return groupChatDB.getGroupchatbyFirstname(firstname);
}

const deleteGroupChat = async (id: number) => {
    const groupChat = await groupChatDB.getGroupChatById(id);
    if (!groupChat) {
        throw new Error(`GroupChat with id ${id} does not exist.`);
    }
    return groupChatDB.deleteGroupChat(id);
}



export default {
    getAllGroupChats,
    getGroupChatById,
    createGroupChat,
    addchattoGroupChat,
    getGroupchatbyFirstname,
    deleteGroupChat
};