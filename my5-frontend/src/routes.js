import { Cloud, Login, ChangePassword} from './components/Screens';
import FileUploader from './components/FileUploader/FileUploader';

export default [
  { path: '/', exact: true, component: Cloud },
  { path: '/login', component: Login },
  { path: '/upload', component: FileUploader },
  { path: '/changePassword', component: ChangePassword}
];
