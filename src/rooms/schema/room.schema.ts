import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema';

@Schema()
export class Room extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    public owner: User;

    @Prop({ required: true })
    public type: string;

    @Prop({ required: true })
    public streetName: string;

    @Prop({ required: true })
    public houseNumber: number;

    @Prop({ required: false })
    public bus: string;

    @Prop({ required: true })
    public city: string;

    @Prop({ required: true })
    public postalCode: string;

    @Prop({ required: true })
    public place: string;

    @Prop({ required: true })
    public country: string;

    @Prop({ required: false, nullable: true })
    public description: string;

    @Prop({ required: false, nullable: true })
    public householdDetails: string[];

    @Prop({ required: false, nullable: true })
    public propertyDetails: string[];

    @Prop({ required: false, nullable: true })
    public sharedSpaces: string[];

    @Prop({ required: false, nullable: true })
    public roomDetails: string[];

    @Prop({ required: false, nullable: true })
    public personalRoomDetails: string[];

    @Prop({ required: false, nullable: true })
    public uniqueAboutPlace: string[];

    @Prop({ required: false, nullable: true })
    public images: string[];

    @Prop({ required: false, nullable: true, type: [{ type: Types.ObjectId, ref: User.name }] })
    public members: User[];

    @Prop({ required: false, nullable: true, type: 'date' })
    public startDateAvailable: string;

    @Prop({ required: false, nullable: true, type: 'date' })
    public endDateAvailable: string;

    @Prop({ required: false, nullable: true })
    public pricing: string[];

    @Prop({ required: false, nullable: true })
    public idealAttendant: string[];

    @Prop({ required: false, nullable: true })
    public privacy: string[];

    @Prop({ required: false, nullable: true, type: 'date' })
    public meeting: string;

    @Prop({ required: true, default: false })
    public spotlight: boolean;
}

export type RoomDocument = Room & Document;
export const RoomSchema = SchemaFactory.createForClass(Room);
