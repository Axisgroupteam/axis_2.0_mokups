import { useState, useEffect, useCallback, useMemo } from "react";
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

const SECTIONS = [
  { id: "reportHeader", label: "Report Header", description: "First page only", behavior: "first-page", borderColor: "border-l-blue-500", bgColor: "bg-blue-50/30", badgeColor: "bg-blue-100 text-blue-700", icon: FileTextIcon, defaultMinRows: 3 },
  { id: "pageHeader", label: "Page Header", description: "Repeats every page", behavior: "every-page", borderColor: "border-l-purple-500", bgColor: "bg-purple-50/30", badgeColor: "bg-purple-100 text-purple-700", icon: ReceiptIcon, defaultMinRows: 2 },
  { id: "loadDetails", label: "Load Details", description: "Repeats per load", behavior: "per-load", borderColor: "border-l-amber-500", bgColor: "bg-amber-50/30", badgeColor: "bg-amber-100 text-amber-700", icon: TruckIcon, defaultMinRows: 4 },
  { id: "summary", label: "Summary", description: "Once at end", behavior: "once-end", borderColor: "border-l-green-500", bgColor: "bg-green-50/30", badgeColor: "bg-green-100 text-green-700", icon: DollarSignIcon, defaultMinRows: 3 },
  { id: "pageFooter", label: "Page Footer", description: "Repeats every page", behavior: "every-page", borderColor: "border-l-gray-500", bgColor: "bg-gray-50/30", badgeColor: "bg-gray-100 text-gray-700", icon: PencilIcon, defaultMinRows: 2 },
];

