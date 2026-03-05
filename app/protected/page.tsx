'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { uploadImage } from '@/lib/supabase/upload'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import * as Icons from 'lucide-react'
import { Session } from '@supabase/supabase-js'

const supabase = createClient()

const tables = ['about', 'feature', 'history', 'trusted', 'comment', 'faq', 'info'] as const
type TableName = typeof tables[number]

interface RowData {
  id?: number | string
  created_at?: string
  image?: string
  icon?: string
  [key: string]: unknown
}

const getTableFields = (table: TableName): string[] => {
  const fields: Record<TableName, string[]> = {
    about: ['title', 'description'],
    feature: ['title', 'description', 'icon'],
    history: ['year', 'title', 'description', 'image'],
    trusted: ['name', 'image'],
    comment: ['title', 'description', 'image'],
    faq: ['question', 'answer'],
    info: ['title', 'description']
  }
  return fields[table] || []
}

export default function AdminPage() {
  const router = useRouter()

  const [session, setSession] = useState<Session | null>(null)
  const [selectedTable, setSelectedTable] = useState<TableName>('about')
  const [data, setData] = useState<RowData[]>([])
  const [editId, setEditId] = useState<number | string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState<RowData>({})

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      const session = data.session
      if (!session) return router.push('/login')
      setSession(session)
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    if (session) fetchData()
  }, [selectedTable, session])

  const fetchData = async () => {
    const { data } = await supabase.from(selectedTable).select('*')
    setData((data as RowData[]) || [])
    setEditId(null)
    setIsCreating(false)
    setForm({})
  }

  const handleEdit = (row: RowData) => {
    setEditId(row.id ?? null)
    setIsCreating(false)
    setForm(row)
  }

  const handleAddNew = () => {
    setIsCreating(true)
    setEditId(null)
    setForm({})
  }

  const handleDelete = async (id: number | string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      await supabase.from(selectedTable).delete().eq('id', id)
      fetchData()
    }
  }

  const handleSave = async () => {
    if (isCreating) {
      // Create new data
      const insertData: RowData = { ...form }
      
      if ('file' in form && form.file instanceof File) {
        const url = await uploadImage(form.file, selectedTable)
        insertData.image = url
        delete insertData.file
      }

      delete insertData.id
      delete insertData.created_at

      const { error } = await supabase.from(selectedTable).insert([insertData])
      if (error) {
        alert('Error: ' + error.message)
        return
      }
      fetchData()
    } else if (editId) {
      // Update existing data
      const updateData: RowData = { ...form }

      if ('file' in form && form.file instanceof File) {
        const url = await uploadImage(form.file, selectedTable)
        updateData.image = url
        delete updateData.file
      }

      delete updateData.id
      delete updateData.created_at

      const { error } = await supabase.from(selectedTable).update(updateData).eq('id', editId)
      if (error) {
        alert('Error: ' + error.message)
        return
      }
      fetchData()
    }
  }

  const handleInputChange = (key: string, value: unknown) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  if (!session) return <div>Loading...</div>

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 200, borderRight: '1px solid #ccc', padding: 16 }}>
        {tables.map(t => (
          <div
            key={t}
            style={{
              marginBottom: 8,
              cursor: 'pointer',
              fontWeight: selectedTable === t ? 'bold' : 'normal'
            }}
            onClick={() => setSelectedTable(t)}
          >
            {t.toUpperCase()}
          </div>
        ))}
      </aside>

      <main style={{ flex: 1, padding: 16 }}>
        <h1>{selectedTable.toUpperCase()} ADMIN</h1>

        <Button 
          onClick={handleAddNew}
          style={{ marginBottom: 16, backgroundColor: '#10b981', color: 'white' }}
        >
          + Tambah Data Baru
        </Button>

        <div>
          {data.map(row => (
            <div
              key={row.id}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                marginBottom: 4
              }}
            >
              {Object.entries(row).map(([k, v]) => {
                if (k === 'image' && typeof v === 'string')
                  return (
                    <img
                      key={k}
                      src={v}
                      alt={k}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  )

                if (k === 'icon' && typeof v === 'string') {
                  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[v]
                  return Icon ? <Icon key={k} size={24} /> : <span key={k}>{v}</span>
                }

                if (k !== 'id' && k !== 'created_at')
                  return <span key={k}>{String(v)}</span>

                return null
              })}

              <Button onClick={() => handleEdit(row)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(row.id as number | string)}>
                Delete
              </Button>
            </div>
          ))}
        </div>

        {(editId || isCreating) && (
          <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 16 }}>
            <h2 style={{ marginBottom: 16 }}>
              {isCreating ? 'Tambah Data Baru' : 'Edit Data'}
            </h2>

            {/* Field Selection untuk Create */}
            {isCreating && (
              <div style={{ marginBottom: 16, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 4 }}>
                <p style={{ marginBottom: 8, fontWeight: 'bold' }}>Pilih field yang ingin diisi:</p>
                {getTableFields(selectedTable).map(field => (
                  <label key={field} style={{ display: 'block', marginBottom: 6 }}>
                    <input
                      type="checkbox"
                      checked={field in form}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm(prev => ({ ...prev, [field]: '' }))
                        } else {
                          setForm(prev => {
                            const newForm = { ...prev }
                            delete newForm[field]
                            return newForm
                          })
                        }
                      }}
                      style={{ marginRight: 8 }}
                    />
                    {field}
                  </label>
                ))}
              </div>
            )}

            {Object.entries(form).map(([key, value]) => {
              if (key === 'id' || key === 'created_at') return null

              if (key === 'image')
                return (
                  <div key={key} style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                      {key}
                    </label>
                    <Input
                      type="file"
                      onChange={e =>
                        handleInputChange('file', e.target.files?.[0] ?? null)
                      }
                    />
                    {typeof value === 'string' && (
                      <img
                        src={value}
                        alt="preview"
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: 'cover',
                          marginTop: 8
                        }}
                      />
                    )}
                  </div>
                )

              if (key === 'icon')
                return (
                  <div key={key} style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                      {key}
                    </label>
                    <Select
                      value={String(value)}
                      onValueChange={v => handleInputChange('icon', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(Icons).map(i => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )

              return (
                <div key={key} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                    {key}
                  </label>
                  <Input
                    value={String(value ?? '')}
                    onChange={e => handleInputChange(key, e.target.value)}
                  />
                </div>
              )
            })}

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Button onClick={handleSave} style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                {isCreating ? 'Tambah' : 'Update'}
              </Button>
              <Button 
                onClick={() => {
                  setEditId(null)
                  setIsCreating(false)
                  setForm({})
                }}
                variant="outline"
              >
                Batal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}