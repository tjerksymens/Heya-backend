import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Auth {
    @Prop()
    public name: string;

    @Prop({ unique: [true, 'Email bestaat al'] })
    public email: string;

    @Prop()
    public password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
