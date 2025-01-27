import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AddressService } from "./address.service";
import { WebResponse } from "src/model/web.model";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, UpdateAddressRequest } from "src/model/address.model";
import { User } from "@prisma/client";
import { Auth } from "src/common/auth.decorator";

@Controller('/api/contacts/:contactId/addresses')
export class AddressController {
    constructor(
        private addressService: AddressService
    ) {}

    @Post()
    @HttpCode(200)
    async create(
        @Auth() user: User, 
        @Param('contactId', ParseIntPipe) contactId: number,
        @Body() request: CreateAddressRequest,
    ): Promise<WebResponse<AddressResponse>> {
        request.contact_id = contactId
        const result = await this.addressService.create(user, request)

        return {
            data: result
        }
    }

    @Get('/:addressId')
    @HttpCode(200)
    async get(
        @Auth() user: User, 
        @Param('contactId', ParseIntPipe) contactId: number,
        @Param('addressId', ParseIntPipe) addressId: number
    ): Promise<WebResponse<AddressResponse>> {
        const request: GetAddressRequest = {
            contact_id: contactId,
            address_id: addressId
        }
        const result = await this.addressService.get(user, request)

        return {
            data: result
        }
    }

    @Put('/:addressId')
    @HttpCode(200)
    async update(
        @Auth() user: User, 
        @Param('contactId', ParseIntPipe) contactId: number,
        @Param('addressId', ParseIntPipe) addressId: number,
        @Body() request: UpdateAddressRequest,
    ): Promise<WebResponse<AddressResponse>> {
        request.contact_id = contactId
        request.id = addressId
        const result = await this.addressService.update(user, request)

        return {
            data: result
        }
    }

    @Delete('/:addressId')
    @HttpCode(200)
    async remove(
        @Auth() user: User,
        @Param('contactId', ParseIntPipe) contactId: number,
        @Param('addressId', ParseIntPipe) addressId: number,
    ): Promise<WebResponse<boolean>> {
        const result = await this.addressService.remove(user, contactId, addressId)

        return {
            data: true
        }
    }

    @Get()
    @HttpCode(200)
    async list(
        @Auth() user: User, 
        @Param('contactId', ParseIntPipe) contactId: number
    ): Promise<WebResponse<AddressResponse[]>> {
        const result = await this.addressService.list(user, contactId)

        return {
            data: result
        }
    }
}