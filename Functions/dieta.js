exports.getDiet = function(num){
    var diet = "";
    switch (num) {
        case "1":
            diet = "Keto";
            break;
        case "2":
            diet = "Vegetariana";
            break;
        case "3":
            diet = "Low Carb";
            break;
        case "4":
            diet = "Hipercalórica";
            break;
        case "5":
            diet = "Proteíca";
            break;
        case "6":
            diet = "Detox";
            break;
        default:
            diet = "Nothing";
            break;
    }

    return diet;
}