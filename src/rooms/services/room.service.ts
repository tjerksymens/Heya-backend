import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from '../dto';
import { Room } from '../schema';

@Injectable()
export class RoomService {
    public constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

    public async getAllRooms(filters?: any): Promise<Room[]> {
        const { city, keywords } = filters;
        let query = this.roomModel.find();

        if (city) {
            query = query.where('city').equals(city);
        }

        if (keywords && keywords.length > 0) {
            const keywordRegex = new RegExp(keywords.join('|'), 'i');
            query = query.where('description').regex(keywordRegex);
        }

        return query.exec();
    }

    public async getRoom(id: string): Promise<Room> {
        const room = await this.roomModel.findById(id).exec();
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found.`);
        }
        return room;
    }

    public async createRoom(roomData: RoomDto): Promise<Room> {
        const newRoom = new this.roomModel(roomData);
        return newRoom.save();
    }

    public async updateRoom(id: string, roomData: RoomDto): Promise<Room> {
        const updatedRoom = await this.roomModel.findByIdAndUpdate(id, roomData, { new: true }).exec();
        if (!updatedRoom) {
            throw new NotFoundException(`Room with ID ${id} not found.`);
        }
        return updatedRoom;
    }

    public async updateRoomPart(id: string, roomData: RoomDto): Promise<Room> {
        const updatedRoom = await this.roomModel.findByIdAndUpdate(id, roomData, { new: true }).exec();
        if (!updatedRoom) {
            throw new NotFoundException(`Room with ID ${id} not found.`);
        }
        return updatedRoom;
    }

    public async deleteRoom(id: string): Promise<void> {
        const result = await this.roomModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Room with ID ${id} not found.`);
        }
    }
}
