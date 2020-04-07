const Preview = () =>
  import(/* webpackChunkName:'preview' */'@/views/preview/Preview.vue')

const routes = [
  { path: '/preview', component: Preview }
]

export default routes
