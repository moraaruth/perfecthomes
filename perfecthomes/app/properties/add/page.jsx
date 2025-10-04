import PropertyAddForm from '@/components/PropertyAddForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

const PropertyAddPage = async () => {
  const session = await getServerSession(authOptions);
  const adminEmails = ['mnjosiah@gmail.com', 'iammoraaruth@gmail.com']; 
  
  if (!session || !adminEmails.includes(session.user.email)) {
    redirect('/');
  }

  return (
    <section style={{ backgroundColor: '#800080' }}>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};
export default PropertyAddPage;