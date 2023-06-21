import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CondutoresViewVue from '@/views/CondutoresView.vue'
import VeiculoViewVue from '@/views/VeiculoView.vue'
import ModeloViewVue from '@/views/ModeloView.vue'
import MovimentacaoViewVue from '@/views/MovimentacaoView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import MarcaListaViewVue from '@/views/marca/MarcaListaView.vue'
import MarcaFormViewVue from '@/views/marca/MarcaFormView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/marca/lista',
    name: 'marca-lista-view',
    component:MarcaListaViewVue
  },
  {
    path: '/marca/formulario',
    name: 'marca-formulario-view',
    component: MarcaFormViewVue
    children: [
      {
        path: '/marca/formulario',
        name: 'marca-formulario-editar-view',
        component:MarcaFormViewVue
      },
      {
        path: '/marca/formulario',
        name: 'marca-formulario-excluir-view',
        component: MarcaFormViewVue
      },
    ]
  },
  {
    path: '/condutores',
    name: 'condutores',
    component: CondutoresViewVue
  },
  {
    path: '/veiculo',
    name: 'veiculo',
    component: VeiculoViewVue
  },
  {
    path: '/modelo',
    name: 'modelo',
    component: ModeloViewVue
  },
  {
    path: '/movimentacao',
    name: 'movimentacao',
    component: MovimentacaoViewVue
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterViewVue
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

