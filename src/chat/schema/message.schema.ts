import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message {
    @Prop({ required: true, type: String })
    public userId: string;

    @Prop({ required: true, type: String })
    public sentToUserId: string;

    @Prop({ required: true })
    public content: string;

    @Prop({ default: Date.now })
    public timestamp: Date;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
