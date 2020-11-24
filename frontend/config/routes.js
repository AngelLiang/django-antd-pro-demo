export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },

          {
            path: '/userProfile',
            name: 'userprofile',
            icon: 'user',
            component: './userprofile',
          },

          // {
          //   path: '/admin',
          //   name: 'admin',
          //   icon: 'crown',
          //   component: './Admin',
          //   authority: ['admin'],
          //   routes: [
          //     {
          //       path: '/admin/sub-page',
          //       name: 'sub-page',
          //       icon: 'smile',
          //       component: './Welcome',
          //       authority: ['admin'],
          //     },
          //   ],
          // },
          // {
          //   name: 'list.table-list',
          //   icon: 'table',
          //   path: '/list',
          //   component: './ListTableList',
          // },
  

          {
            path: '/table',
            name: 'user',
            icon: 'user',
            authority: ['admin'],
            routes: [
              {
                path: '/table/user',
                name: 'user',
                icon: 'user',
                component: './user/table',
                authority: ['admin'],
              },
              {
                path: '/table/permission',
                name: 'permission',
                icon: 'permission',
                component: './permission',
                authority: ['admin'],
              },
              {
                path: '/table/group',
                name: 'group',
                icon: 'group',
                component: './group',
                authority: ['admin'],
              },
            ],
          },

          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
