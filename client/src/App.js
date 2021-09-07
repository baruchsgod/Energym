import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import UserProvider from "./contexts/UserProvider";
import history from "./history";
import ProtectedRoute from "./ProtectedRoute";
// eslint-disable-next-line
import ProfileRoute from "./ProfileRoute";
import EmpProfileRoute from "./EmpProfileRoute";
import TextEditor from "./views/TextEditor";
import Home from "./views/Home";
//Not Authorize
import Authorize from "./components/NotAuthorize";
//---Admin
import InicioAdmin from "./views/Admin/InicioAdmin";
import AdminMenuUsuarios from "./views/Admin/AdminMenuUsuarios";
import AdminMenuGeneral from "./views/Admin/AdminMenuGeneral";
import AdminMenuReporte from "./views/Admin/AdminMenuReporte";
import AdminMenuPagos from "./views/Admin/AdminMenuPagos";
import CrearCuenta from "./views/Admin/CrearCuenta";
import AdministrarCuentas from "./views/Admin/AdministrarCuentas";
import EditarCuenta from "./views/Admin/EditarCuenta";
import ListUserFeedbackAdmin from "./views/Admin/UserFeedbackListAdmin";
import Errores from "./views/Admin/Errores";
//---Cliente
import UserMenu from "./views/Cliente/UserMenu";
import UserMenuCuenta from "./views/Cliente/UserMenuCuenta";
import UserSettings from "./views/Cliente/UserSettings";
import ReserveEvent from "./views/Cliente/ReserveEvent";
import ListEvents from "./views/Cliente/ListEvents";
import ListUserEvents from "./views/Cliente/UserEvents";
import UserDietDetail from "./views/Cliente/UserDietDetail";
import ListUserDiets from "./views/Cliente/UserDiets";
import ListUserDocuments from "./views/Cliente/UserDocuments";
import ListUserRoutines from "./views/Cliente/UserRoutines";
import ListUserFeedback from "./views/Cliente/UserFeedback";
import ListUserMetrics from "./views/Cliente/UserMetrics";
import CrearRetroalimentacion from "./views/Cliente/CrearRetroalimentacion";
import Desactivar from "./views/Cliente/DesactivarCuentaCliente";
import Activar from "./views/Cliente/ActivarCuentaCliente";
import Mail from "./views/Cliente/SubscribeMail";
//---Cuenta
import Login from "./views/Cuenta/Login";
import Register from "./views/Cuenta/Register";
//---empleado
import InicioEmpleado from "./views/Empleado/InicioEmpleado";
import EmpleadoMenuEntrenador from "./views/Empleado/EmpleadoMenuEntrenador";
import EmpleadoMenuRecepcionista from "./views/Empleado/EmpleadoMenuRecepcionista";
import EmpleadoMenuGeneral from "./views/Empleado/EmpleadoMenuGeneral";
import EmpleadoMenuRutinas from "./views/Empleado/EmpleadoMenuRutinas";
import EmpleadoMenuPagos from "./views/Empleado/EmpleadoMenuPagos";
import EmpleadoMenuMetricas from "./views/Empleado/EmpleadoMenuMetricas";
import EmpleadoMenuCreditoDebito from "./views/Empleado/EmpleadoMenuCreditoDebito";
import EmpleadoMenuCaja from "./views/Empleado/EmpleadoMenuCaja";
import Routine from "./views/Empleado/Routine";
import ViewRoutine from "./views/Empleado/FindRoutine";
import CreateEvents from "./views/Empleado/CreateEvents";
import EditEvents from "./views/Empleado/EditEvents";
import RoutineDetails from "./views/Empleado/RoutineDetails";
import FindCustomer from "./views/Empleado/FindCustomer";
import ListEventsAdmin from "./views/Empleado/ListEventsEmpleado";
import ClientesEvento from "./views/Empleado/ClientesEvento";
import findDiet from "./views/Empleado/FindDiet";
import FindMetrics from "./views/Empleado/FindMetrics";
import createDiet from "./views/Empleado/CreateDiet";
import CrearMetricas from "./views/Empleado/CrearMetricas";
import EditarMetricas from "./views/Empleado/EditarMetricas";
import ListUserMetricsEmpleado from "./views/Empleado/UserMetricsEmpleado";
import AdministrarCuentasClientes from "./views/Empleado/AdministrarCuentasClientes";
import PaymentCreate from "./views/Empleado/PaymentCreate";
//---Pagos
import PaymentFind from "./views/Pagos/Payment";
import UserMembership from "./views/Pagos/UserMembership";
import CreditNote from "./views/Pagos/Creditnote";
import DebitNote from "./views/Pagos/Debitnote";
import CreditNoteCreate from "./views/Pagos/CreditnoteCreate";
import DocumentFind from "./views/Pagos/DocumentFind";
import DocumentView from "./views/Pagos/DocumentView";
import InitialBalance from "./views/Pagos/InitialBalance";
import OpenCashier from "./views/Pagos/OpenCashier";
import CloseCashier from "./views/Pagos/CloseCashier";
import PaymentApp from "./views/Pagos/PaymentApp";
import UnapplyPayment from "./views/Pagos/Unapply";
import JobAutomatic from "./views/Pagos/JobFacturacion";
//---Reportes
import BillingReport from "./views/Reporte/BillingReport"
import BillingDetails from "./views/Reporte/BillingDetails";
import BillingClose from "./views/Reporte/BillingClose";
import BillingCloseDetails from "./views/Reporte/BillingCloseDetails";
import GetOverDue from "./views/Reporte/Overdue";
import OverDueQuater from "./views/Reporte/OverdueQuarter";
import OverDueSemester from "./views/Reporte/OverdueSemester";
import OverDueAnnual from "./views/Reporte/OverdueAnual";
import MenuOverDue from "./views/Reporte/MenuOverDue"
//Google
import GoogleLogin from "./components/GoogleLogin";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <UserProvider>
            <ProtectedRoute path="/" exact component={Home} />
            {/*Cuenta*/}
            <Route path="/Login"><Login /> </Route>
            <Route path="/Register"><Register /> </Route>
            <Route path="/GoogleLogin" exact component={GoogleLogin} />
            <Route path="/NotAuthorize" exact component={Authorize} />
            {/*Cliente*/}
            <ProtectedRoute path="/UserMenu" component={UserMenu} />{/*Cliente*/}
            <ProtectedRoute path="/UserMenuCuenta" component={UserMenuCuenta} />{/*Cliente*/}
            <ProtectedRoute path="/UserSettings" component={UserSettings} />{/*Cliente, Empleado, Administrador*/}{/*Pienso hacer uno para cada uno separado*/}
            <ProtectedRoute path="/CrearRetroalimentacion" component={CrearRetroalimentacion} />{/*Cliente*/}
            <ProtectedRoute path="/ListEvents" component={ListEvents} />{/*Cliente*/}
            <ProtectedRoute path="/ListUserEvents" component={ListUserEvents} />{/*Cliente*/}
            <ProtectedRoute path="/ListUserDiets" component={ListUserDiets} />{/*Cliente*/}
            <ProtectedRoute path="/ListUserDocuments" component={ListUserDocuments} />{/*Cliente*/}
            <ProtectedRoute path="/UserDietDetail" component={UserDietDetail} />{/*Cliente*/}
            <ProtectedRoute path="/ListUserRoutines" component={ListUserRoutines} />{/*Cliente*/}
            <ProtectedRoute path="/ListUserFeedback" component={ListUserFeedback} />{/*Cliente*/}
            <ProtectedRoute path="/ListUserMetrics" component={ListUserMetrics} />{/*Cliente*/}
            <ProtectedRoute path="/ReserveEvent" component={ReserveEvent} />{/*Cliente*/}
            <ProtectedRoute path="/DesactivarCuentaCliete" component={Desactivar} />{/*Cliente*/}
            <Route path="/ActivarCuenta" component={Activar} />{/*Activar cuenta se supone que se hace solo en login, no sé que hizo Edisson*/}
            <ProtectedRoute path="/mailMarketing" component={Mail} />{/*Cliente*/}
            {/*Admin*/}
            <ProfileRoute path="/InicioAdmin" component={InicioAdmin} />{/*Administrador*/}
            <ProfileRoute path="/AdminMenuUsuarios" component={AdminMenuUsuarios} />{/*Administrador*/}
            <ProfileRoute path="/AdminMenuGeneral" component={AdminMenuGeneral} />{/*Administrador*/}
            <ProfileRoute path="/AdminMenuReporte" component={AdminMenuReporte} />{/*Administrador*/}
            <ProfileRoute path="/AdminMenuPagos" component={AdminMenuPagos} />{/*Administrador*/}
            <ProfileRoute path="/AdministrarCuentas" component={AdministrarCuentas} />{/*Administrador*/}
            <ProfileRoute path="/CrearCuenta" component={CrearCuenta} />{/*Administrador*/}
            <ProfileRoute path="/Editar" component={EditarCuenta} />{/*Administrador*/}
            <ProfileRoute path="/editarCuenta" component={EditarCuenta} />{/*repetida con la anterior, no sé por qué*/}

            {/*Empleado*/}
            <EmpProfileRoute path="/InicioEmpleado" component={InicioEmpleado} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuEntrenador" component={EmpleadoMenuEntrenador} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuRecepcionista" component={EmpleadoMenuRecepcionista} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuGeneral" component={EmpleadoMenuGeneral} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuRutinas" component={EmpleadoMenuRutinas} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuPagos" component={EmpleadoMenuPagos} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuMetricas" component={EmpleadoMenuMetricas} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuCreditoDebito" component={EmpleadoMenuCreditoDebito} />{/*Empleado*/}
            <EmpProfileRoute path="/EmpleadoMenuCaja" component={EmpleadoMenuCaja} />{/*Empleado*/}
            <EmpProfileRoute path="/CreateEvents" component={CreateEvents} />{/*Empleado*/}
            <EmpProfileRoute path="/EditEvents" component={EditEvents} />{/*Empleado*/}
            <EmpProfileRoute path="/ListEventsAdmin" component={ListEventsAdmin} />{/*Empleado*/}
            <ProfileRoute path="/ListUserFeedbackAdmin" component={ListUserFeedbackAdmin} />{/*Administrador*/}
            <EmpProfileRoute path="/ClientesEvento" component={ClientesEvento} />{/*Empleado*/}
            <EmpProfileRoute path="/Routine" exact component={Routine} />{/*Empleado*/}
            <EmpProfileRoute path="/Routine/Edit" component={TextEditor} />{/*Empleado*/}
            <EmpProfileRoute path="/findroutine" exact component={ViewRoutine} />{/*Empleado*/}
            <ProtectedRoute path="/Routine/Details" exact component={RoutineDetails} />{/*Empleado, Cliente*/}
            <EmpProfileRoute path="/findDiet" component={findDiet} />{/*Empleado*/}
            <EmpProfileRoute path="/FindMetrics" component={FindMetrics} />{/*Empleado*/}
            <EmpProfileRoute path="/Diet/Edit" component={createDiet} />{/*Empleado*/}
            <EmpProfileRoute path="/CrearMetricas" component={CrearMetricas} />{/*Empleado*/}
            <EmpProfileRoute path="/EditarMetricas" component={EditarMetricas} />{/*Empleado*/}
            <EmpProfileRoute path="/ListUserMetricsEmpleado" component={ListUserMetricsEmpleado} />{/*Empleado*/}
            <EmpProfileRoute path="/findcustomer" component={FindCustomer} />{/*Empleado*/}
            <EmpProfileRoute path="/cuentasClientes" component={AdministrarCuentasClientes} />{/*Empleado*/}
            {/* Pagos */}
            <EmpProfileRoute path="/Payment" exact component={PaymentFind} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Membership" component={UserMembership} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Create/Payment" exact component={PaymentCreate} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/CreditNote" component={CreditNote} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/DebitNote" component={DebitNote} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Create/Document" component={CreditNoteCreate} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Payment/Find" exact component={DocumentFind} />{/*Empleado, Admistrador*/}
            <ProtectedRoute path="/Document/Find/Print" exact component={DocumentView} />{/*Empleado, Administrador*/}
            <ProfileRoute path="/Cashier/InitialBalance" component={InitialBalance} />{/*Administrador*/}
            <EmpProfileRoute path="/Payment/Open" exact component={OpenCashier} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Payment/Close" exact component={CloseCashier} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Payment/Application" exact component={PaymentApp} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Payment/Unapplication" exact component={UnapplyPayment} />{/*Empleado, Administrador*/}
            <EmpProfileRoute path="/Payment/JobInvoice" exact component={JobAutomatic} />{/*Empleado, Administrador*/}
            {/* Reportes */}
            <ProfileRoute path="/Report/Billing" exact component={BillingReport} />{/*Administrador*/}
            <ProfileRoute path="/Report/Billing/Details" component={BillingDetails} />{/*Administrador*/}
            <ProfileRoute path="/Report/Close" exact component={BillingClose} />{/*Administrador*/}
            <ProfileRoute path="/Report/Close/Details" component={BillingCloseDetails} />{/*Administrador*/}
            <ProfileRoute path="/Report/Menu" exact component={MenuOverDue} />
            <ProfileRoute path="/Report/Overdue" component={GetOverDue} />{/*Administrador*/}
            <ProfileRoute path="/Report/OverdueQuarter" component={OverDueQuater} />{/*Administrador*/}
            <ProfileRoute path="/Report/OverdueSemester" component={OverDueSemester} />{/*Administrador*/}
            <ProfileRoute path="/Report/OverdueAnnual" component={OverDueAnnual} />{/*Administrador*/}
            <ProfileRoute path="/errores" component={Errores} />
          </UserProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