const FIELD_CATEGORIES = [
  {
    name: "Header Info",
    icon: FileTextIcon,
    fields: [
      { key: "companyLogo", label: "Company Logo", type: "image", defaultSize: { w: 4, h: 2 }, suggestedSection: "reportHeader" },
      { key: "companyName", label: "Company Name", type: "text", defaultSize: { w: 5, h: 1 }, suggestedSection: "reportHeader" },
      { key: "companyAddress", label: "Company Address", type: "textarea", defaultSize: { w: 5, h: 2 }, suggestedSection: "reportHeader" },
      { key: "companyPhone", label: "Company Phone", type: "text", defaultSize: { w: 3, h: 1 }, suggestedSection: "reportHeader" },
      { key: "invoiceTitle", label: "Invoice Title", type: "text", defaultSize: { w: 4, h: 1 }, suggestedSection: "reportHeader" },
    ],
  },
  {
    name: "Invoice Details",
    icon: ReceiptIcon,
    fields: [
      { key: "invoiceNo", label: "Invoice #", type: "text", defaultSize: { w: 4, h: 1 }, suggestedSection: "pageHeader" },
      { key: "invoiceDate", label: "Invoice Date", type: "date", defaultSize: { w: 4, h: 1 }, suggestedSection: "pageHeader" },
      { key: "dueDate", label: "Due Date", type: "date", defaultSize: { w: 4, h: 1 }, suggestedSection: "pageHeader" },
      { key: "poNumber", label: "PO Number", type: "text", defaultSize: { w: 3, h: 1 }, suggestedSection: "pageHeader" },
      { key: "terms", label: "Payment Terms", type: "text", defaultSize: { w: 3, h: 1 }, suggestedSection: "pageHeader" },
    ],
  },
  {
    name: "Customer Info",
    icon: Building2Icon,
    fields: [
      { key: "customerName", label: "Customer / Bill To", type: "text", defaultSize: { w: 6, h: 1 }, suggestedSection: "pageHeader" },
      { key: "customerAddress", label: "Customer Address", type: "textarea", defaultSize: { w: 6, h: 2 }, suggestedSection: "pageHeader" },
      { key: "customerContact", label: "Contact Person", type: "text", defaultSize: { w: 4, h: 1 }, suggestedSection: "pageHeader" },
      { key: "customerEmail", label: "Customer Email", type: "text", defaultSize: { w: 4, h: 1 }, suggestedSection: "pageHeader" },
    ],
  },
  {
    name: "Load / Shipment",
    icon: TruckIcon,
    fields: [
      { key: "loadNumber", label: "Load #", type: "text", defaultSize: { w: 3, h: 1 }, suggestedSection: "loadDetails" },
      { key: "origin", label: "Origin", type: "text", defaultSize: { w: 4, h: 1 }, suggestedSection: "loadDetails" },
      { key: "destination", label: "Destination", type: "text", defaultSize: { w: 4, h: 1 }, suggestedSection: "loadDetails" },
      { key: "deliveryDate", label: "Delivery Date", type: "date", defaultSize: { w: 3, h: 1 }, suggestedSection: "loadDetails" },
      { key: "weight", label: "Weight", type: "text", defaultSize: { w: 2, h: 1 }, suggestedSection: "loadDetails" },
    ],
  },
  {
    name: "Financial",
    icon: DollarSignIcon,
    fields: [
      { key: "lineItemsTable", label: "Line Items Table", type: "table", defaultSize: { w: 12, h: 5 }, suggestedSection: "loadDetails" },
      { key: "subtotal", label: "Subtotal", type: "currency", defaultSize: { w: 4, h: 1 }, suggestedSection: "summary" },
      { key: "taxRate", label: "Tax Rate", type: "text", defaultSize: { w: 3, h: 1 }, suggestedSection: "summary" },
      { key: "taxAmount", label: "Tax Amount", type: "currency", defaultSize: { w: 4, h: 1 }, suggestedSection: "summary" },
      { key: "totalDue", label: "Total Due", type: "currency", defaultSize: { w: 4, h: 1 }, suggestedSection: "summary" },
      { key: "amountPaid", label: "Amount Paid", type: "currency", defaultSize: { w: 4, h: 1 }, suggestedSection: "summary" },
      { key: "balanceDue", label: "Balance Due", type: "currency", defaultSize: { w: 4, h: 1 }, suggestedSection: "summary" },
    ],
  },
  {
    name: "Custom Fields",
    icon: PencilIcon,
    fields: [
      { key: "notes", label: "Notes / Terms", type: "textarea", defaultSize: { w: 8, h: 2 }, suggestedSection: "pageFooter" },
      { key: "bankDetails", label: "Bank / Payment Details", type: "textarea", defaultSize: { w: 5, h: 2 }, suggestedSection: "pageFooter" },
      { key: "customText1", label: "Custom Text 1", type: "text", defaultSize: { w: 6, h: 1 }, suggestedSection: "pageFooter" },
      { key: "customText2", label: "Custom Text 2", type: "text", defaultSize: { w: 6, h: 1 }, suggestedSection: "pageFooter" },
      { key: "footer", label: "Footer Text", type: "text", defaultSize: { w: 12, h: 1 }, suggestedSection: "pageFooter" },
    ],
  },
];

const ROW_HEIGHT = 20;
const SECTION_BORDER_WIDTH = 3; // border-l-[3px]

const migrateFieldSection = (field) => {
  if (field.section) return field;
  let section = "reportHeader";
  if (["companyLogo", "companyName", "companyAddress", "companyPhone", "invoiceTitle"].includes(field.key)) {
    section = "reportHeader";
  } else if (["invoiceNo", "invoiceDate", "dueDate", "poNumber", "terms", "customerName", "customerAddress", "customerContact", "customerEmail"].includes(field.key)) {
    section = "pageHeader";
  } else if (["loadNumber", "origin", "destination", "deliveryDate", "weight", "lineItemsTable"].includes(field.key)) {
    section = "loadDetails";
  } else if (["subtotal", "taxRate", "taxAmount", "totalDue", "amountPaid", "balanceDue"].includes(field.key)) {
    section = "summary";
  } else if (["notes", "bankDetails", "footer", "customText1", "customText2"].includes(field.key)) {
    section = "pageFooter";
  }
  return { ...field, section };
};

