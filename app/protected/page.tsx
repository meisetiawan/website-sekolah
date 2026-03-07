'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { uploadImage } from '@/lib/supabase/upload';
import { AdminHeader } from '@/components/admin/admin-header';
import { DataTable } from '@/components/admin/data-table';
import { FormDialog } from '@/components/admin/form-dialog';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Card } from '@/components/ui/card';
import { ADMIN_TABLES, getTableFields, getTableLabel, TableName } from '@/lib/admin-config';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface RowData {
  id?: number | string;
  created_at?: string;
  image?: string;
  icon?: string;
  [key: string]: unknown;
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  const [session, setSession] = useState<Session | null>(null);
  const [selectedTable, setSelectedTable] = useState<TableName>('about');
  const [data, setData] = useState<RowData[]>([]);
  const [editId, setEditId] = useState<number | string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<RowData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) return router.push('/login');
      setSession(session);
    };
    checkAuth();
  }, [router, supabase]);

  // Fetch data when table changes
  useEffect(() => {
    if (session) fetchData();
  }, [selectedTable, session]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: fetchedData, error } = await supabase
        .from(selectedTable)
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setData((fetchedData as RowData[]) || []);
      setEditId(null);
      setIsCreating(false);
      setFormData({});
    } catch (error) {
      toast.error(
        `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedTable, supabase]);

  const handleEdit = (row: RowData) => {
    setEditId(row.id ?? null);
    setIsCreating(false);
    setFormData({ ...row });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setIsCreating(true);
    setEditId(null);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleFormChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        // Create new data
        const insertData: RowData = { ...formData };

        if ('file' in insertData && insertData.file instanceof File) {
          const url = await uploadImage(insertData.file, selectedTable);
          insertData.image = url;
          delete insertData.file;
        }

        delete insertData.id;
        delete insertData.created_at;

        const { error } = await supabase.from(selectedTable).insert([insertData]);
        if (error) throw error;

        toast.success('Record created successfully');
      } else if (editId) {
        // Update existing data
        const updateData: RowData = { ...formData };

        if ('file' in updateData && updateData.file instanceof File) {
          const url = await uploadImage(updateData.file, selectedTable);
          updateData.image = url;
          delete updateData.file;
        }

        delete updateData.id;
        delete updateData.created_at;

        const { error } = await supabase.from(selectedTable).update(updateData).eq('id', editId);
        if (error) throw error;

        toast.success('Record updated successfully');
      }

      await fetchData();
    } catch (error) {
      toast.error(`Error saving data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const fields = getTableFields(selectedTable);
  const tableLabel = getTableLabel(selectedTable);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 border-r border-gray-200 dark:border-gray-800 lg:block">
        <AdminSidebar selectedTable={selectedTable} onTableSelect={setSelectedTable} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          session={session}
          tableTitle={tableLabel}
          onAddNew={handleAddNew}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            {/* Stats/Info Card */}
            <Card className="border-none bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:from-gray-800 dark:to-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Records
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{data.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Table:{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tableLabel}
                    </span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Data Display */}
            {isLoading ? (
              <Card className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin" />
                  <p>Loading data...</p>
                </div>
              </Card>
            ) : (
              <DataTable
                tableName={selectedTable}
                data={data}
                fields={fields}
                onRefresh={fetchData}
                onEdit={handleEdit}
              />
            )}
          </div>
        </main>
      </div>

      {/* Form Dialog */}
      <FormDialog
        isOpen={isDialogOpen}
        isCreating={isCreating}
        tableName={selectedTable}
        fields={fields}
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSave}
        onClose={() => {
          setIsDialogOpen(false);
          setEditId(null);
          setIsCreating(false);
          setFormData({});
        }}
      />
    </div>
  );
}
