import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarcaViewVue from '@/views/MarcaView.vue'
import CondutoresViewVue from '@/views/CondutoresView.vue'
import VeiculoViewVue from '@/views/VeiculoView.vue'
import ModeloViewVue from '@/views/ModeloView.vue'
import MovimentacaoViewVue from '@/views/MovimentacaoView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/marca',
    name: 'marca',
    component: MarcaViewVue
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
