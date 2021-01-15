const layout = require('../layout');

const getError =(errors,prop) =>{
        try{
            return errors.mapped()[prop].msg
        }catch(error){
            return '';
        }
}


module.exports = ({req,errors}) =>{
    
     return layout ({content: `<div>
     your id is ${req.session.id};
     <form method ="POST">
     <input name ="email" placeholder = "email">

     ${getError(errors,'email')}
     <input name ="password" placeholder = "password">
     ${getError(errors, 'password')}
     <input name ="confirmpassword" placeholder = "confirmpassword">
     ${getError(errors,'confirmpassword')}
    <button>Sign In</button>
     </div>
     ` });
};