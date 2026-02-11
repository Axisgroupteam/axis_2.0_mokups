import { cn } from "@/lib/utils";

const PAPER_SIZES = {
  A4: { portrait: { width: 595, height: 842 }, landscape: { width: 842, height: 595 } },
  Letter: { portrait: { width: 612, height: 792 }, landscape: { width: 792, height: 612 } },
};

const DEFAULT_SECTION_ORDER = ["reportHeader", "pageHeader", "loadDetails", "summary", "pageFooter"];

const SECTION_SEPARATOR = {
  reportHeader: true,
  pageHeader: true,
  loadDetails: true,
  summary: false,
  pageFooter: false,
};

const DEFAULT_SAMPLE_DATA = {
  companyLogo: "[Logo]",
  companyName: "Mega Logistics LLC",
  companyAddress: "456 Freight Blvd, Suite 200\nAtlanta, GA 30301",
  companyPhone: "(404) 555-0188",
  invoiceTitle: "INVOICE",
  invoiceNo: "ML-INV-2025-0042",
  invoiceDate: "2025-02-10",
  dueDate: "2025-03-12",
  poNumber: "PO-88421",
  terms: "Net 30",
  customerName: "ABC Construction Inc.",
  customerAddress: "123 Main St, Suite 400\nHouston, TX 77001",
  customerContact: "John Smith",
  customerEmail: "john@abcconstruction.com",
  loadNumber: "ML-2025-001245",
  origin: "Houston, TX",
  destination: "Dallas, TX",
  deliveryDate: "2025-02-08",
  weight: "42,500 lbs",
  subtotal: 5250.0,
  taxRate: "0%",
  taxAmount: 0,
  totalDue: 6075.0,
  amountPaid: 0,
  balanceDue: 6075.0,
  notes: "Payment due within 30 days. Please reference invoice number on all payments.",
  bankDetails: "Bank: First National\nRouting: 061000052\nAccount: 8847201553",
  customText1: "Custom field value 1",
  customText2: "Custom field value 2",
  footer: "Thank you for your business!",
  lineItems: [
    { loadNo: "ML-2025-001245", deliveryDate: "2025-02-03", origin: "Houston, TX", destination: "Dallas, TX", commodity: "Cement", weight: "24,500 lbs", freight: 1850.0, fuelSurcharge: 185.0, accessorials: 150.0, total: 2185.0 },
    { loadNo: "ML-2025-001246", deliveryDate: "2025-02-04", origin: "Houston, TX", destination: "Austin, TX", commodity: "Sand", weight: "22,000 lbs", freight: 2100.0, fuelSurcharge: 210.0, accessorials: 0, total: 2310.0 },
    { loadNo: "ML-2025-001247", deliveryDate: "2025-02-05", origin: "Dallas, TX", destination: "San Antonio, TX", commodity: "Gravel", weight: "18,000 lbs", freight: 1300.0, fuelSurcharge: 130.0, accessorials: 100.0, total: 1530.0 },
  ],
};

// Fields that display only their value (no "Label:" prefix)
const NO_LABEL_FIELDS = new Set([
  "companyName", "companyAddress", "companyPhone", "invoiceTitle", "companyLogo",
  "notes", "bankDetails", "footer", "customText1", "customText2", "lineItemsTable",
]);

