import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ required: true })
    public userId: string;

    @Prop({ required: true })
    public content: string;

    @Prop({ default: Date.now })
    public timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