const migrateFields = (rawFields) => {
  const migrated = rawFields.map(migrateFieldSection);
  const needsYRemap = rawFields.some((f) => !f.section);
  if (!needsYRemap) return migrated;
  const groups = {};
  migrated.forEach((f) => {
    if (!groups[f.section]) groups[f.section] = [];
    groups[f.section].push(f);
  });
  const result = [];
  Object.values(groups).forEach((group) => {
    if (group.length === 0) return;
    const minY = Math.min(...group.map((f) => f.position.y));
    group.forEach((f) => {
      result.push({ ...f, position: { ...f.position, y: f.position.y - minY } });
    });
  });
  return result;
};

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
  const [activeSection, setActiveSection] = useState("reportHeader");
  const [collapsedSections, setCollapsedSections] = useState({});

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
          setFields(migrateFields(template.fields || []));
        }
      } catch {}
    }
  }, [templateId]);

  const paperDims = PAPER_SIZES[pageSize]?.[orientation] || PAPER_SIZES.A4.portrait;
  const canvasScale = 0.85;
  const canvasWidth = (paperDims.width - margins.left - margins.right) * canvasScale;

  const selectedField = fields.find((f) => f.key === selectedFieldKey);

  const fieldsBySection = useMemo(() => {
    const grouped = {};
    SECTIONS.forEach((s) => { grouped[s.id] = []; });
    fields.forEach((f) => {
      const sid = f.section || "reportHeader";
      if (grouped[sid]) grouped[sid].push(f);
      else grouped["reportHeader"].push(f);
    });
    return grouped;
  }, [fields]);

  const getNextYInSection = useCallback(
    (sectionId) => {
      const sectionFields = fields.filter((f) => f.section === sectionId);
      if (sectionFields.length === 0) return 0;
      let maxBottom = 0;
      sectionFields.forEach((f) => {
        const bottom = f.position.y + f.position.h;
        if (bottom > maxBottom) maxBottom = bottom;
      });
      return maxBottom + 1;
    },
    [fields]
  );

  const addField = (paletteField, categoryName) => {
    if (fields.find((f) => f.key === paletteField.key)) return;
    const targetSection = activeSection || paletteField.suggestedSection || "reportHeader";
    const newField = {
      key: paletteField.key,
      label: paletteField.label,
      type: paletteField.type,
      category: categoryName,
      section: targetSection,
      position: {
        x: 0,
        y: getNextYInSection(targetSection),
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
    if (collapsedSections[targetSection]) {
      setCollapsedSections((prev) => ({ ...prev, [targetSection]: false }));
    }
  };

  const removeField = (key) => {
    setFields((prev) => prev.filter((f) => f.key !== key));
    if (selectedFieldKey === key) setSelectedFieldKey(null);
    setIsDirty(true);
  };

  const updateFieldStyle = (key, styleUpdate) => {
    setFields((prev) =>
      prev.map((f) =>
        f.key === key ? { ...f, style: { ...f.style, ...styleUpdate } } : f
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

  const handleSectionLayoutChange = useCallback((sectionId, layout) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.section !== sectionId) return field;
        const layoutItem = layout.find((l) => l.i === field.key);
        if (layoutItem) {
          return {
            ...field,
            position: { x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h },
          };
        }
        return field;
      })
    );
  }, []);

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
      sectionOrder: SECTIONS.map((s) => s.id),
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
      <div className="h-12 border-b flex items-center justify-between px-4 bg-background shrink-0">
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
          <LayoutTemplateIcon className="h-4 w-4 text-muted-foreground" />
          <Input
            value={templateName}
            onChange={(e) => { setTemplateName(e.target.value); setIsDirty(true); }}
            className="w-56 h-7 text-sm font-semibold border-transparent hover:border-input focus:border-input"
            placeholder="Template Name"
          />
          {isDirty ? (
            <Badge variant="outline" className="text-amber-600 border-amber-400 text-[10px]">Unsaved</Badge>
          ) : saveSuccess ? (
            <Badge className="bg-green-500/10 text-green-700 border-green-500/50 hover:bg-green-500/10 text-[10px]">
              <CheckIcon className="h-3 w-3 mr-1" /> Saved
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Select value={pageSize} onValueChange={(v) => { setPageSize(v); setIsDirty(true); }}>
            <SelectTrigger className="h-7 w-20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4</SelectItem>
              <SelectItem value="Letter">Letter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={orientation} onValueChange={(v) => { setOrientation(v); setIsDirty(true); }}>
            <SelectTrigger className="h-7 w-24 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-5" />
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setIsPreviewOpen(true)}
            disabled={fields.length === 0}
          >
            <EyeIcon className="h-3.5 w-3.5 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            className="h-7 text-xs bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={handleSave}
            disabled={!templateName.trim() || fields.length === 0}
          >
            <SaveIcon className="h-3.5 w-3.5 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* 3-Panel Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar — Section Picker + Field Palette */}
        <div className="w-60 border-r overflow-y-auto bg-muted/30 shrink-0">
          {/* Active Section Picker */}
          <div className="p-2 border-b">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5 px-1">Add to Section</p>
            <div className="space-y-0.5">
              {SECTIONS.map((section) => {
                const SectionIcon = section.icon;
                const isActive = activeSection === section.id;
                const count = fieldsBySection[section.id]?.length || 0;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-md transition-colors text-left",
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-1 h-3.5 rounded-full shrink-0",
                      section.borderColor.replace("border-l-", "bg-")
                    )} />
                    <SectionIcon className="h-3 w-3 shrink-0" />
                    <span className="truncate flex-1">{section.label}</span>
                    {count > 0 && (
                      <span className="text-[9px] text-muted-foreground">{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field Categories */}
          <div className="p-2 border-b">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1 px-1">Invoice Fields</p>
          </div>
          <div className="p-1.5">
            {FIELD_CATEGORIES.map((category) => {
              const CategoryIcon = category.icon;
              const isExpanded = expandedCategories[category.name];
              return (
                <div key={category.name} className="mb-0.5">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDownIcon className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
                    )}
                    <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                    <span>{category.name}</span>
                  </button>
                  {isExpanded && (
                    <div className="ml-2.5 mt-0.5 space-y-px">
                      {category.fields.map((field) => {
                        const added = isFieldAdded(field.key);
                        return (
                          <button
                            key={field.key}
                            onClick={() => !added && addField(field, category.name)}
                            disabled={added}
                            className={cn(
                              "w-full flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-md transition-colors text-left",
                              added
                                ? "bg-green-500/10 text-green-700 dark:text-green-400 cursor-default"
                                : "hover:bg-accent text-foreground cursor-pointer"
                            )}
                          >
                            {added ? (
                              <CheckIcon className="h-2.5 w-2.5 shrink-0" />
                            ) : (
                              <PlusIcon className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
                            )}
                            <span className="truncate flex-1">{field.label}</span>
                            {field.suggestedSection && (
                              <span className={cn(
                                "text-[7px] px-1 rounded shrink-0",
                                field.suggestedSection === activeSection
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                              )}>
                                {SECTIONS.find((s) => s.id === field.suggestedSection)?.label?.split(" ").pop()}
                              </span>
                            )}
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
        <div className="flex-1 overflow-auto bg-muted/50 flex justify-center p-4">
          <div
            className="bg-white shadow-lg border border-gray-200 relative shrink-0"
            style={{
              width: paperDims.width * canvasScale,
              minHeight: fields.length > 0 ? paperDims.height * canvasScale : undefined,
              height: 'fit-content',
              padding: `${margins.top * canvasScale}px ${margins.right * canvasScale}px ${margins.bottom * canvasScale}px ${margins.left * canvasScale}px`,
            }}
          >
            <div className="flex flex-col">
              {SECTIONS.map((section) => {
                const sectionFields = fieldsBySection[section.id] || [];
                const isCollapsed = collapsedSections[section.id];
                const isActive = activeSection === section.id;
                const SectionIcon = section.icon;

                const sectionLayout = sectionFields.map((f) => ({
                  i: f.key,
                  x: f.position.x,
                  y: f.position.y,
                  w: f.position.w,
                  h: f.position.h,
                  minW: 1,
                  minH: 1,
                }));

                return (
                  <div
                    key={section.id}
                    className={cn(
                      "relative border-l-[3px] mb-0.5 transition-all",
                      section.borderColor,
                      isActive && "ring-1 ring-blue-300 dark:ring-blue-700 rounded-r-sm"
                    )}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {/* Section Header Bar */}
                    <div className={cn(
                      "flex items-center justify-between px-1.5 py-[2px]",
                      section.bgColor
                    )}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCollapsedSections((prev) => ({
                              ...prev,
                              [section.id]: !prev[section.id],
                            }));
                          }}
                          className="p-0.5 hover:bg-black/5 rounded"
                        >
                          {isCollapsed ? (
                            <ChevronRightIcon className="h-2.5 w-2.5 text-gray-500" />
                          ) : (
                            <ChevronDownIcon className="h-2.5 w-2.5 text-gray-500" />
                          )}
                        </button>
                        <SectionIcon className="h-2.5 w-2.5 text-gray-500" />
                        <span className="text-[9px] font-semibold text-gray-600 uppercase tracking-wider">
                          {section.label}
                        </span>
                        <span className={cn(
                          "text-[7px] px-1 py-px rounded-full font-medium",
                          section.badgeColor
                        )}>
                          {section.description}
                        </span>
                      </div>
                      <span className="text-[8px] text-gray-400">
                        {sectionFields.length} field{sectionFields.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Section Content */}
                    {!isCollapsed && (
                      <div
                        className={cn(
                          "relative",
                          sectionFields.length === 0 && "flex items-center justify-center"
                        )}
                        style={{
                          minHeight: sectionFields.length === 0
                            ? section.defaultMinRows * ROW_HEIGHT * canvasScale
                            : undefined,
                        }}
                      >
                        {sectionFields.length === 0 ? (
                          <p className="text-[8px] text-gray-400 italic py-1.5">
                            Click a field to add here
                          </p>
                        ) : (
                          <GridLayout
                            className="layout"
                            layout={sectionLayout}
                            cols={12}
                            rowHeight={ROW_HEIGHT * canvasScale}
                            width={canvasWidth - SECTION_BORDER_WIDTH}
                            onLayoutChange={(layout) =>
                              handleSectionLayoutChange(section.id, layout)
                            }
                            draggableHandle=".drag-handle"
                            compactType={null}
                            preventCollision={false}
                            isResizable={true}
                            isDraggable={true}
                            margin={[0, 0]}
                            containerPadding={[0, 0]}
                          >
                            {sectionFields.map((field) => (
                              <div
                                key={field.key}
                                className={cn(
                                  "group border rounded-sm cursor-pointer transition-all relative",
                                  selectedFieldKey === field.key
                                    ? "border-blue-500 ring-1 ring-blue-200 dark:ring-blue-800 z-10"
                                    : "border-dashed border-gray-300 hover:border-gray-400"
                                )}
                                onClick={(e) => { e.stopPropagation(); setSelectedFieldKey(field.key); }}
                              >
                                {/* Drag Handle */}
                                <div
                                  className="drag-handle absolute top-0 left-0 right-0 flex items-center justify-between px-0.5 bg-gray-50/80 border-b border-gray-200 cursor-move z-10"
                                  style={{ height: 12 }}
                                >
                                  <div className="flex items-center gap-0.5 overflow-hidden">
                                    <GripVerticalIcon className="h-2 w-2 text-gray-400 shrink-0" />
                                    <span className="text-[7px] text-gray-500 truncate font-medium leading-none">
                                      {field.label}
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); removeField(field.key); }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                  >
                                    <XIcon className="h-2 w-2 text-gray-400 hover:text-red-500" />
                                  </button>
                                </div>
                                {/* Field Content Preview */}
                                <div
                                  className="w-full h-full flex items-end px-1 pb-0.5 overflow-hidden text-gray-600"
                                  style={{
                                    paddingTop: 14,
                                    fontSize: Math.max(7, (field.style?.fontSize || 12) * canvasScale * 0.7),
                                    fontWeight: field.style?.bold ? "bold" : "normal",
                                    fontStyle: field.style?.italic ? "italic" : "normal",
                                    textAlign: field.style?.alignment || "left",
                                  }}
                                >
                                  {field.type === "table" ? (
                                    <div className="w-full text-center text-[7px] text-gray-400 border border-dashed border-gray-300 rounded py-0.5">
                                      [Line Items Table]
                                    </div>
                                  ) : field.type === "image" ? (
                                    <div className="w-full text-center text-[7px] text-gray-400 bg-gray-50 rounded py-0.5">
                                      [Logo]
                                    </div>
                                  ) : (
                                    <span className="truncate w-full block leading-tight">
                                      {`{${field.key}}`}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </GridLayout>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar — Properties Panel */}
        <div className="w-64 border-l overflow-y-auto bg-background shrink-0">
          {selectedField ? (
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold">Field Properties</h3>
                <Badge variant="outline" className="text-[9px] px-1 py-0">
                  {getFieldTypeLabel(selectedField.type)}
                </Badge>
              </div>
              <Separator className="mb-3" />

              <div className="space-y-3">
                {/* Label */}
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-muted-foreground">Display Label</Label>
                  <Input
                    value={selectedField.label}
                    onChange={(e) => updateFieldLabel(selectedField.key, e.target.value)}
                    className="h-7 text-xs"
                  />
                </div>

                {/* Section */}
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-muted-foreground">Section</Label>
                  <Select
                    value={selectedField.section || "reportHeader"}
                    onValueChange={(newSection) => {
                      setFields((prev) =>
                        prev.map((f) =>
                          f.key === selectedField.key
                            ? { ...f, section: newSection, position: { ...f.position, y: getNextYInSection(newSection) } }
                            : f
                        )
                      );
                      setIsDirty(true);
                      setActiveSection(newSection);
                    }}
                  >
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTIONS.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-muted-foreground">Font Size (px)</Label>
                  <Input
                    type="number"
                    value={selectedField.style?.fontSize || 12}
                    onChange={(e) =>
                      updateFieldStyle(selectedField.key, {
                        fontSize: Math.max(6, Math.min(48, parseInt(e.target.value) || 12)),
                      })
                    }
                    className="h-7 text-xs"
                    min={6}
                    max={48}
                  />
                </div>

                {/* Bold / Italic */}
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-muted-foreground">Text Style</Label>
                  <div className="flex gap-1">
                    <Button
                      variant={selectedField.style?.bold ? "default" : "outline"}
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() =>
                        updateFieldStyle(selectedField.key, { bold: !selectedField.style?.bold })
                      }
                    >
                      <BoldIcon className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant={selectedField.style?.italic ? "default" : "outline"}
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() =>
                        updateFieldStyle(selectedField.key, { italic: !selectedField.style?.italic })
                      }
                    >
                      <ItalicIcon className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Alignment */}
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-muted-foreground">Alignment</Label>
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
                        className="h-7 w-7 p-0"
                        onClick={() => updateFieldStyle(selectedField.key, { alignment: value })}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Position (read-only) */}
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-muted-foreground">Position (auto)</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <span className="text-[9px] text-muted-foreground">X</span>
                      <Input value={selectedField.position.x} disabled className="h-6 text-[10px] mt-0.5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground">Y</span>
                      <Input value={selectedField.position.y} disabled className="h-6 text-[10px] mt-0.5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground">Width</span>
                      <Input value={selectedField.position.w} disabled className="h-6 text-[10px] mt-0.5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground">Height</span>
                      <Input value={selectedField.position.h} disabled className="h-6 text-[10px] mt-0.5" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Remove */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => removeField(selectedField.key)}
                >
                  <Trash2Icon className="h-3.5 w-3.5 mr-1.5" />
                  Remove Field
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                <PencilIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">No Field Selected</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
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
              sectionOrder: SECTIONS.map((s) => s.id),
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateBuilder;
