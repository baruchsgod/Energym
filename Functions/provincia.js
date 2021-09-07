exports.getProvince = function(num){
    var province = "";
    switch (num) {
        case 1:
            province = "San José";
            break;
        case 2:
            province = "Alajuela";
            break;
        case 3:
            province = "Cartago";
            break;
        case 4:
            province = "Heredia";
            break;
        case 5:
            province = "Guanacaste";
            break;
        case 6:
            province = "Puntarenas";
            break;
        case 7:
            province = "Limón";
            break;
        default:
            province = "Nothing";
            break;
    }

    return province;
}