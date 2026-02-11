import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import SmartFilter from "@/components/SmartFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  CopyIcon,
  Trash2Icon,
  EyeIcon,
  LayoutTemplateIcon,
  FileTextIcon,
} from "lucide-react";
import TemplatePreview from "./TemplatePreview";

const STORAGE_KEY = "axis-invoice-templates";

const SEED_TEMPLATES = [
  {
    templateId: "TPL-001",
    templateName: "Standard Summary Invoice",
    version: 1,
    createdAt: "2025-01-15T10:30:00Z",
    createdBy: "Admin",
    pageSize: "A4",
    orientation: "portrait",
    margins: { top: 40, right: 40, bottom: 40, left: 40 },
    status: "Active",
    sectionOrder: ["reportHeader", "pageHeader", "loadDetails", "summary", "pageFooter"],
    fields: [
      // Report Header
      { key: "companyName", label: "Company Name", type: "text", category: "header", section: "reportHeader", position: { x: 0, y: 0, w: 6, h: 1 }, style: { fontSize: 20, bold: true, italic: false, alignment: "left" } },
      { key: "invoiceTitle", label: "INVOICE", type: "text", category: "header", section: "reportHeader", position: { x: 8, y: 0, w: 4, h: 1 }, style: { fontSize: 22, bold: true, italic: false, alignment: "right" } },
      { key: "companyAddress", label: "Company Address", type: "textarea", category: "header", section: "reportHeader", position: { x: 0, y: 1, w: 6, h: 2 }, style: { fontSize: 10, bold: false, italic: false, alignment: "left" } },
      // Page Header
      { key: "invoiceNo", label: "Invoice #", type: "text", category: "invoice", section: "pageHeader", position: { x: 8, y: 0, w: 4, h: 1 }, style: { fontSize: 12, bold: true, italic: false, alignment: "right" } },
      { key: "invoiceDate", label: "Invoice Date", type: "date", category: "invoice", section: "pageHeader", position: { x: 8, y: 1, w: 4, h: 1 }, style: { fontSize: 11, bold: false, italic: false, alignment: "right" } },
      { key: "customerName", label: "Bill To", type: "text", category: "customer", section: "pageHeader", position: { x: 0, y: 0, w: 6, h: 1 }, style: { fontSize: 13, bold: true, italic: false, alignment: "left" } },
      { key: "customerAddress", label: "Customer Address", type: "textarea", category: "customer", section: "pageHeader", position: { x: 0, y: 1, w: 6, h: 2 }, style: { fontSize: 11, bold: false, italic: false, alignment: "left" } },
      { key: "dueDate", label: "Due Date", type: "date", category: "invoice", section: "pageHeader", position: { x: 8, y: 2, w: 4, h: 1 }, style: { fontSize: 11, bold: false, italic: false, alignment: "right" } },
      { key: "terms", label: "Payment Terms", type: "text", category: "invoice", section: "pageHeader", position: { x: 8, y: 3, w: 4, h: 1 }, style: { fontSize: 11, bold: false, italic: false, alignment: "right" } },
      // Load Details
      { key: "lineItemsTable", label: "Line Items", type: "table", category: "financial", section: "loadDetails", position: { x: 0, y: 0, w: 12, h: 5 }, style: { fontSize: 11, bold: false, italic: false, alignment: "left" } },
      // Summary
      { key: "subtotal", label: "Subtotal", type: "currency", category: "financial", section: "summary", position: { x: 8, y: 0, w: 4, h: 1 }, style: { fontSize: 12, bold: false, italic: false, alignment: "right" } },
      { key: "totalDue", label: "Total Due", type: "currency", category: "financial", section: "summary", position: { x: 8, y: 1, w: 4, h: 1 }, style: { fontSize: 16, bold: true, italic: false, alignment: "right" } },
      // Page Footer
      { key: "notes", label: "Notes", type: "textarea", category: "custom", section: "pageFooter", position: { x: 0, y: 0, w: 8, h: 2 }, style: { fontSize: 9, bold: false, italic: true, alignment: "left" } },
    ],
  },
  {
    templateId: "TPL-002",
    templateName: "Detailed Per-Load Invoice",
    version: 1,
    createdAt: "2025-01-20T14:00:00Z",
    createdBy: "Admin",
    pageSize: "A4",
    orientation: "portrait",
    margins: { top: 40, right: 40, bottom: 40, left: 40 },
    status: "Active",
    sectionOrder: ["reportHeader", "pageHeader", "loadDetails", "summary", "pageFooter"],
    fields: [
      // Report Header
      { key: "companyName", label: "Company Name", type: "text", category: "header", section: "reportHeader", position: { x: 0, y: 0, w: 5, h: 1 }, style: { fontSize: 18, bold: true, italic: false, alignment: "left" } },
      { key: "companyAddress", label: "Company Address", type: "textarea", category: "header", section: "reportHeader", position: { x: 0, y: 1, w: 5, h: 2 }, style: { fontSize: 10, bold: false, italic: false, alignment: "left" } },
      { key: "companyPhone", label: "Company Phone", type: "text", category: "header", section: "reportHeader", position: { x: 0, y: 3, w: 5, h: 1 }, style: { fontSize: 10, bold: false, italic: false, alignment: "left" } },
      { key: "invoiceTitle", label: "INVOICE", type: "text", category: "header", section: "reportHeader", position: { x: 7, y: 0, w: 5, h: 1 }, style: { fontSize: 24, bold: true, italic: false, alignment: "right" } },
      // Page Header
      { key: "invoiceNo", label: "Invoice #", type: "text", category: "invoice", section: "pageHeader", position: { x: 7, y: 0, w: 5, h: 1 }, style: { fontSize: 12, bold: true, italic: false, alignment: "right" } },
      { key: "invoiceDate", label: "Invoice Date", type: "date", category: "invoice", section: "pageHeader", position: { x: 7, y: 1, w: 5, h: 1 }, style: { fontSize: 11, bold: false, italic: false, alignment: "right" } },
      { key: "dueDate", label: "Due Date", type: "date", category: "invoice", section: "pageHeader", position: { x: 7, y: 2, w: 5, h: 1 }, style: { fontSize: 11, bold: false, italic: false, alignment: "right" } },
      { key: "customerName", label: "Bill To", type: "text", category: "customer", section: "pageHeader", position: { x: 0, y: 0, w: 6, h: 1 }, style: { fontSize: 13, bold: true, italic: false, alignment: "left" } },
      { key: "customerAddress", label: "Customer Address", type: "textarea", category: "customer", section: "pageHeader", position: { x: 0, y: 1, w: 6, h: 2 }, style: { fontSize: 11, bold: false, italic: false, alignment: "left" } },
      { key: "customerEmail", label: "Customer Email", type: "text", category: "customer", section: "pageHeader", position: { x: 0, y: 3, w: 6, h: 1 }, style: { fontSize: 10, bold: false, italic: false, alignment: "left" } },
      { key: "poNumber", label: "PO Number", type: "text", category: "invoice", section: "pageHeader", position: { x: 7, y: 3, w: 5, h: 1 }, style: { fontSize: 11, bold: false, italic: false, alignment: "right" } },
      // Load Details
      { key: "lineItemsTable", label: "Line Items", type: "table", category: "financial", section: "loadDetails", position: { x: 0, y: 0, w: 12, h: 5 }, style: { fontSize: 10, bold: false, italic: false, alignment: "left" } },
      // Summary
      { key: "subtotal", label: "Subtotal", type: "currency", category: "financial", section: "summary", position: { x: 8, y: 0, w: 4, h: 1 }, style: { fontSize: 12, bold: false, italic: false, alignment: "right" } },
      { key: "totalDue", label: "Total Due", type: "currency", category: "financial", section: "summary", position: { x: 8, y: 1, w: 4, h: 1 }, style: { fontSize: 16, bold: true, italic: false, alignment: "right" } },
      { key: "balanceDue", label: "Balance Due", type: "currency", category: "financial", section: "summary", position: { x: 8, y: 2, w: 4, h: 1 }, style: { fontSize: 14, bold: true, italic: false, alignment: "right" } },
      // Page Footer
      { key: "notes", label: "Notes", type: "textarea", category: "custom", section: "pageFooter", position: { x: 0, y: 0, w: 7, h: 2 }, style: { fontSize: 9, bold: false, italic: true, alignment: "left" } },
      { key: "bankDetails", label: "Bank Details", type: "textarea", category: "custom", section: "pageFooter", position: { x: 8, y: 0, w: 4, h: 2 }, style: { fontSize: 9, bold: false, italic: false, alignment: "right" } },
    ],
  },
  {
    templateId: "TPL-003",
    templateName: "Minimal Clean Invoice",
    version: 1,
    createdAt: "2025-02-01T09:15:00Z",
    createdBy: "Admin",
    pageSize: "Letter",
    orientation: "portrait",
    margins: { top: 50, right: 50, bottom: 50, left: 50 },
    status: "Active",
    sectionOrder: ["reportHeader", "pageHeader", "loadDetails", "summary", "pageFooter"],
    fields: [
      // Report Header
      { key: "companyName", label: "Company Name", type: "text", category: "header", section: "reportHeader", position: { x: 0, y: 0, w: 12, h: 1 }, style: { fontSize: 22, bold: true, italic: false, alignment: "center" } },
      // Page Header
      { key: "invoiceNo", label: "Invoice #", type: "text", category: "invoice", section: "pageHeader", position: { x: 0, y: 0, w: 6, h: 1 }, style: { fontSize: 12, bold: true, italic: false, alignment: "left" } },
      { key: "invoiceDate", label: "Invoice Date", type: "date", category: "invoice", section: "pageHeader", position: { x: 6, y: 0, w: 6, h: 1 }, style: { fontSize: 12, bold: false, italic: false, alignment: "right" } },
      { key: "customerName", label: "Bill To", type: "text", category: "customer", section: "pageHeader", position: { x: 0, y: 1, w: 6, h: 1 }, style: { fontSize: 13, bold: true, italic: false, alignment: "left" } },
      // Load Details
      { key: "lineItemsTable", label: "Line Items", type: "table", category: "financial", section: "loadDetails", position: { x: 0, y: 0, w: 12, h: 5 }, style: { fontSize: 11, bold: false, italic: false, alignment: "left" } },
      // Summary
      { key: "totalDue", label: "Total Due", type: "currency", category: "financial", section: "summary", position: { x: 8, y: 0, w: 4, h: 1 }, style: { fontSize: 18, bold: true, italic: false, alignment: "right" } },
      // Page Footer
      { key: "footer", label: "Footer", type: "text", category: "custom", section: "pageFooter", position: { x: 0, y: 0, w: 12, h: 1 }, style: { fontSize: 10, bold: false, italic: true, alignment: "center" } },
    ],
  },
  {
    templateId: "TPL-004",
    templateName: "Landscape Wide Format",
    version: 1,
    createdAt: "2025-02-05T16:45:00Z",
    createdBy: "Admin",
    pageSize: "A4",
    orientation: "landscape",
    margins: { top: 30, right: 30, bottom: 30, left: 30 },
    status: "Draft",
    sectionOrder: ["reportHeader", "pageHeader", "loadDetails", "summary", "pageFooter"],
    fields: [
      // Report Header
      { key: "companyName", label: "Company Name", type: "text", category: "header", section: "reportHeader", position: { x: 0, y: 0, w: 4, h: 1 }, style: { fontSize: 18, bold: true, italic: false, alignment: "left" } },
      { key: "invoiceTitle", label: "INVOICE", type: "text", category: "header", section: "reportHeader", position: { x: 9, y: 0, w: 3, h: 1 }, style: { fontSize: 20, bold: true, italic: false, alignment: "right" } },
      // Page Header
      { key: "invoiceNo", label: "Invoice #", type: "text", category: "invoice", section: "pageHeader", position: { x: 9, y: 0, w: 3, h: 1 }, style: { fontSize: 12, bold: true, italic: false, alignment: "right" } },
      { key: "customerName", label: "Bill To", type: "text", category: "customer", section: "pageHeader", position: { x: 0, y: 0, w: 6, h: 1 }, style: { fontSize: 13, bold: true, italic: false, alignment: "left" } },
      // Load Details
      { key: "lineItemsTable", label: "Line Items", type: "table", category: "financial", section: "loadDetails", position: { x: 0, y: 0, w: 12, h: 5 }, style: { fontSize: 11, bold: false, italic: false, alignment: "left" } },
      // Summary
      { key: "totalDue", label: "Total Due", type: "currency", category: "financial", section: "summary", position: { x: 9, y: 0, w: 3, h: 1 }, style: { fontSize: 16, bold: true, italic: false, alignment: "right" } },
    ],
  },
];

