import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import * as fs from "fs"
import { join } from 'path';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get("ELASTICSEARCH_NODE"),
        auth: {
          username: configService.get("ELASTICSEARCH_USERNAME"),
          password: configService.get("ELASTICSEARCH_PASSWORD"),
        },
        tls: {
          requestCert: true,
          ca: fs.readFileSync(join(process.cwd(), 'ca.crt')),
          rejectUnauthorized: true,
      }
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule]
})
export class SearchModule {}