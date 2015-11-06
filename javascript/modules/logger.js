//level : info warn debug error log

/*
*  param :
*    level : string
*    message : string
*/
function logger(level, message){
  var info = {
    pre : '%c [INFO] ',
    color : 'color: green'
  },
  warn = {
    pre : '%c [WARN] ',
    color : 'color: red'
  },
  debug = {
    pre : '%c [DEBUG] ',
    color : 'color: bule'
  },
  error = {
    pre : '%c [ERROR] ',
    color : 'color: purple'
  },
  log = {
    pre : '%c [LOG] ',
    color : 'color: black'
  }

  //Validate
  typeof level === 'string' && typeof message === 'string' ? true : !function(){
    console.log(error.pre + 'logger type error' , error.color);
  }();

  //case
  switch(level){
    case 'info' : console.log(info.pre + message , info.color);
      break;
    case 'warn' : console.log(warn.pre + message , warn.color);
      break;
    case 'debug' : console.log(debug.pre + message , debug.color);
      break;
    case 'error' : console.log(error.pre + message , error.color);
      break;
    case 'log' : console.log(log.pre + message , log.color);
      break;
    default : console.log(message);
  }

}

logger(1 , 'test입니다.');
//logger('info' , 'test입니다.');