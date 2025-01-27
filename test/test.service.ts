import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import * as bcrypt from 'bcrypt'
import { Contact, User } from "@prisma/client";

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) {}

    async deleteUser() {
        await this.prismaService.user.deleteMany({
            where: {
                username: 'test'
            }
        })
    }

    async deleteContact() {
        await this.prismaService.contact.deleteMany({
            where: {
                username: 'test'
            }
        })
    }

    async deleteAddress() {
        await this.prismaService.address.deleteMany({
            where: {
                contact: {
                    username: 'test'
                }
            }
        })
    }

    async getUser(): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: {
                username: 'test'
            }
        })
    }


    async createUser() {
        await this.prismaService.user.create({
            data: {
                username: 'test',
                name: 'test',
                password: await bcrypt.hash('test', 10),
                token: 'test'
            }
        })
    }

    async getContact(): Promise<Contact | null> {
        return this.prismaService.contact.findFirst({
            where: {
                username: 'test'
            }
        })
    }

    async createContact() {
        await this.prismaService.contact.create({
            data: {
                first_name: 'test',
                last_name: 'test',
                email: 'test@example.com',
                phone: '123456789',
                username: 'test'
            }
        })
    }
}