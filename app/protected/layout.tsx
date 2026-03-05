'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from "@/lib/supabase/client"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
    }
    checkAuth()
  }, [router, supabase])

  return (
    <div style={{ display: 'flex' }}>
      <nav> {/* sidebar */}Admin Menu</nav>
      <main>{children}</main>
    </div>
  )
}