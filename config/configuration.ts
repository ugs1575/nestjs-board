export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true,
    logging: true,         // ← 콘솔에 모든 쿼리 출력
    logger: 'advanced-console', // 포맷 개선 (기본값)
  }
});