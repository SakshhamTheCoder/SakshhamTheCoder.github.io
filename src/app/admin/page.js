import { getAdmin } from '@/lib/adminAuth';
import LoginForm from './LoginForm';
import AdminApp from './AdminApp';

export default async function Admin() {
    const session = await getAdmin();
    return session ? <AdminApp email={session.email} /> : <LoginForm />;
}
