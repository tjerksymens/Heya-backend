import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EventEnum } from '../../shared';

@Schema()
export class Calendar extends Document {
    @Prop({ required: true })
    public title: string;

    @Prop({ required: false, nullable: true })
    public description: string;

    @Prop({ required: true, enum: EventEnum })
    public event: EventEnum;

    @Prop({ required: true, type: Date })
    public timestamp: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    public userId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    public otherUsersId: Types.ObjectId[];
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
