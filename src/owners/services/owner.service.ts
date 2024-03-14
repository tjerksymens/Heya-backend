import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OwnerDto } from '../dto';
import { Owner } from '../schema';

@Injectable()
export class OwnerService {
    public constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}

    public async getAllOwners(): Promise<Owner[]> {
        return this.ownerModel.find().exec();
    }

    public async getOwner(id: string): Promise<Owner> {
        const owner = await this.ownerModel.findById(id).exec();
        if (!owner) {
            throw new NotFoundException(`Owner with ID ${id} not found.`);
        }
        return owner;
    }

    public async createOwner(ownerData: OwnerDto): Promise<Owner> {
        const newOwner = new this.ownerModel(ownerData);
        return newOwner.save();
    }

    public async updateOwner(id: string, ownerData: OwnerDto): Promise<Owner> {
        const updatedOwner = await this.ownerModel.findByIdAndUpdate(id, ownerData, { new: true }).exec();
        if (!updatedOwner) {
            throw new NotFoundException(`Owner with ID ${id} not found.`);
        }
        return updatedOwner;
    }

    public async deleteOwner(id: string): Promise<void> {
        const result = await this.ownerModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Owner with ID ${id} not found.`);
        }
    }
}
