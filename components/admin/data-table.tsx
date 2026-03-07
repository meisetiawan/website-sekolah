'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit3, ArrowUpRightFromCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface TableField {
  key: string;
  value: unknown;
}

interface DataTableProps {
  tableName: string;
  data: Array<{ id: string | number; [key: string]: unknown }>;
  fields: string[];
  onRefresh: () => void;
  onEdit: (row: unknown) => void;
}

export function DataTable({ tableName, data, fields, onRefresh, onEdit }: DataTableProps) {
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient();

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', deleteId);
      if (error) throw error;
      toast.success('Data deleted successfully');
      onRefresh();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Failed to delete'}`);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (data.length === 0) {
    return (
      <Card className="border-dashed">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <ArrowUpRightFromCircle className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">No data yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Create your first record to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {data.map((row) => (
          <Card
            key={row.id}
            className="border-gray-200 transition-all duration-200 hover:shadow-md dark:border-gray-800"
          >
            <div className="flex items-start justify-between gap-4 p-4">
              <div className="flex-1 space-y-2">
                {Object.entries(row)
                  .filter(([key]) => key !== 'id' && key !== 'created_at' && fields.includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-2">
                      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                        {key}
                      </span>
                      <div className="col-span-2 flex items-center gap-2">
                        {key === 'image' && typeof value === 'string' ? (
                          <img src={value} alt={key} className="h-8 w-8 rounded object-cover" />
                        ) : key === 'icon' && typeof value === 'string' ? (
                          <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                            {value}
                          </span>
                        ) : (
                          <span className="truncate text-sm text-gray-700 dark:text-gray-300">
                            {String(value)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(row)} className="gap-1">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteId(row.id)}
                  className="gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Record</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this record? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
