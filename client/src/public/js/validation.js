function validateData(){
  if ($("#fPassword").val() === $("#sPassword").val()) {
    return true;
  }else{
    alert("Contraseñas no coinciden favor corregir este error.");
  }
}
