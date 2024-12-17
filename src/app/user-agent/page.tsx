import { headers } from 'next/headers';
import { UserAgent } from '@/views/userAgent';

export default function UserAgentPage() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') ?? '';
  
  return <UserAgent userAgent={userAgent} />;
}