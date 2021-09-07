'use strict'

$(document).ready(function () {
var htmlmenuDesktop = `
<div class="container">
    <a class="navbar-brand" href="index.html"><img src="img/gym-logo.png" alt="gym logo"></a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
        data-target="#navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="/home">Home</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">Acceso<i class="fas fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Registro</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">Cliente<i class="fas fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="Cliente/HUM2-001-1.html">Actualizar datos</a></li>
                    <li><a href="Cliente/HUM2-002-1.html">Desactivar cuenta</a></li>
                    <li><a href="Cliente/HUM2-002-2.html">Reactivar cuenta</a></li>
                    <li><a href="Cliente/HUM2-003-1.html">Crear reserva</a></li>
                    <li><a href="Cliente/HUM2-003-2.html">Modificar reserva</a></li>
                    <li><a href="Cliente/HUM2-003-3.html">Lista de reservas</a></li>
                    <li><a href="Cliente/HUM2-003-4.html">Elimina reserva</a></li>
                    <li><a href="Cliente/HUM2-004-1.html">Enviar retroalimentacion</a></li>
                    <li><a href="Cliente/HUM2-004-2.html">Lista de comentarios</a></li>
                    <li><a href="Cliente/HUM2-005-1.html">Ver plan de dieta</a></li>
                    <li><a href="Cliente/HUM2-006-1.html">Ver plan de entrenamiento</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">Administrador<i
                        class="fas fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="Administrador/HUM3-001.html">Administrar usuarios</a></li>
                    <li><a href="Administrador/HUM3-002.html">Administrar muro</a></li>
                    <li><a href="Administrador/HUM3-003.html">Informar usuarios</a></li>
                    <li><a href="Administrador/HUM3-004.html">Administrar reportes</a></li>
                    <li><a href="Administrador/HUM3-005-1.html">Crear cuenta usuario</a></li>
                    <li><a href="Administrador/HUM3-005-2.html">Editar cuentas</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">Pagos<i class="fas fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="Pagos/HUMP-0011.html">Asignar membresía</a></li>
                    <li><a href="Pagos/HUMP-0012.html">Ingresar cliente a facturación</a></li>
                    <li><a href="Pagos/HUMP-0013.html">Crear pago</a></li>
                    <li><a href="Pagos/HUMP-0014.html">Aplicar pago</a></li>
                    <li><a href="Pagos/HUMP-0015.html">Crear nota de crédito</a></li>
                    <li><a href="Pagos/HUMP-0015.html">Crear nota de débito</a></li>
                    <li><a href="Pagos/HUMP-0031.html">Balance inicial</a></li>
                    <li><a href="Pagos/HUMP-0032.html">Arqueo de caja</a></li>
                    <li><a href="Pagos/HUMP-0041.html">Establecer balance</a></li>
                    <li><a href="Pagos/HUMP-0042.html">Modificar balance</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">Empleado<i class="fas fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="Empleado/HUEM-001.html">Modificar empleado</a></li>
                    <li><a href="Empleado/HUEM-002.html">Crear dieta</a></li>
                    <li><a href="Empleado/HUEM-002-01.html">Modificar dieta</a></li>
                    <li><a href="Empleado/HUEM-003.html">Crear rutina</a></li>
                    <li><a href="Empleado/HUEM-003-1.html">Modificar rutina</a></li>
                    <li><a href="Empleado/HUEM-004.html">Ver calendario</a></li>
                    <li><a href="Empleado/HUEM-005.html">Crear Métricas</a></li>
                    <li><a href="Empleado/HUEM-005-1.html">Modificar Métricas</a></li>
                    <li><a href="Empleado/HUEM-006.html">Historial cliente</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">Reporte<i class="fas fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                <li><a href="Reporte/HURM-001.html">Clientes activos</a></li>
                <li><a href="Reporte/HURM-002.html">Arqueo de caja</a></li>
                <li><a href="Reporte/HURM-003.html">Facturación</a></li>
                <li><a href="Reporte/HURM-004-1.html">Lista de eventos</a></li>
                <li><a href="Reporte/HURM-004-2.html">Reporte de reservas</a></li>
                <li><a href="Reporte/HURM-005-1.html">Reporte de retroalimentacion</a></li>
                <li><a href="Reporte/HURM-006-1.html">Planes de dietas</a></li>
                <li><a href="Reporte/HURM-006-2.html">Log de errores</a></li>
                <li><a href="Reporte/HURM-007.html">Ver historial</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
`
document.getElementById('mainNav').innerHTML = htmlmenuDesktop;
});

