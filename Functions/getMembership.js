exports.getMembership = function(Membership){
    var factura = 0;
    switch (Membership) {
        case "Mensual":
            factura = 25000;
            break;
        case "Trimestral":
            factura = 22500;
            break;
        case "Semestral":
            factura = 20000;
            break;
        case "Anual":
            factura = 17500;
            break;
        default:
            factura = 25000;
            break;
    }

    return factura;
}