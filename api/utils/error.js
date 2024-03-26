//自创error，想显示什么就显示什么
export const errorHandler=(statusCode,message)=>{
    const error=new Error()
    error.statusCode=statusCode
    error.message=message;
    return error;
};