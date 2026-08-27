import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 4000;
  const apiPrefix = process.env.API_PREFIX || '/api/v1';

  // Global Prefix
  app.setGlobalPrefix(apiPrefix);

  // CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Allow all local dev origins
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  });

  // Global Pipes & Interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('ERP MBG Enterprise API')
    .setDescription(
      'Dokumentasi Resmi REST API Sistem Enterprise Resource Planning (ERP) Program Makanan Bergizi Gratis (MBG) Nasional - Badan Gizi Nasional (BGN)'
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Masukkan JWT token otorisasi',
        in: 'header',
      },
      'JWT-auth'
    )
    .addTag('System Health', 'Endpoint pemantauan status server & koneksi database')
    .addTag('Authentication', 'Autentikasi, login & token manajemen')
    .addTag('Users & RBAC', 'Pengguna sistem & matriks perizinan wewenang')
    .addTag('Supplier & Vendor', 'Manajemen rekanan, sertifikasi ISO/Halal & performa')
    .addTag('Gudang & Stok', 'Master stok bahan, mutasi IN/OUT & telemetri cold chain')
    .addTag('Menu & Nutrisi AKG', 'Formula resep, standar gizi Kemenkes & analisis biaya porsi')
    .addTag('Dapur Sentral SPPG', 'Monitoring batch masak, kontrol CCP HACCP & uji organoleptik')
    .addTag('Logistik & Distribusi', 'Titik distribusi sekolah sasaran, surat jalan & bukti terima PoD')
    .addTag('Manajemen Aset', 'Master inventaris mesin/armada & inspeksi higienitas')
    .addTag('Finansial & Anggaran', 'Realisasi DPA APBN, kuitansi BKK & rekonsiliasi SP2D')
    .addTag('Audit & Kepatuhan ISO', 'Audit trail forensik BPK, kepatuhan ISO 22000/27001 & CAPA')
    .addTag('SDM & Karyawan', 'Direktori karyawan, shift dapur, MCU steril & slip gaji')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'ERP MBG API Documentation | Badan Gizi Nasional',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(port);
  logger.log(`🚀 ERP MBG Backend API is running on: http://localhost:${port}${apiPrefix}`);
  logger.log(`📚 Swagger API Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();
