import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { scopesGuard } from './guards/scopes.guard'; // Certifique-se que está importando corretamente
import { authGuard } from './guards/auth.guard';
import { PacienteDashboardComponent } from './components/paciente-dashboard/paciente-dashboard.component';
import { MedicoDashboardComponent } from './components/medico-dashboard/medico-dashboard.component';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { NovaConsultaComponent } from './components/nova-consulta/nova-consulta.component';
import { SolicitacoesComponent } from './components/solicitacoes/solicitacoes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ManageSolicitacoesComponent } from './components/manage-solicitacoes/manage-solicitacoes.component';
import { ProntuarioComponent } from './components/prontuario/prontuario.component';
import { RegisterComponent } from './components/register/register.component';


  
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    
    // Rotas protegidas pelo AuthGuard e pelo scopesGuard
    { 
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard,scopesGuard('admin')]
    },
    { 
        path: 'medico-dashboard',
        component: MedicoDashboardComponent,
        canActivate: [authGuard,scopesGuard('medico')]
    },
    { 
        path: 'agendamento',
        component: AgendamentoComponent,
        canActivate: [authGuard,scopesGuard(['tecnico', 'admin'])],
    },
    { path: 'agendar_consulta', component: NovaConsultaComponent },
    { path: 'solicitacoes', component: SolicitacoesComponent }, // Página separada

    { 
        path: 'paciente-dashboard',
        component: PacienteDashboardComponent,
        canActivate: [authGuard,scopesGuard('paciente')]
    },
    {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [authGuard,scopesGuard(['paciente', 'tecnico', 'admin', 'medico' ])]
    },
    {
        path: 'manage-solicitacoes',
        component: ManageSolicitacoesComponent,
        canActivate:[authGuard,scopesGuard([ 'tecnico', 'admin', 'medico' ])]
    },
    {
        path: 'prontuario',
        component: ProntuarioComponent,
        canActivate:[authGuard,scopesGuard(['medico'])]

    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    { 
        path: '**',
        redirectTo: '/login'
    } // Rota para casos não mapeados
];