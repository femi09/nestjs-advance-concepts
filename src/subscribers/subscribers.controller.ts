import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { ClientGrpc } from '@nestjs/microservices';
import CreateSubscriberDto from './dto/createSubscriber.dto';
import SubscribersService from './subscribers.service.interface';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscribersController implements OnModuleInit {
  private subscribersService: SubscribersService;
  constructor(
    @Inject('SUBSCRIBERS_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.subscribersService = this.client.getService<SubscribersService>('SubscribersService');
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getSubscribers() {
    return await this.subscribersService.getAllSubscribers({})
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() subscriber: CreateSubscriberDto) {
    return await this.subscribersService.addSubscriber(subscriber)
  }
}
