import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema';
@Schema()
export class Room {
    @Prop({ required: true })
    public title: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    public members: User[];
}

export type RoomDocument = Room & Document;
export const RoomSchema = SchemaFactory.createForClass(Room);
