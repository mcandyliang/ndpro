import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/device/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
    }]
  },

  {
    path: '/device',
    component: Layout,
    redirect: '/device/table',
    name: 'device',
    meta: { title: '设备管理', icon: 'el-icon-document-copy' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/device/table/index'),
        meta: { title: '杆塔倾斜设备管理'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/device/tree/index'),
        meta: { title: '综合在线监测设备管理'}
      },
      {
        path: 'visual',
        name: 'Visual',
        component: () => import('@/views/device/visual/index'),
        meta: { title: '全塔可视化巡检设备管理'}
      },
      
      {
        path: 'electronics',
        name: 'Electronics',
        component: () => import('@/views/device/electronics/index'),
        meta: { title: '信通电子'}
      },
      {
        path: 'location',
        name: 'Location',
        component: () => import('@/views/device/location/index'),
        meta: { title: '北斗定位'}
      },
      {
        path: 'sensor',
        name: 'Sensor',
        component: () => import('@/views/device/sensor/index'),
        meta: { title: '传感器'}
      },
      {
        path: 'isc',
        name: 'Isc',
        component: () => import('@/views/device/isc/index'),
        meta: { title: 'ISC平台设备'}
      }
    ]
  },

  {
    path: '/wechat',
    component: Layout,
    redirect: '/wechat/menu1',
    name: 'Wechat',
    meta: { title: '微信管理', icon: 'el-icon-chat-dot-round' },
    children: [
      
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/wechat/account/index'),
        meta: { title: '账户'}
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/wechat/user/index'),
        meta: { title: '用户管理'}
      },
      {
        path: 'sim',
        name: 'Sim',
        component: () => import('@/views/wechat/sim/index'),
        meta: { title: 'SIM卡管理'}
      },
    ]
  },

  {
    path: '/configure',
    component: Layout,
    redirect: '/configure/params',
    name: 'Configure',
    meta: {
      title: '全局配置',
      icon: 'el-icon-aim'
    },
    children: [
      {
        path: 'params',
        component: () => import('@/views/configure/params/index'), 
        name: 'Params',
        meta: { title: '全局参数' },
      },
      {
        path: 'upgrade',
        component: () => import('@/views/configure/upgrade/index'),
        name: 'Upgrade',
        meta: { title: '远程升级' }
      },
      {
        path: 'data',
        component: () => import('@/views/configure/data/index'),
        name: 'Data',
        meta: { title: '数据同步' }
      },{
        path: 'maintain',
        component: () => import('@/views/configure/maintain/index'),
        name: 'Maintain',
        meta: { title: '设备维护' }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/standing',
    name: 'Manages',
    meta: {
      title: '台账管理',
      icon: 'el-icon-film'
    },
    children: [
      {
        path: 'standing',
        component: () => import('@/views/manage/standing/index'), 
        name: 'Standing',
        meta: { title: '台账管理' },
      }
    ]
  },
  {
    path: '/journal',
    component: Layout,
    redirect: '/journal/manage',
    name: 'Journal',
    meta: {
      title: '日志查询',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: 'image',
        component: () => import('@/views/journal/image/index'), 
        name: 'Image',
        meta: { title: '图像监测设备日志' },
      },
      {
        path: 'video',
        component: () => import('@/views/journal/video/index'), 
        name: 'Video',
        meta: { title: '视频监测设备日志' },
      },
      {
        path: 'system',
        component: () => import('@/views/journal/system/index'), 
        name: 'Systems',
        meta: { title: '系统日志' },
      },
      {
        path: 'heartbeat',
        component: () => import('@/views/journal/heartbeat/index'), 
        name: 'Heartbeat',
        meta: { title: '心跳日志' },
      },
      {
        path: 'letter',
        component: () => import('@/views/journal/letter/index'), 
        name: 'Letter',
        meta: { title: '信通设备日志' },
      },
      {
        path: 'report',
        component: () => import('@/views/journal/report/index'), 
        name: 'Report',
        meta: { title: '报警统计' },
      },
      {
        path: 'month',
        component: () => import('@/views/journal/month/index'), 
        name: 'Month',
        meta: { title: '月报表' },
      },
      {
        path: 'alarm',
        component: () => import('@/views/journal/alarm/index'), 
        name: 'Alarm',
        meta: { title: '告警系统' },
      }
    ]
  },
  {
    path: '/geography',
    component: Layout,
    redirect: '/geography/line',
    name: 'Geography',
    meta: {
      title: '地理信息',
      icon: 'el-icon-map-location'
    },
    children: [
      {
        path: 'line',
        component: () => import('@/views/geography/line/index'), 
        name: 'Line',
        meta: { title: '地理信息' },
      }
    ]
  },
  {
    path: '/now',
    component: Layout,
    redirect: '/now/scene',
    name: 'Now',
    meta: {
      title: '实时现场',
      icon: 'el-icon-school'
    },
    children: [
      {
        path: 'scene',
        component: () => import('@/views/now/scene/index'), 
        name: 'Scene',
        meta: { title: '实时现场' },
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/statistics',
    name: 'Form',
    meta: {
      title: '报表',
      icon: 'el-icon-tickets'
    },
    children: [
      {
        path: 'statistics',
        component: () => import('@/views/form/statistics/index'), 
        name: 'Statistics',
        meta: { title: '统计报表' },
      },
      {
        path: 'details',
        component: () => import('@/views/form/details/index'), 
        name: 'Details',
        meta: { title: '详细列表' },
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/login',
    name: 'System',
    meta: {
      title: '系统登录',
      icon: 'el-icon-s-platform'
    },
    children: [
      {
        path: 'login',
        component: () => import('@/views/system/login/index'), 
        name: 'Login',
        meta: { title: '系统登录' },
      }
    ]
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/edition',
    name: 'APP',
    meta: {
      title: 'APP版本',
      icon: 'el-icon-mobile'
    },
    children: [
      {
        path: 'edition',
        component: () => import('@/views/app/edition/index'), 
        name: 'Edition',
        meta: { title: 'APP版本' },
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/question',
    name: 'Test',
    meta: {
      title: '考试系统',
      icon: 'el-icon-notebook-2'
    },
    children: [
      {
        path: 'question',
        component: () => import('@/views/test/question/index'), 
        name: 'Question',
        meta: { title: '题库管理' },
      },
      {
        path: 'achievement',
        component: () => import('@/views/test/achievement/index'), 
        name: 'Achievement',
        meta: { title: '成绩管理' },
      },
      {
        path: 'major',
        component: () => import('@/views/test/major/index'), 
        name: 'Qajor',
        meta: { title: '专业管理' },
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    redirect: '/task/plan',
    name: 'Task',
    meta: {
      title: '任务分配',
      icon: 'el-icon-document-add'
    },
    children: [
      {
        path: 'plan',
        component: () => import('@/views/task/plan/index'), 
        name: 'Plan',
        meta: { title: '计划工作管理' },
      },
      {
        path: 'danger',
        component: () => import('@/views/task/danger/index'), 
        name: 'Danger',
        meta: { title: '隐患作业管理' },
      },
      {
        path: 'destruction',
        component: () => import('@/views/task/destruction/index'), 
        name: 'Destruction',
        meta: { title: '防外力破坏管理' },
      },
      {
        path: 'repair',
        component: () => import('@/views/task/repair/index'), 
        name: 'Repair',
        meta: { title: '抢修工作管理' },
      }
    ]
  },
  {
    path: '/function',
    component: Layout,
    redirect: '/function/manage',
    name: 'Function',
    meta: {
      title: '功能管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'manage',
        component: () => import('@/views/function/manage/index'), 
        name: 'Manage',
        meta: { title: '功能管理' },
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
