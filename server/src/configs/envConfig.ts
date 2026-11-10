import { logger } from "../utils/logger.js";




const enviornments = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    API_VERSION: process.env.API_VERSION
}

for(const [key, value] of Object.entries(enviornments)){
    if(!value){
        logger.error(`Missing environment variable: ${key}`);
        process.exit(1);
    }
}

const ENV = enviornments;
export default ENV;