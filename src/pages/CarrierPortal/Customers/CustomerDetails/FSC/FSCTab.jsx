import React, { useState } from 'react';
import { PlusIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SmartFilter from '@/components/SmartFilter';
import FSCListTable from './FSCListTable';
import FSCFileSheet from './FSCFileSheet';
import FSCSettingsSheet from './FSCSettingsSheet';

const FSCTab = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [fscSettings, setFscSettings] = useState({ fscApplies: "YES_ITEMIZED" });

  const mockFscFiles = [
    {
      id: "fsc-1",
      status: "Active",
      effectiveStart: "2026-03-01",
      effectiveEnd: null,
      fscApplies: "YES_ITEMIZED",
      method: "PERCENT_LINEHAUL",
      indexSource: "DOE_NATIONAL",
      basePrice: 2.00,
      incrementPrice: 0.10,
      incrementValue: 1.0,
      approvalStatus: "APPROVED",
    },
    {
      id: "fsc-2",
      status: "Expired",
      effectiveStart: "2025-01-01",
      effectiveEnd: "2026-02-28",
      fscApplies: "YES_ITEMIZED",
      method: "PERCENT_LINEHAUL",
      indexSource: "DOE_NATIONAL",
      basePrice: 1.50,
      incrementPrice: 0.05,
      incrementValue: 0.5,
      approvalStatus: "APPROVED",
    }
  ];

  const dummyFilterGroups = [
    {
      name: "Basic",
      filters: [
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Active", value: "Active" },
            { label: "Expired", value: "Expired" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2 py-2 bg-background rounded-t-lg">
        <SmartFilter filterGroups={dummyFilterGroups} onFiltersChange={() => {}} />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-black text-white hover:bg-black/90 flex items-center gap-1.5"
            onClick={() => {
              setEditingFile(null);
              setIsFormOpen(true);
            }}
          >
            <PlusIcon className="size-4" />
            Create New FSC File
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5"
          >
            <SettingsIcon className="size-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="px-2 pb-4">
        <FSCListTable
          data={mockFscFiles}
          onEdit={(file) => {
            setEditingFile(file);
            setIsFormOpen(true);
          }}
        />
      </div>

      <FSCFileSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={editingFile}
        settings={fscSettings}
      />

      <FSCSettingsSheet
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={fscSettings}
        onSave={setFscSettings}
      />
    </div>
  );
};

export default FSCTab;