const formatCurrency = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "$0.00";
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const renderLineItemsTable = (data, scale) => {
  const items = data.lineItems || [];
  return (
    <table className="w-full border-collapse" style={{ fontSize: 10 * scale }}>
      <thead>
        <tr className="border-b border-gray-400">
          <th className="text-left p-1 font-semibold">Load #</th>
          <th className="text-left p-1 font-semibold">Date</th>
          <th className="text-left p-1 font-semibold">Origin</th>
          <th className="text-left p-1 font-semibold">Destination</th>
          <th className="text-right p-1 font-semibold">Freight</th>
          <th className="text-right p-1 font-semibold">Fuel SC</th>
          <th className="text-right p-1 font-semibold">Accessorials</th>
          <th className="text-right p-1 font-semibold">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i} className={cn("border-b border-gray-200", i % 2 === 1 && "bg-gray-50")}>
            <td className="p-1">{item.loadNo}</td>
            <td className="p-1">{item.deliveryDate}</td>
            <td className="p-1">{item.origin}</td>
            <td className="p-1">{item.destination}</td>
            <td className="text-right p-1">{formatCurrency(item.freight)}</td>
            <td className="text-right p-1">{formatCurrency(item.fuelSurcharge)}</td>
            <td className="text-right p-1">{formatCurrency(item.accessorials)}</td>
            <td className="text-right p-1 font-medium">{formatCurrency(item.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TemplatePreview = ({ template, sampleData = DEFAULT_SAMPLE_DATA }) => {
  if (!template) return null;

  const paperDims = PAPER_SIZES[template.pageSize]?.[template.orientation] || PAPER_SIZES.A4.portrait;
  const scale = 0.75;
  const marginTop = (template.margins?.top || 40) * scale;
  const marginRight = (template.margins?.right || 40) * scale;
  const marginBottom = (template.margins?.bottom || 40) * scale;
  const marginLeft = (template.margins?.left || 40) * scale;
  const paperWidth = paperDims.width * scale;
  const paperHeight = paperDims.height * scale;
  const rowHeight = 20 * scale;

  const sectionOrder = template.sectionOrder || DEFAULT_SECTION_ORDER;

  // Group fields by section
  const fieldsBySection = {};
  sectionOrder.forEach((sId) => { fieldsBySection[sId] = []; });
  template.fields.forEach((field) => {
    const section = field.section || "reportHeader";
    if (!fieldsBySection[section]) fieldsBySection[section] = [];
    fieldsBySection[section].push(field);
  });

  const renderFieldValue = (field) => {
    const value = sampleData[field.key];
    const showLabel = !NO_LABEL_FIELDS.has(field.key);

    if (field.type === "table") {
      return renderLineItemsTable(sampleData, scale);
    }
    if (field.type === "image") {
      return (
        <div className="w-full h-full bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400" style={{ fontSize: 10 * scale }}>
          [Company Logo]
        </div>
      );
    }
    if (field.type === "currency") {
      const formatted = formatCurrency(value);
      if (showLabel) {
        return (
          <>
            <span className="text-gray-500" style={{ fontWeight: "normal" }}>{field.label}: </span>
            {formatted}
          </>
        );
      }
      return formatted;
    }
    if (field.type === "textarea" && typeof value === "string") {
      return value.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          {i < value.split("\n").length - 1 && <br />}
        </span>
      ));
    }
    const displayValue = value || "";
    if (showLabel && displayValue) {
      return (
        <>
          <span className="text-gray-500" style={{ fontWeight: "normal" }}>{field.label}: </span>
          {displayValue}
        </>
      );
    }
    return displayValue;
  };

  return (
    <div className="flex justify-center py-4 overflow-auto">
      <div
        className="bg-white border border-gray-300 shadow-lg relative text-black"
        style={{
          width: paperWidth,
          minHeight: paperHeight,
          padding: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        }}
      >
        <div style={{ minHeight: paperHeight - marginTop - marginBottom }}>
          {sectionOrder.map((sectionId) => {
            const sectionFields = fieldsBySection[sectionId] || [];
            if (sectionFields.length === 0) return null;

            // Calculate the number of grid rows needed for this section
            const maxRow = Math.max(...sectionFields.map((f) => f.position.y + f.position.h));

            return (
              <div key={sectionId}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gridTemplateRows: `repeat(${maxRow}, minmax(${rowHeight}px, auto))`,
                  }}
                >
                  {sectionFields.map((field) => (
                    <div
                      key={field.key}
                      className="overflow-hidden"
                      style={{
                        gridColumn: `${field.position.x + 1} / span ${field.position.w}`,
                        gridRow: `${field.position.y + 1} / span ${field.position.h}`,
                        fontSize: (field.style?.fontSize || 12) * scale,
                        fontWeight: field.style?.bold ? "bold" : "normal",
                        fontStyle: field.style?.italic ? "italic" : "normal",
                        textAlign: field.style?.alignment || "left",
                        lineHeight: 1.3,
                        padding: `${1 * scale}px 0`,
                      }}
                    >
                      {renderFieldValue(field)}
                    </div>
                  ))}
                </div>
                {SECTION_SEPARATOR[sectionId] && (
                  <div
                    className="border-b border-gray-200"
                    style={{ margin: `${4 * scale}px 0` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
