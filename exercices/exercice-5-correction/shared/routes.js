import App from './App';
import HallOfFame from './components/HallOfFame';
import Root from './components/Root';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: App
      },
      {
        path: '/hall-of-fame',
        component: HallOfFame
      }
    ]
  }
];

export default routes;