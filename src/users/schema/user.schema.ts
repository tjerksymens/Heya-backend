import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GenderEnum } from '../../shared';
import { Room } from '../../rooms/schema';
import { Auth } from '../../auth/schema';

@Schema()
export class User extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Auth' })
    public auth: Auth;

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

    @Prop({ required: false, nullable: true })
    public imageLink: string;

    @Prop({ required: true })
    public rentsRoom: boolean;

    @Prop({ required: false, nullable: true, type: Types.ObjectId, ref: 'Room' })
    public rentsRoomId: Room;

    @Prop({ required: false, nullable: true, type: Types.ObjectId, ref: 'Room' })
    public room: Room[];

    @Prop({ required: false, nullable: true })
    public userStayInfo: string[];

    @Prop({ required: false, nullable: true })
    public userInfo: string[];

    @Prop({ required: false, nullable: true })
    public userExpectations: string[];

    @Prop({ required: false, nullable: true })
    public preferredAccommodation: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
