import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import alert from '@iconify/icons-eva/alert-triangle-outline';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'stocks',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'tutorial',
    path: '/dashboard/tutorial',
    icon: getIcon(alert)
  }
];

export default sidebarConfig;
