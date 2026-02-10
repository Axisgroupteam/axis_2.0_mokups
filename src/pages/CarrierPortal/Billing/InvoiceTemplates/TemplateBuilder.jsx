import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeftIcon,
  SaveIcon,
  EyeIcon,
  XIcon,
  FileTextIcon,
  ReceiptIcon,
  Building2Icon,
  TruckIcon,
  DollarSignIcon,
  PencilIcon,
  BoldIcon,
  ItalicIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  Trash2Icon,
  GripVerticalIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  CheckIcon,
  LayoutTemplateIcon,
} from "lucide-react";
import TemplatePreview from "./TemplatePreview";

const STORAGE_KEY = "axis-invoice-templates";

const PAPER_SIZES = {
  A4: { portrait: { width: 595, height: 842 }, landscape: { width: 842, height: 595 } },
  Letter: { portrait: { width: 612, height: 792 }, landscape: { width: 792, height: 612 } },
};

const FIELD_CATEGORIES = [
  {
    name: "Header Info",
    icon: FileTextIcon,
    fields: [
      { key: "companyLogo", label: "Company Logo", type: "image", defaultSize: { w: 4, h: 2 } },
      { key: "companyName", label: "Company Name", type: "text", defaultSize: { w: 5, h: 1 } },
      { key: "companyAddress", label: "Company Address", type: "textarea", defaultSize: { w: 5, h: 2 } },
      { key: "companyPhone", label: "Company Phone", type: "text", defaultSize: { w: 3, h: 1 } },
      { key: "invoiceTitle", label: "Invoice Title", type: "text", defaultSize: { w: 4, h: 1 } },
    ],
  },
  {
    name: "Invoice Details",
    icon: ReceiptIcon,
    fields: [
      { key: "invoiceNo", label: "Invoice #", type: "text", defaultSize: { w: 4, h: 1 } },
      { key: "invoiceDate", label: "Invoice Date", type: "date", defaultSize: { w: 4, h: 1 } },
      { key: "dueDate", label: "Due Date", type: "date", defaultSize: { w: 4, h: 1 } },
      { key: "poNumber", label: "PO Number", type: "text", defaultSize: { w: 3, h: 1 } },
      { key: "terms", label: "Payment Terms", type: "text", defaultSize: { w: 3, h: 1 } },
    ],
  },
  {
    name: "Customer Info",
    icon: Building2Icon,
    fields: [
      { key: "customerName", label: "Customer / Bill To", type: "text", defaultSize: { w: 6, h: 1 } },
      { key: "customerAddress", label: "Customer Address", type: "textarea", defaultSize: { w: 6, h: 2 } },
      { key: "customerContact", label: "Contact Person", type: "text", defaultSize: { w: 4, h: 1 } },
      { key: "customerEmail", label: "Customer Email", type: "text", defaultSize: { w: 4, h: 1 } },
    ],
  },
  {
    name: "Load / Shipment",
    icon: TruckIcon,
    fields: [
      { key: "loadNumber", label: "Load #", type: "text", defaultSize: { w: 3, h: 1 } },
      { key: "origin", label: "Origin", type: "text", defaultSize: { w: 4, h: 1 } },
      { key: "destination", label: "Destination", type: "text", defaultSize: { w: 4, h: 1 } },
      { key: "deliveryDate", label: "Delivery Date", type: "date", defaultSize: { w: 3, h: 1 } },
      { key: "weight", label: "Weight", type: "text", defaultSize: { w: 2, h: 1 } },
    ],
  },
  {
    name: "Financial",
    icon: DollarSignIcon,
    fields: [
      { key: "lineItemsTable", label: "Line Items Table", type: "table", defaultSize: { w: 12, h: 5 } },
      { key: "subtotal", label: "Subtotal", type: "currency", defaultSize: { w: 4, h: 1 } },
      { key: "taxRate", label: "Tax Rate", type: "text", defaultSize: { w: 3, h: 1 } },
      { key: "taxAmount", label: "Tax Amount", type: "currency", defaultSize: { w: 4, h: 1 } },
      { key: "totalDue", label: "Total Due", type: "currency", defaultSize: { w: 4, h: 1 } },
      { key: "amountPaid", label: "Amount Paid", type: "currency", defaultSize: { w: 4, h: 1 } },
      { key: "balanceDue", label: "Balance Due", type: "currency", defaultSize: { w: 4, h: 1 } },
    ],
  },
  {
    name: "Custom Fields",
    icon: PencilIcon,
    fields: [
      { key: "notes", label: "Notes / Terms", type: "textarea", defaultSize: { w: 8, h: 2 } },
      { key: "bankDetails", label: "Bank / Payment Details", type: "textarea", defaultSize: { w: 5, h: 2 } },
      { key: "customText1", label: "Custom Text 1", type: "text", defaultSize: { w: 6, h: 1 } },
      { key: "customText2", label: "Custom Text 2", type: "text", defaultSize: { w: 6, h: 1 } },
      { key: "footer", label: "Footer Text", type: "text", defaultSize: { w: 12, h: 1 } },
    ],
  },
];

