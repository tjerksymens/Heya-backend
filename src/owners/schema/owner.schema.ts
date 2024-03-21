import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GenderEnum } from '../enums';
import { Room } from '../../rooms/schema';

@Schema()
export class Owner {
    @Prop({ required: true })
    public firstName: string;

    @Prop({ required: true })
    public lastName: string;

    @Prop({ enum: GenderEnum })
    public gender: GenderEnum;

    @Prop({ required: false, nullable: true, type: 'date' })
    public birthday: string;

    @Prop({ required: true })
    public email: string;

    @Prop({ required: true })
    public password: string;

    @Prop({ required: false, nullable: true })
    public phoneNumber: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Room' })
    public owner: Room;
}

export type OwnerDocument = Owner & Document;
export const OwnerSchema = SchemaFactory.createForClass(Owner);