$(document).ready(function() {
    var htmlmenuMobile = `
    <a href="index.html"><img class="mobile-logo" src="assets/img/gym-logo.png" alt="Gym"></a>
    <ul class="nav navbar-nav navbar-right menu">
        <li class="nav-item active">
            <a class="nav-link" href="index.html">Home</a>
        </li>
        <li class="dropdown">
            <a>Acceso</a>
            <ul class="sub_menu">
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Registro</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a>Cliente</a>
            <ul class="sub_menu">
                <li><a href="Cliente/HUM2-001-1.html">Actualizar datos</a></li>
                <li><a href="Cliente/HUM2-002-1.html">Desactivar cuenta</a></li>
                <li><a href="Cliente/HUM2-002-2.html">Reactivar cuenta</a></li>
                <li><a href="Cliente/HUM2-003-1.html">Crear reserva</a></li>
                <li><a href="Cliente/HUM2-003-2.html">Modificar reserva</a></li>
                <li><a href="Cliente/HUM2-003-3.html">Lista de reservas</a></li>
                <li><a href="Cliente/HUM2-003-4.html">Elimina reserva</a></li>
                <li><a href="Cliente/HUM2-004-1.html">Enviar retroalimentacion</a></li>
                <li><a href="Cliente/HUM2-004-2.html">Lista de comentarios</a></li>
                <li><a href="Cliente/HUM2-005-1.html">Ver plan de dieta</a></li>
                <li><a href="Cliente/HUM2-006-1.html">Ver plan de entrenamiento</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a>Administrador</a>
            <ul class="sub_menu">
                <li><a href="Administrador/HUM3-001.html">Administrar usuarios</a></li>
                <li><a href="Administrador/HUM3-002.html">Administrar muro</a></li>
                <li><a href="Administrador/HUM3-003.html">Informar usuarios</a></li>
                <li><a href="Administrador/HUM3-004.html">Administrar reportes</a></li>
                <li><a href="Administrador/HUM3-005-1.html">Crear cuenta usuario</a></li>
                <li><a href="Administrador/HUM3-005-2.html">Editar cuentas</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a>Pagos</a>
            <ul class="sub_menu">
                <li><a href="Pagos/HUMP-0011.html">Asignar membresía</a></li>
                <li><a href="Pagos/HUMP-0012.html">Ingresar cliente a facturación</a></li>
                <li><a href="Pagos/HUMP-0013.html">Crear pago</a></li>
                <li><a href="Pagos/HUMP-0014.html">Aplicar pago</a></li>
                <li><a href="Pagos/HUMP-0015.html">Crear nota de crédito</a></li>
                <li><a href="Pagos/HUMP-0015.html">Crear nota de débito</a></li>
                <li><a href="Pagos/HUMP-0031.html">Balance inicial</a></li>
                <li><a href="Pagos/HUMP-0032.html">Arqueo de caja</a></li>
                <li><a href="Pagos/HUMP-0041.html">Establecer balance</a></li>
                <li><a href="Pagos/HUMP-0042.html">Modificar balance</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a>Empleado</a>
            <ul class="sub_menu">
                <li><a href="Empleado/HUEM-001.html">Modificar empleado</a></li>
                <li><a href="Empleado/HUEM-002.html">Crear dieta</a></li>
                <li><a href="Empleado/HUEM-002-01.html">Modificar dieta</a></li>
                <li><a href="Empleado/HUEM-003.html">Crear rutina</a></li>
                <li><a href="Empleado/HUEM-003-1.html">Modificar rutina</a></li>
                <li><a href="Empleado/HUEM-004.html">Ver calendario</a></li>
                <li><a href="Empleado/HUEM-005.html">Crear Métricas</a></li>
                <li><a href="Empleado/HUEM-005-1.html">Modificar Métricas</a></li>
                <li><a href="Empleado/HUEM-006.html">Historial cliente</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a>Reporte</a>
            <ul class="sub_menu">
                <li><a href="Reporte/HURM-001.html">Clientes activos</a></li>
                <li><a href="Reporte/HURM-002.html">Arqueo de caja</a></li>
                <li><a href="Reporte/HURM-003.html">Facturación</a></li>
                <li><a href="Reporte/HURM-004-1.html">Lista de eventos</a></li>
                <li><a href="Reporte/HURM-004-2.html">Reporte de reservas</a></li>
                <li><a href="Reporte/HURM-005-1.html">Reporte de retroalimentacion</a></li>
                <li><a href="Reporte/HURM-006-1.html">Planes de dietas</a></li>
                <li><a href="Reporte/HURM-006-2.html">Log de errores</a></li>
                <li><a href="Reporte/HURM-007.html">Ver historial</a></li>
            </ul>

        </li>

    </ul>
    `
    document.getElementById('navegacionMobile').innerHTML = htmlmenuMobile;
    });
