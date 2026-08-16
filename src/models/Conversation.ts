import mongoose, { Schema, Document } from "mongoose";
export interface IConversation extends Document{
    type: "direct" | "group";
    members: mongoose.Types.ObjectId[];
    name?: string,
    createdBy?: mongoose.Types.ObjectId;
}
const conversationSchema = new Schema<IConversation>(
    {
        type: {
            type: String,
            enum: ["direct", "group"],
            required: true,
            
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            

        ],
        name: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);
const Conversation =
    mongoose.models.Conversation ||
    mongoose.model<IConversation>("Conversation", conversationSchema);
export default Conversation;