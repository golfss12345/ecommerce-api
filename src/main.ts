import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const apiPrefix = 'api';

  app.setGlobalPrefix(apiPrefix);

  if (configService.get('NODE_ENV') === 'production') {
    app.enableCors({
      origin: configService.get<string>('ALLOWED_ORIGINS')?.split(','),
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
  } else {
    app.enableCors();
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = configService.get<number>('PORT') ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription(
      `
## 🛒 E-commerce Backend Services
ระบบบริหารจัดการร้านค้าออนไลน์ที่ออกแบบด้วยโครงสร้างแบบ **Modular Architecture** เพื่อความคงทนและรองรับการขยายตัว (Scalability)

### 🛠 เทคโนโลยีหลัก (Core Stack)
* **Engine:** [NestJS v11](https://nestjs.com/) - Node.js Framework สำหรับ Enterprise Application
* **Language:** [TypeScript](https://www.typescriptlang.org/) - เพิ่มประสิทธิภาพการเขียนโค้ดด้วย Type-safety
* **Database:** [PostgreSQL](https://www.postgresql.org/) บริหารจัดการผ่าน [TypeORM](https://typeorm.io/)
* **Documentation:** [Scalar](https://scalar.com/) & [Swagger](https://swagger.io/)

### 🔐 ระบบความปลอดภัย (Security & Auth)
* **Authentication:** ใช้สถาปัตยกรรม **Passport.js** ร่วมกับ **JWT (JSON Web Token)**
* **Data Protection:** เข้ารหัสรหัสผ่านด้วยระบบ **Bcrypt** (Salt rounds: 10-12)
* **Validation:** ตรวจสอบข้อมูลขาเข้า (Payload) อย่างเข้มงวดด้วย **Class-validator** และ **Joi**

### 🚀 การใช้งานเบื้องต้น
1.  **Authorize:** ทำการ Login ผ่าน Auth Module เพื่อรับ Token
2.  **Bearer Auth:** นำ Token ที่ได้มาใส่ในปุ่ม "Authorize" (ระบุในรูปแบบ \`Bearer <token>\`)
3.  **Explore:** เลือกยิง API ตาม Module ต่างๆ ที่จัดกลุ่มไว้ด้านซ้ายมือ
  `,
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/docs',
    apiReference({
      content: document,
      theme: 'elysiajs',
      favicon: 'https://www.freeiconspng.com/uploads/document-icon-19.png',
      pageTitle: 'Eccomerce API',
      title: 'Eccomerce API',
      layout: 'modern',
      hiddenClients: ['php', 'python', 'ruby'],
      authentication: {
        preferredSecurityScheme: 'bearer',
      },
    }),
  );

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API is listening on all interfaces at port 3000`);
  // console.log(`📄 Document: ${await app.getUrl()}/docs`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
