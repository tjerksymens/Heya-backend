import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Owner {
    @Prop()
    public name: string;

    @Prop()
    public contact: string;
}

export type UserDocument = Owner & Document;
export const UserSchema = SchemaFactory.createForClass(Owner);
