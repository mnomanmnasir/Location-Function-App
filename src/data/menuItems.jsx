import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Function', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Problem', icon: <BusinessIcon />, path: '/problem' },
  { text: 'Business', icon: <PeopleIcon />, path: '/business' },
  { text: 'Stats', icon: <SettingsIcon />, path: '/stats' },
];

export default menuItems;
