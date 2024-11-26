const { createLogger, transports } = require('winston');
const { AppError } = require('./app-errors');


const LogErrors = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'app_error.log' })
    ]
  });
    

class ErrorLogger {
    constructor(){}
    async logError(err){
        console.log('==================== Start Error Logger ===============');
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`
          });
        console.log('==================== End Error Logger ===============');
        // log error with Logger plugins
      
        return false;
    }

    isTrustError(error){
        if(error instanceof AppError){
            return error.isOperational;
        }else{
            return false;
        }
    }
}

/**
 * 
 * @param {AppError} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
const ErrorHandler = async(err,req,res,next) => {
    
    const errorLogger = new ErrorLogger();
    
    // console.log(err.description, '-------> DESCRIPTION')
    // console.log(err.message, '-------> MESSAGE')
    // console.log(err.name, '-------> NAME')
    if(err){
        await errorLogger.logError(err);
        if(errorLogger.isTrustError(err)){
            if(err.errorStack){
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({'message': errorDescription})
            }
            return res.status(err.statusCode).json({'message': err.message })
        }else{
            //process exit // terriablly wrong with flow need restart
        }
        return res.status(err.statusCode).json({'message': err.message})
    }

    
    process.on('uncaughtException', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason; // need to take care
    })

    process.on('uncaughtException', (error) => {
        errorLogger.logError(error);
        if(errorLogger.isTrustError(err)){
            //process exist // need restart
        }
    })

    process.on('unhandledRejection', (reason, promise) => {
        errorLogger.logError(reason);
        throw reason;
    })

    next();
}

module.exports = ErrorHandler;