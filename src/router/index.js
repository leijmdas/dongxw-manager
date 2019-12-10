import Vue from 'vue'
import Router from 'vue-router'
import {constantRouter} from './constRouter'
import crmRouter from './domain-crm'
import sysRouter from './domain-sys'
import parkingRouter from './domain-parking'
import maintenanceRouter from './domain-maintenance'
import reportRouter from './domain-report'
import dongxwRouter from './domain-dongxw'

Vue.use(Router)

export const routers = constantRouter.concat(crmRouter).concat(sysRouter).concat(parkingRouter).concat(maintenanceRouter).concat(reportRouter).concat(dongxwRouter);

let router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: routers
})

Vue.prototype.$flush = function (queryParams) {
  let route = this.$route
  let _query = {}
  Object.assign({}, route.query)
  Object.assign(_query, queryParams || {})
  _query._d = new Date().getTime()

  let newRoute = {
    name: route.name,
    path: route.path,
    query: _query,
    params: route.params
  }
  this.$router.replace(newRoute)
}

export default router
