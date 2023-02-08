require('dotenv').config();

class AppConfig{

    name: string = process.env.APP_NAME || 'MONEY LOVER';

    port: number = Number(process.env.SV_PORT || 8000);

    host: string = process.env.APP_HOST || 'localhost';

    expiredStaticFiles = process.env.APP_EXPIRED_STATIC_FILES || '31557600000'; 
}

export default AppConfig;
