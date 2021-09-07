exports.getCuenta = function(num){
    var cuenta = "";
    switch (num) {
        case 1:
            cuenta = "Administrador";
            break;
        case 2:
            cuenta = "Empleado";
            break;
        default:
            cuenta = "Cliente";
            break;
 
    }

    return cuenta;
}