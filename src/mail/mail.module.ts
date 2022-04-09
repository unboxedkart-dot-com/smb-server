import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: ' smtpout.secureserver.net',
        secure: false,
        auth: {
          user: 'hello@imsunil.com',
          pass: 'Imsunil9',
        },
      },
      defaults: {
        from: 'No Reply <noreply@unboxedkart.com>',
      },
      template: {},
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
