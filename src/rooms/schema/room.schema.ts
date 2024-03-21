import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema';
import { Owner } from '../../owners/schema';
@Schema()
export class Room {
    @Prop({ required: true })
    public title: string;

    @Prop({ required: false, nullable: true })
    public description: string;

    @Prop({ required: false, nullable: true })
    public extraInfo: string;

    @Prop({ required: true })
    public furnished: boolean;

    @Prop({ required: false, nullable: true })
    public houseSize: number;

    @Prop({ required: true })
    public amountOfRooms: number;

    @Prop({ required: true })
    public whatIsShared: string;

    @Prop({ required: true })
    public whatIsPersonal: string;

    @Prop({ required: false, nullable: true })
    public amountOfStudents: number;

    @Prop({ required: false, nullable: true })
    public PeopleLivingHere: number;

    @Prop({ required: false, nullable: true })
    public areTherePets: boolean;

    @Prop({ required: false, nullable: true })
    public kindOfPets: string;

    @Prop({ required: true })
    public imageLink: string;

    @Prop({ required: true, type: 'date' })
    public startDateAvailability: string;

    @Prop({ required: true, type: 'date' })
    public endDateAvailability: string;

    @Prop({ required: true })
    public rentPrice: number;

    @Prop({ required: true })
    public additionalCost: number;

    @Prop({ required: true })
    public serviceCost: number;

    @Prop({ required: true })
    public deposit: number;

    @Prop({ required: false, nullable: true })
    public idealAttendantInfo: string[];

    @Prop({ required: false, nullable: true })
    public privacyInfo: string[];

    @Prop({ required: true, type: Types.ObjectId, ref: 'Owner' + Owner.name })
    public owner: Owner;

    @Prop({ required: false, nullable: true, type: [{ type: Types.ObjectId, ref: 'User' + User.name }] })
    public members: User[];
}

export type RoomDocument = Room & Document;
export const RoomSchema = SchemaFactory.createForClass(Room);
