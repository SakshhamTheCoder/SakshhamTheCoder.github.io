import { redirect } from 'next/navigation';
import { getResumeLink } from '@/lib/content';

// /resume always points at whatever link is set in admin (Profile > Resume link).
export async function GET() {
    redirect((await getResumeLink()) || '/');
}
