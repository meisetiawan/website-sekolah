'use client';

import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { uploadImage } from '@/lib/supabase/upload';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface FormDialogProps {
  isOpen: boolean;
  isCreating: boolean;
  tableName: string;
  fields: string[];
  formData: Record<string, unknown>;
  onFormChange: (key: string, value: unknown) => void;
  onSave: () => Promise<void>;
  onClose: () => void;
}

export function FormDialog({
  isOpen,
  isCreating,
  tableName,
  fields,
  formData,
  onFormChange,
  onSave,
  onClose,
}: FormDialogProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set());
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (isCreating) {
      setSelectedFields(new Set());
      setImagePreview(null);
    } else {
      const fieldsInForm = new Set(
        Object.keys(formData).filter((k) => k !== 'id' && k !== 'created_at')
      );
      setSelectedFields(fieldsInForm);
      const imageField = Object.entries(formData).find(
        ([key, value]) => key === 'image' && typeof value === 'string'
      );
      if (imageField) {
        setImagePreview(imageField[1] as string);
      }
    }
  }, [isOpen, isCreating, formData]);

  const toggleField = (field: string, checked: boolean) => {
    const newFields = new Set(selectedFields);
    if (checked) {
      newFields.add(field);
      onFormChange(field, '');
    } else {
      newFields.delete(field);
      const newForm = { ...formData };
      delete newForm[field];
      Object.keys(newForm).forEach((k) => {
        if (k !== 'id' && k !== 'created_at') {
          onFormChange(k, newForm[k]);
        }
      });
    }
    setSelectedFields(newFields);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFormChange('file', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isCreating ? 'Add New Record' : 'Edit Record'}</DialogTitle>
          <DialogDescription>
            {isCreating ? 'Select fields and fill in the data' : 'Update the record details'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Field Selection for Create */}
          {isCreating && (
            <Card className="border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
              <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Select fields to include:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {fields.map((field) => (
                  <label
                    key={field}
                    className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 hover:bg-blue-100 dark:hover:bg-blue-900"
                  >
                    <Checkbox
                      checked={selectedFields.has(field)}
                      onCheckedChange={(checked) => toggleField(field, checked as boolean)}
                    />
                    <span className="text-sm capitalize">{field}</span>
                  </label>
                ))}
              </div>
            </Card>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {Array.from(selectedFields)
              .concat(
                Object.keys(formData).filter(
                  (k) => k !== 'id' && k !== 'created_at' && !selectedFields.has(k)
                )
              )
              .map((field) => {
                const value = formData[field];

                if (field === 'file') return null;

                if (field === 'image') {
                  return (
                    <div key={field} className="space-y-2">
                      <Label htmlFor="image">Image</Label>
                      <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="h-32 w-32 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                        />
                      )}
                    </div>
                  );
                }

                if (field === 'icon') {
                  const iconNames = Object.keys(Icons).sort();
                  return (
                    <div key={field} className="space-y-2">
                      <Label htmlFor="icon">Icon</Label>
                      <Select
                        value={String(value || '')}
                        onValueChange={(v) => onFormChange(field, v)}
                      >
                        <SelectTrigger id="icon">
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {iconNames.map((icon) => (
                            <SelectItem key={icon} value={icon}>
                              {icon}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }

                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="capitalize">
                      {field}
                    </Label>
                    <Input
                      id={field}
                      value={String(value ?? '')}
                      onChange={(e) => onFormChange(field, e.target.value)}
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isCreating ? (
              'Add Record'
            ) : (
              'Update Record'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
