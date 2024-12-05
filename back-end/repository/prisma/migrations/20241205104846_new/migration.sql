/*
  Warnings:

  - You are about to drop the `_GroupChatToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupChatToUser" DROP CONSTRAINT "_GroupChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupChatToUser" DROP CONSTRAINT "_GroupChatToUser_B_fkey";

-- DropTable
DROP TABLE "_GroupChatToUser";
