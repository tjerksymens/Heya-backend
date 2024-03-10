import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema';
@Schema()
export class Room extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
