import { getAdmin } from '@/lib/adminAuth';
import LoginForm from './LoginForm';
import AdminApp from './AdminApp';

export default async function Admin() {
    return (await getAdmin()) ? <AdminApp /> : <LoginForm />;
}
