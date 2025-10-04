'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PropertyAddForm from '@/components/PropertyAddForm'
import Spinner from '@/components/Spinner'

const PropertyAddPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const adminEmails = ['mnjosiah@gmail.com', 'iammoraaruth@gmail.com']
  
  useEffect(() => {
    if (status === 'loading') return // Still loading
    
    if (!session || !adminEmails.includes(session.user.email)) {
      router.push('/')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <Spinner loading={true} />
  }

  if (!session || !adminEmails.includes(session.user.email)) {
    return null
  }

  return (
    <section style={{ backgroundColor: '#800080' }}>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyAddForm />
        </div>
      </div>
    </section>
  )
}
export default PropertyAddPage