const getTemplates = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TEMPLATES));
  return SEED_TEMPLATES;
};

const saveTemplates = (templates) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TemplateList = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(() => getTemplates());
  const [filters, setFilters] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleEdit = (template) => {
    navigate(`/app/carrier-portal/billing/invoice-templates/builder/${template.templateId}`);
  };

  const handleDuplicate = (template) => {
    const newTemplate = {
      ...JSON.parse(JSON.stringify(template)),
      templateId: `TPL-${Date.now()}`,
      templateName: `${template.templateName} (Copy)`,
      createdAt: new Date().toISOString(),
      version: 1,
    };
    const updated = [...templates, newTemplate];
    saveTemplates(updated);
    setTemplates(updated);
  };

  const handleDeleteConfirm = () => {
    if (!templateToDelete) return;
    const updated = templates.filter((t) => t.templateId !== templateToDelete.templateId);
    saveTemplates(updated);
    setTemplates(updated);
    setIsDeleteDialogOpen(false);
    setTemplateToDelete(null);
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-700 border-green-500/50 hover:bg-green-500/10">{status}</Badge>;
      case "Draft":
        return <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/50 hover:bg-amber-500/10">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filterGroups = [
    {
      name: "Basic",
      filters: [
        { key: "templateName", label: "Template Name", type: "input", group: "Basic", placeholder: "Search template name..." },
        {
          key: "status",
          label: "Status",
          type: "select",
          group: "Basic",
          options: [
            { label: "Active", value: "Active" },
            { label: "Draft", value: "Draft" },
          ],
        },
        {
          key: "pageSize",
          label: "Page Size",
          type: "select",
          group: "Basic",
          options: [
            { label: "A4", value: "A4" },
            { label: "Letter", value: "Letter" },
          ],
        },
      ],
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    return filters.every((filter) => {
      const value = template[filter.key];
      if (!value) return false;
      if (filter.type === "input") {
        return value.toLowerCase().includes(filter.value.toLowerCase());
      }
      return value === filter.value;
    });
  });

  const columns = [
    {
      id: "actions",
      header: "Actions",
      size: 60,
      cell: ({ row }) => {
        const template = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <div className="px-2 py-1.5 border-b mb-1">
                <div className="flex items-center gap-2">
                  <LayoutTemplateIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm truncate">{template.templateName}</span>
                </div>
              </div>
              <DropdownMenuItem onClick={() => handleEdit(template)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePreview(template)}>
                <EyeIcon className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                <CopyIcon className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => {
                  setTemplateToDelete(template);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2Icon className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "templateName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Template Name" />,
      cell: ({ row }) => {
        const template = row.original;
        return (
          <button
            onClick={() => handleEdit(template)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-left"
          >
            {template.templateName}
          </button>
        );
      },
      size: 250,
      enableSorting: true,
    },
    {
      accessorKey: "pageSize",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Page Size" />,
      cell: ({ row }) => <span>{row.getValue("pageSize")}</span>,
      size: 100,
      enableSorting: true,
    },
    {
      accessorKey: "orientation",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Orientation" />,
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue("orientation")}</span>
      ),
      size: 120,
      enableSorting: true,
    },
    {
      id: "fieldCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fields" />,
      accessorFn: (row) => row.fields?.length || 0,
      cell: ({ row }) => {
        const count = row.original.fields?.length || 0;
        return (
          <Badge variant="outline" className="font-mono">
            {count}
          </Badge>
        );
      },
      size: 80,
      enableSorting: true,
    },
    {
      accessorKey: "createdBy",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created By" />,
      cell: ({ row }) => <span>{row.getValue("createdBy")}</span>,
      size: 120,
      enableSorting: true,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: ({ row }) => <span>{formatDate(row.getValue("createdAt"))}</span>,
      size: 130,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
      size: 100,
      enableSorting: true,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-1">
          <SmartFilter
            filterGroups={filterGroups}
            onFiltersChange={handleFiltersChange}
          />
          <Button
            onClick={() => navigate("/app/carrier-portal/billing/invoice-templates/builder")}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-xs cursor-pointer"
          >
            <PlusIcon className="size-4 mr-2" />
            Create Template
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={filteredTemplates}
          showViewOptions={false}
        />
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{templateToDelete?.templateName}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5" />
              Preview: {previewTemplate?.templateName}
            </DialogTitle>
          </DialogHeader>
          <TemplatePreview template={previewTemplate} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateList;
