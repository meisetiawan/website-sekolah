'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client' // Import createClient dari client.ts
import { uploadImage } from '@/lib/supabase/upload' // Import createClient dari client.ts
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import * as Icons from 'lucide-react'

const supabase = createClient() // Memanggil createClient untuk mendapatkan Supabase instance

const tables = ['about', 'feature', 'history', 'trusted', 'comment', 'faq', 'info']

export default function AdminPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [selectedTable, setSelectedTable] = useState('about')
  const [data, setData] = useState<any[]>([])
  const [editId, setEditId] = useState<any>(null)
  const [form, setForm] = useState<any>({})

  // Cek session pengguna
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return router.push('/login')
        setSession(session)
      } catch (error) {
        console.error('Error fetching session:', error)
      }
    }
    checkAuth()
  }, [router])

  // Ambil data tabel
  useEffect(() => {
    if (session) fetchData()
  }, [selectedTable, session])

  const fetchData = async () => {
    const { data } = await supabase.from(selectedTable).select('*')
    setData(data || [])
    setEditId(null)
    setForm({})
  }

  const handleEdit = (row: any) => {
    setEditId(row.id)
    setForm(row)
  }

  const handleDelete = async (id: any) => {
    await supabase.from(selectedTable).delete().eq('id', id)
    fetchData()
  }

  const handleSave = async () => {
    if (!editId) return
    const updateData = { ...form }

    // Upload file jika ada
    if (form.file) {
      const url = await uploadImage(form.file, selectedTable) // Panggil uploadImage
      updateData.image = url
      delete updateData.file
    }

    await supabase.from(selectedTable).update(updateData).eq('id', editId)
    fetchData()
  }

  const handleInputChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value })
  }

  if (!session) return <div>Loading...</div>

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: 200, borderRight: '1px solid #ccc', padding: 16 }}>
        {tables.map(t => (
          <div
            key={t}
            style={{ marginBottom: 8, cursor: 'pointer', fontWeight: selectedTable === t ? 'bold' : 'normal' }}
            onClick={() => setSelectedTable(t)}
          >
            {t.toUpperCase()}
          </div>
        ))}
      </aside>

      {/* Main Panel */}
      <main style={{ flex: 1, padding: 16 }}>
        <h1>{selectedTable.toUpperCase()} ADMIN</h1>

        {/* Table Preview */}
        <div>
          {data.map(row => (
            <div
              key={row.id}
              style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}
            >
              {Object.entries(row).map(([k, v]) => {
                if (k === 'image' && typeof v === 'string' && v) {
                  return (
                    <img
                      key={k}
                      src={v}
                      alt={k}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  )
                }

                if (k === 'icon' && typeof v === 'string' && v) {
                  const Icon = (Icons as any)[v]
                  return Icon
                    ? <Icon key={k} size={24} />
                    : <span key={k}>{v}</span>
                }

                if (k !== 'id' && k !== 'created_at') {
                  return <span key={k}>{String(v)}</span>
                }

                return null
              })}

              <Button onClick={() => handleEdit(row)}>Edit</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(row.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>

        {/* Edit Form */}
        {editId && (
          <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 16 }}>
            {Object.entries(form).map(([key, value]) => {
              if (key === 'id' || key === 'created_at') return null
              if (key === 'image') return (
                <div key={key}>
                  <Input type="file" onChange={e => handleInputChange('file', e.target.files?.[0])} />
                  {value && <img src={value} alt="preview" style={{ width: 50, height: 50, objectFit: 'cover' }} />}
                </div>
              )
              if (key === 'icon') return (
                <Select value={value} onValueChange={v => handleInputChange('icon', v)}>
                  <SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(Icons).map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              )
              return <Input key={key} value={value} onChange={e => handleInputChange(key, e.target.value)} />
            })}
            <Button onClick={handleSave} style={{ marginTop: 8 }}>Save</Button>
          </div>
        )}

      </main>
    </div>
  )
}