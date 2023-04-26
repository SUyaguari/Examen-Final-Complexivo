import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Client {

    @Prop({
        type: String
    })
    name: string;
    
    @Prop({
        type: String
    })
    lastName: string;
    
    @Prop({
        type: Number
    })
    age: number;
    
    @Prop({
        type: String
    })
    gender: string;
    
    @Prop({
        type: String
    })
    educationLevel: string;
    
    @Prop({
        type: String
    })
    nationality: string;

    @Prop({
        type: String,
        unique: true
    })
    email: string;

    @Prop({
        type: String
    })
    password: string;

    @Prop({
        type: String
    })
    date?: string;;
    
    @Prop()
    time?: number;

}

export const clientSchema = SchemaFactory.createForClass(Client);