const ROW_HEIGHT = 28;

const TemplateBuilder = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [templateName, setTemplateName] = useState("Untitled Template");
  const [pageSize, setPageSize] = useState("A4");
  const [orientation, setOrientation] = useState("portrait");
  const [margins, setMargins] = useState({ top: 40, right: 40, bottom: 40, left: 40 });
  const [fields, setFields] = useState([]);
  const [selectedFieldKey, setSelectedFieldKey] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(
    FIELD_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {})
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (templateId) {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        const template = stored.find((t) => t.templateId === templateId);
        if (template) {
          setTemplateName(template.templateName);
          setPageSize(template.pageSize || "A4");
          setOrientation(template.orientation || "portrait");
          setMargins(template.margins || { top: 40, right: 40, bottom: 40, left: 40 });
          setFields(template.fields || []);
        }
      } catch {}
    }
  }, [templateId]);

  const paperDims = PAPER_SIZES[pageSize]?.[orientation] || PAPER_SIZES.A4.portrait;
  const canvasScale = 0.85;
  const canvasWidth = (paperDims.width - margins.left - margins.right) * canvasScale;

  const selectedField = fields.find((f) => f.key === selectedFieldKey);

  const getNextY = useCallback(() => {
    if (fields.length === 0) return 0;
    let maxBottom = 0;
    fields.forEach((f) => {
      const bottom = f.position.y + f.position.h;
      if (bottom > maxBottom) maxBottom = bottom;
    });
    return maxBottom + 1;
  }, [fields]);

  const addField = (paletteField, categoryName) => {
    if (fields.find((f) => f.key === paletteField.key)) return;
    const newField = {
      key: paletteField.key,
      label: paletteField.label,
      type: paletteField.type,
      category: categoryName,
      position: {
        x: 0,
        y: getNextY(),
        w: paletteField.defaultSize.w,
        h: paletteField.defaultSize.h,
      },
      style: {
        fontSize: paletteField.type === "table" ? 11 : 12,
        bold: false,
        italic: false,
        alignment: "left",
      },
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldKey(newField.key);
    setIsDirty(true);
  };

  const removeField = (key) => {
    setFields((prev) => prev.filter((f) => f.key !== key));
    if (selectedFieldKey === key) setSelectedFieldKey(null);
    setIsDirty(true);
  };

  const updateFieldStyle = (key, styleUpdate) => {
    setFields((prev) =>
      prev.map((f) =>
        f.key === key
          ? { ...f, style: { ...f.style, ...styleUpdate } }
          : f
      )
    );
    setIsDirty(true);
  };

  const updateFieldLabel = (key, label) => {
    setFields((prev) =>
      prev.map((f) => (f.key === key ? { ...f, label } : f))
    );
    setIsDirty(true);
  };

  const handleLayoutChange = (layout) => {
    setFields((prev) =>
      prev.map((field) => {
        const layoutItem = layout.find((l) => l.i === field.key);
        if (layoutItem) {
          return {
            ...field,
            position: {
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h,
            },
          };
        }
        return field;
      })
    );
  };

  const handleSave = () => {
    const template = {
      templateId: templateId || `TPL-${Date.now()}`,
      templateName,
      version: 1,
      createdAt: new Date().toISOString(),
      createdBy: "Admin",
      pageSize,
      orientation,
      margins,
      status: "Active",
      fields,
    };
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const idx = existing.findIndex((t) => t.templateId === template.templateId);
    if (idx >= 0) {
      template.version = (existing[idx].version || 1) + 1;
      template.createdAt = existing[idx].createdAt;
      existing[idx] = template;
    } else {
      existing.push(template);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    setIsDirty(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const toggleCategory = (name) => {
    setExpandedCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isFieldAdded = (key) => fields.some((f) => f.key === key);

  const gridLayout = fields.map((f) => ({
    i: f.key,
    x: f.position.x,
    y: f.position.y,
    w: f.position.w,
    h: f.position.h,
    minW: 1,
    minH: 1,
  }));

  const getFieldTypeLabel = (type) => {
    switch (type) {
      case "text": return "Text";
      case "date": return "Date";
      case "currency": return "Currency";
      case "textarea": return "Text Area";
      case "table": return "Table";
      case "image": return "Image";
      default: return type;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-background shrink-0">
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/app/carrier-portal/billing/invoice-templates")}
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back to Templates</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="h-6" />
          <LayoutTemplateIcon className="h-5 w-5 text-muted-foreground" />
          <Input
            value={templateName}
            onChange={(e) => { setTemplateName(e.target.value); setIsDirty(true); }}
            className="w-64 h-8 font-semibold border-transparent hover:border-input focus:border-input"
            placeholder="Template Name"
          />
          {isDirty ? (
            <Badge variant="outline" className="text-amber-600 border-amber-400">Unsaved</Badge>
          ) : saveSuccess ? (
            <Badge className="bg-green-500/10 text-green-700 border-green-500/50 hover:bg-green-500/10">
              <CheckIcon className="h-3 w-3 mr-1" /> Saved
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Select value={pageSize} onValueChange={(v) => { setPageSize(v); setIsDirty(true); }}>
            <SelectTrigger className="h-8 w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4</SelectItem>
              <SelectItem value="Letter">Letter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={orientation} onValueChange={(v) => { setOrientation(v); setIsDirty(true); }}>
            <SelectTrigger className="h-8 w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewOpen(true)}
            disabled={fields.length === 0}
          >
            <EyeIcon className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!templateName.trim() || fields.length === 0}
            className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <SaveIcon className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* 3-Panel Body */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r overflow-y-auto bg-muted/30 shrink-0">
          <div className="p-3 border-b">
            <h3 className="text-sm font-semibold text-foreground">Invoice Fields</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Click to add fields to canvas</p>
          </div>
          <div className="p-2">
            {FIELD_CATEGORIES.map((category) => {
              const CategoryIcon = category.icon;
              const isExpanded = expandedCategories[category.name];
              return (
                <div key={category.name} className="mb-1">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDownIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <CategoryIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{category.name}</span>
                  </button>
                  {isExpanded && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {category.fields.map((field) => {
                        const added = isFieldAdded(field.key);
                        return (
                          <button
                            key={field.key}
                            onClick={() => !added && addField(field, category.name)}
                            disabled={added}
                            className={cn(
                              "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors text-left",
                              added
                                ? "bg-green-500/10 text-green-700 dark:text-green-400 cursor-default"
                                : "hover:bg-accent text-foreground cursor-pointer"
                            )}
                          >
                            {added ? (
                              <CheckIcon className="h-3 w-3 shrink-0" />
                            ) : (
                              <PlusIcon className="h-3 w-3 shrink-0 text-muted-foreground" />
                            )}
                            <span className="truncate">{field.label}</span>
                            <Badge variant="outline" className="ml-auto text-[9px] px-1 py-0 h-4 shrink-0">
                              {getFieldTypeLabel(field.type)}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center — Canvas */}
        <div className="flex-1 overflow-auto bg-muted/50 flex justify-center p-6">
          <div
            className="bg-white shadow-lg border border-gray-200 relative shrink-0"
            style={{
              width: paperDims.width * canvasScale,
              minHeight: paperDims.height * canvasScale,
              padding: `${margins.top * canvasScale}px ${margins.right * canvasScale}px ${margins.bottom * canvasScale}px ${margins.left * canvasScale}px`,
            }}
          >
            {fields.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <LayoutTemplateIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-medium text-gray-400">Empty Canvas</p>
                  <p className="text-xs text-gray-400 mt-1">Click fields from the left panel to add them</p>
                </div>
              </div>
            ) : (
              <GridLayout
                className="layout"
                layout={gridLayout}
                cols={12}
                rowHeight={ROW_HEIGHT * canvasScale}
                width={canvasWidth}
                onLayoutChange={handleLayoutChange}
                draggableHandle=".drag-handle"
                compactType={null}
                preventCollision={false}
                isResizable={true}
                isDraggable={true}
                margin={[0, 0]}
                containerPadding={[0, 0]}
              >
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={cn(
                      "group border rounded-sm cursor-pointer transition-all relative",
                      selectedFieldKey === field.key
                        ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 z-10"
                        : "border-dashed border-gray-300 hover:border-gray-400"
                    )}
                    onClick={() => setSelectedFieldKey(field.key)}
                  >
                    {/* Drag Handle + Close */}
                    <div className="drag-handle absolute top-0 left-0 right-0 flex items-center justify-between px-1 py-0.5 bg-gray-50/80 border-b border-gray-200 cursor-move z-10"
                      style={{ height: 18 }}
                    >
                      <div className="flex items-center gap-0.5 overflow-hidden">
                        <GripVerticalIcon className="h-2.5 w-2.5 text-gray-400 shrink-0" />
                        <span className="text-[9px] text-gray-500 truncate font-medium">
                          {field.label}
                        </span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeField(field.key); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      >
                        <XIcon className="h-2.5 w-2.5 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    {/* Field Content Preview */}
                    <div
                      className="w-full h-full flex items-end px-1.5 pb-1 overflow-hidden text-gray-600"
                      style={{
                        paddingTop: 20,
                        fontSize: Math.max(8, (field.style?.fontSize || 12) * canvasScale * 0.75),
                        fontWeight: field.style?.bold ? "bold" : "normal",
                        fontStyle: field.style?.italic ? "italic" : "normal",
                        textAlign: field.style?.alignment || "left",
                      }}
                    >
                      {field.type === "table" ? (
                        <div className="w-full text-center text-[9px] text-gray-400 border border-dashed border-gray-300 rounded py-1">
                          [Line Items Table]
                        </div>
                      ) : field.type === "image" ? (
                        <div className="w-full text-center text-[9px] text-gray-400 bg-gray-50 rounded py-1">
                          [Logo]
                        </div>
                      ) : (
                        <span className="truncate w-full block">
                          {`{${field.key}}`}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </GridLayout>
            )}
          </div>
        </div>

        {/* Right Sidebar — Properties Panel */}
        <div className="w-72 border-l overflow-y-auto bg-background shrink-0">
          {selectedField ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Field Properties</h3>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {getFieldTypeLabel(selectedField.type)}
                </Badge>
              </div>
              <Separator className="mb-4" />

              <div className="space-y-4">
                {/* Label */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Display Label</Label>
                  <Input
                    value={selectedField.label}
                    onChange={(e) => updateFieldLabel(selectedField.key, e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                {/* Font Size */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Font Size (px)</Label>
                  <Input
                    type="number"
                    value={selectedField.style?.fontSize || 12}
                    onChange={(e) =>
                      updateFieldStyle(selectedField.key, {
                        fontSize: Math.max(6, Math.min(48, parseInt(e.target.value) || 12)),
                      })
                    }
                    className="h-8 text-sm"
                    min={6}
                    max={48}
                  />
                </div>

                {/* Bold / Italic */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Text Style</Label>
                  <div className="flex gap-1">
                    <Button
                      variant={selectedField.style?.bold ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        updateFieldStyle(selectedField.key, { bold: !selectedField.style?.bold })
                      }
                    >
                      <BoldIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={selectedField.style?.italic ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        updateFieldStyle(selectedField.key, { italic: !selectedField.style?.italic })
                      }
                    >
                      <ItalicIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Alignment */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Alignment</Label>
                  <div className="flex gap-1">
                    {[
                      { value: "left", icon: AlignLeftIcon },
                      { value: "center", icon: AlignCenterIcon },
                      { value: "right", icon: AlignRightIcon },
                    ].map(({ value, icon: Icon }) => (
                      <Button
                        key={value}
                        variant={selectedField.style?.alignment === value ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateFieldStyle(selectedField.key, { alignment: value })}
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Position (read-only) */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Position (auto)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-muted-foreground">X</span>
                      <Input value={selectedField.position.x} disabled className="h-7 text-xs mt-0.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">Y</span>
                      <Input value={selectedField.position.y} disabled className="h-7 text-xs mt-0.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">Width</span>
                      <Input value={selectedField.position.w} disabled className="h-7 text-xs mt-0.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">Height</span>
                      <Input value={selectedField.position.h} disabled className="h-7 text-xs mt-0.5" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Remove */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => removeField(selectedField.key)}
                >
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Remove Field
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <PencilIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">No Field Selected</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click on a field in the canvas to edit its properties
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <EyeIcon className="h-5 w-5" />
              Preview: {templateName}
            </DialogTitle>
          </DialogHeader>
          <TemplatePreview
            template={{
              templateId: templateId || "preview",
              templateName,
              pageSize,
              orientation,
              margins,
              fields,
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateBuilder;
