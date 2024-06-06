import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from '../../users/schema';

@Schema()
export class Message {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
    public userId: UserDocument;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
    public sentToUserId: UserDocument;

    @Prop({ required: true })
    public content: string;

    @Prop({ default: Date.now })
    public timestamp: Date;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
