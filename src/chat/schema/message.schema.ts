import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
    @Prop({ required: true, type: String })
    public userId: string;

    @Prop({ required: true, type: String })
    public sentToUserId: string;

    @Prop({ required: true })
    public content: string;

    @Prop({ default: Date.now })
    public timestamp: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
