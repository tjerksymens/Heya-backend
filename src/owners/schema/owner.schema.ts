import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GenderEnum } from '../../shared';
import { Room } from '../../rooms/schema';

@Schema()
export class Owner extends Document {
    @Prop({ required: true })
    public firstName: string;

    @Prop({ required: true })
    public lastName: string;

    @Prop({ enum: GenderEnum })
    public gender: GenderEnum;

    @Prop({ required: false, nullable: true, type: 'date' })
    public birthday: string;

    @Prop({ required: false, nullable: true })
    public phoneNumber: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Rooms' })
    public owner: Room[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
