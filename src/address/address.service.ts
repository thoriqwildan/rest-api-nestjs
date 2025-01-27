import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Address, User } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, UpdateAddressRequest } from "src/model/address.model";
import {Logger} from 'winston'
import { AddressValidation } from "./address.validation";
import { ContactService } from "src/contact/contact.service";

@Injectable()
export class AddressService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService,
        private contactService: ContactService
    ) {}

    async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        this.logger.debug(`AddressService.create(${user}, ${request})`)
        const createRequest: CreateAddressRequest = this.validationService.validate(AddressValidation.CREATE, request)

        await this.contactService.checkContactMustExists(user.username, createRequest.contact_id )

        const address = await this.prismaService.address.create({
            data: createRequest
        })

        return this.toAddressResponse(address)
    }

    toAddressResponse(address: Address): AddressResponse {
        return {
            id: address.id,
            street: address.street!,
            city: address.city!,
            province: address.province!,
            country: address.country,
            postal_code: address.postal_code
        }
    }

    async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        this.logger.debug(`AddressService.get(${user.name}, ${request.contact_id})`)
        const getRequest: GetAddressRequest = this.validationService.validate(AddressValidation.GET, request)

        await this.contactService.checkContactMustExists(user.username, getRequest.contact_id)

        const address = await this.checkAddressMustExists(getRequest.address_id, getRequest.contact_id)

        return this.toAddressResponse(address)
    }

    async checkAddressMustExists(address_id: number, contact_id: number): Promise<Address> {
        const address = await this.prismaService.address.findFirst({
            where: {
                id: address_id,
                contact_id: contact_id
            }
        })

        if (!address) {
            throw new HttpException('Address not Found!', 404)
        }

        return address
    }

    async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest: UpdateAddressRequest = this.validationService.validate(AddressValidation.UPDATE, request)

        await this.contactService.checkContactMustExists(user.username, updateRequest.contact_id)

        let address = await this.checkAddressMustExists(updateRequest.id, updateRequest.contact_id)

        address = await this.prismaService.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        })

        return this.toAddressResponse(address)
    }

    async remove(user: User, contactId: number, addressId: number): Promise<AddressResponse> {
        await this.checkAddressMustExists(addressId, contactId)
        await this.contactService.checkContactMustExists(user.username, contactId)

        const address = await this.prismaService.address.delete({
            where: {
                id: addressId,
                contact_id: contactId
            }
        })

        return this.toAddressResponse(address)
    } 

    async list(user: User, contactId: number): Promise<AddressResponse[]> {
        await this.contactService.checkContactMustExists(user.username, contactId)
        const addresses = await this.prismaService.address.findMany({
            where: {
                contact_id: contactId
            }
        })
        
        return addresses.map((address) => this.toAddressResponse(address))
    }
}