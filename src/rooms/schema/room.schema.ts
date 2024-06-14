import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema';
@Schema()
export class Room extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' + User.name })
    public owner: User;

    @Prop({ required: true })
    public streetname: string;

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
    public extraInfo: string;

    @Prop({ required: false })
    public furnished: boolean;

    @Prop({ required: false, nullable: true })
    public houseSize: number;

    @Prop({ required: false })
    public amountOfRooms: number;

    @Prop({ required: false })
    public whatIsShared: string;

    @Prop({ required: false })
    public whatIsPersonal: string;

    @Prop({ required: false, nullable: true })
    public amountOfStudents: number;

    @Prop({ required: false, nullable: true })
    public PeopleLivingHere: number;

    @Prop({ required: false, nullable: true })
    public areTherePets: boolean;

    @Prop({ required: false, nullable: true })
    public kindOfPets: string;

    @Prop({ required: false })
    public imageLink: string;

    @Prop({ required: false, type: 'date' })
    public startDateAvailability: string;

    @Prop({ required: false, type: 'date' })
    public endDateAvailability: string;

    @Prop({ required: false })
    public rentPrice: number;

    @Prop({ required: false })
    public additionalCost: number;

    @Prop({ required: false })
    public serviceCost: number;

    @Prop({ required: false })
    public deposit: number;

    @Prop({ required: false, nullable: true })
    public idealAttendantInfo: string[];

    @Prop({ required: false, nullable: true })
    public privacyInfo: string[];

    @Prop({ required: false, nullable: true, type: [{ type: Types.ObjectId, ref: 'User' + User.name }] })
    public members: User[];
}

export type RoomDocument = Room & Document;
export const RoomSchema = SchemaFactory.createForClass(Room);
