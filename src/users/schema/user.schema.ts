import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GenderEnum } from '../../shared';
import { Room } from '../../rooms/schema';

@Schema()
export class User {
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

    @Prop({ required: false, nullable: true })
    public imageLink: string;

    @Prop({ required: true })
    public rentsRoom: boolean;

    @Prop({ required: false, nullable: true, type: Types.ObjectId, ref: 'Room' })
    public room: Room;

    @Prop({ required: false, nullable: true })
    public userStayInfo: string[];

    @Prop({ required: false, nullable: true })
    public userInfo: string[];

    @Prop({ required: false, nullable: true })
    public userExpectations: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
