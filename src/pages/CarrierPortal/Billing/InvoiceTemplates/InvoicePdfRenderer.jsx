import { useRef, useCallback } from "react";
import html2pdf from "html2pdf.js";

const PAPER_SIZES = {
  A4: { portrait: { width: 595, height: 842 }, landscape: { width: 842, height: 595 } },
  Letter: { portrait: { width: 612, height: 792 }, landscape: { width: 792, height: 612 } },
};

const formatCurrency = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "$0.00";
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const InvoicePdfRenderer = ({ template, invoiceData, onGenerate }) => {
  const contentRef = useRef(null);

  const generatePdf = useCallback(async () => {
    if (!contentRef.current || !template) return;

    const paperDims = PAPER_SIZES[template.pageSize]?.[template.orientation] || PAPER_SIZES.A4.portrait;
    const isLandscape = template.orientation === "landscape";

    const opt = {
      margin: 0,
      filename: `${invoiceData.invoiceNo || "invoice"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "pt",
        format: template.pageSize?.toLowerCase() === "letter" ? "letter" : "a4",
        orientation: isLandscape ? "landscape" : "portrait",
      },
    };

    try {
      await html2pdf().set(opt).from(contentRef.current).save();
      onGenerate?.();
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  }, [template, invoiceData, onGenerate]);

  if (!template) return null;

  const paperDims = PAPER_SIZES[template.pageSize]?.[template.orientation] || PAPER_SIZES.A4.portrait;
  const marginTop = template.margins?.top || 40;
  const marginRight = template.margins?.right || 40;
  const marginBottom = template.margins?.bottom || 40;
  const marginLeft = template.margins?.left || 40;
  const contentWidth = paperDims.width - marginLeft - marginRight;
  const colWidth = contentWidth / 12;
  const rowHeight = 28;

  // Map invoice data to template field keys
  const mapInvoiceToTemplateData = () => {
    const lineItems = invoiceData.lineItems || [];

    return {
      // Header Info
      companyLogo: "[Logo]",
      companyName: invoiceData.businessUnit || "Company Name",
      companyAddress: invoiceData.businessUnitAddress || "",
      companyPhone: invoiceData.businessUnitPhone || "",
      invoiceTitle: "INVOICE",

      // Invoice Details
      invoiceNo: invoiceData.invoiceNo || "",
      invoiceDate: formatDate(invoiceData.invoiceDate),
      dueDate: formatDate(invoiceData.dueDate),
      poNumber: invoiceData.poNumber || "",
      terms: invoiceData.paymentTerms || "",

      // Customer Info
      customerName: invoiceData.customer || "",
      customerAddress: invoiceData.customerAddress || "",
      customerContact: invoiceData.customerContact || "",
      customerEmail: invoiceData.customerEmail || "",

      // Load/Shipment (for single load display)
      loadNumber: lineItems[0]?.loadNo || "",
      origin: lineItems[0]?.origin || "",
      destination: lineItems[0]?.destination || "",
      deliveryDate: formatDate(lineItems[0]?.deliveryDate),
      weight: lineItems[0]?.weight || "",

      // Financial
      subtotal: invoiceData.subtotal || 0,
      taxRate: invoiceData.taxRate || "0%",
      taxAmount: invoiceData.taxAmount || 0,
      totalDue: invoiceData.totalAmount || 0,
      amountPaid: invoiceData.paidAmount || 0,
      balanceDue: invoiceData.balanceDue || 0,

      // Custom Fields
      notes: invoiceData.notes || "Payment due within 30 days. Please reference invoice number on all payments.",
      bankDetails: invoiceData.bankDetails || "",
      customText1: invoiceData.customText1 || "",
      customText2: invoiceData.customText2 || "",
      footer: invoiceData.footer || "Thank you for your business!",

      // Line items for table
      lineItems: lineItems,
    };
  };

  const data = mapInvoiceToTemplateData();

  const renderLineItemsTable = () => {
    const items = data.lineItems || [];
    return (
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #999" }}>
            <th style={{ textAlign: "left", padding: "4px 6px", fontWeight: 600 }}>Load #</th>
            <th style={{ textAlign: "left", padding: "4px 6px", fontWeight: 600 }}>Date</th>
            <th style={{ textAlign: "left", padding: "4px 6px", fontWeight: 600 }}>Origin</th>
            <th style={{ textAlign: "left", padding: "4px 6px", fontWeight: 600 }}>Destination</th>
            <th style={{ textAlign: "right", padding: "4px 6px", fontWeight: 600 }}>Freight</th>
            <th style={{ textAlign: "right", padding: "4px 6px", fontWeight: 600 }}>Fuel SC</th>
            <th style={{ textAlign: "right", padding: "4px 6px", fontWeight: 600 }}>Accessorials</th>
            <th style={{ textAlign: "right", padding: "4px 6px", fontWeight: 600 }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid #ddd",
                backgroundColor: i % 2 === 1 ? "#f9f9f9" : "transparent"
              }}
            >
              <td style={{ padding: "4px 6px" }}>{item.loadNo}</td>
              <td style={{ padding: "4px 6px" }}>{formatDate(item.deliveryDate)}</td>
              <td style={{ padding: "4px 6px" }}>{item.origin}</td>
              <td style={{ padding: "4px 6px" }}>{item.destination}</td>
              <td style={{ textAlign: "right", padding: "4px 6px" }}>{formatCurrency(item.freight)}</td>
              <td style={{ textAlign: "right", padding: "4px 6px" }}>{formatCurrency(item.fuelSurcharge)}</td>
              <td style={{ textAlign: "right", padding: "4px 6px" }}>{formatCurrency(item.accessorials)}</td>
              <td style={{ textAlign: "right", padding: "4px 6px", fontWeight: 500 }}>{formatCurrency(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderFieldValue = (field) => {
    const value = data[field.key];

    if (field.type === "table") {
      return renderLineItemsTable();
    }

    if (field.type === "currency") {
      return formatCurrency(value);
    }

    if (field.type === "image") {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f3f4f6",
            border: "1px solid #d1d5db",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontSize: 10
          }}
        >
          [Company Logo]
        </div>
      );
    }

    if (field.type === "textarea" && typeof value === "string") {
      return value.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          {i < value.split("\n").length - 1 && <br />}
        </span>
      ));
    }

    return value || "";
  };

  return (
    <>
      {/* Hidden container for PDF generation */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
      >
        <div
          ref={contentRef}
          style={{
            width: paperDims.width,
            minHeight: paperDims.height,
            backgroundColor: "#ffffff",
            padding: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
            fontFamily: "Arial, sans-serif",
            color: "#000000",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "relative", width: "100%", minHeight: paperDims.height - marginTop - marginBottom }}>
            {template.fields.map((field) => (
              <div
                key={field.key}
                style={{
                  position: "absolute",
                  left: field.position.x * colWidth,
                  top: field.position.y * rowHeight,
                  width: field.position.w * colWidth,
                  height: field.type === "table" ? "auto" : field.position.h * rowHeight,
                  minHeight: field.position.h * rowHeight,
                  fontSize: field.style?.fontSize || 12,
                  fontWeight: field.style?.bold ? "bold" : "normal",
                  fontStyle: field.style?.italic ? "italic" : "normal",
                  textAlign: field.style?.alignment || "left",
                  lineHeight: 1.3,
                  overflow: "hidden",
                }}
              >
                {renderFieldValue(field)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expose generatePdf function via ref callback */}
      <button
        onClick={generatePdf}
        style={{ display: "none" }}
        data-pdf-trigger="true"
      />
    </>
  );
};

// Export a hook-friendly version
export const useInvoicePdfGenerator = () => {
  const generatePdf = useCallback(async (template, invoiceData, filename) => {
    if (!template || !invoiceData) {
      console.error("Template and invoice data are required");
      return false;
    }

    const paperDims = PAPER_SIZES[template.pageSize]?.[template.orientation] || PAPER_SIZES.A4.portrait;
    const marginTop = template.margins?.top || 40;
    const marginRight = template.margins?.right || 40;
    const marginBottom = template.margins?.bottom || 40;
    const marginLeft = template.margins?.left || 40;
    const contentWidth = paperDims.width - marginLeft - marginRight;
    const colWidth = contentWidth / 12;
    const rowHeight = 28;

    // Map invoice data
    const lineItems = invoiceData.lineItems || [];
    const data = {
      companyLogo: "[Logo]",
      companyName: invoiceData.businessUnit || "Company Name",
      companyAddress: invoiceData.businessUnitAddress || "",
      companyPhone: invoiceData.businessUnitPhone || "",
      invoiceTitle: "INVOICE",
      invoiceNo: invoiceData.invoiceNo || "",
      invoiceDate: formatDate(invoiceData.invoiceDate),
      dueDate: formatDate(invoiceData.dueDate),
      poNumber: invoiceData.poNumber || "",
      terms: invoiceData.paymentTerms || "",
      customerName: invoiceData.customer || "",
      customerAddress: invoiceData.customerAddress || "",
      customerContact: invoiceData.customerContact || "",
      customerEmail: invoiceData.customerEmail || "",
      loadNumber: lineItems[0]?.loadNo || "",
      origin: lineItems[0]?.origin || "",
      destination: lineItems[0]?.destination || "",
      deliveryDate: formatDate(lineItems[0]?.deliveryDate),
      weight: lineItems[0]?.weight || "",
      subtotal: invoiceData.subtotal || 0,
      taxRate: invoiceData.taxRate || "0%",
      taxAmount: invoiceData.taxAmount || 0,
      totalDue: invoiceData.totalAmount || 0,
      amountPaid: invoiceData.paidAmount || 0,
      balanceDue: invoiceData.balanceDue || 0,
      notes: invoiceData.notes || "Payment due within 30 days.",
      bankDetails: invoiceData.bankDetails || "",
      customText1: invoiceData.customText1 || "",
      customText2: invoiceData.customText2 || "",
      footer: invoiceData.footer || "Thank you for your business!",
      lineItems: lineItems,
    };

    // Build HTML string
    const buildLineItemsTable = () => {
      const items = data.lineItems || [];
      let rows = items.map((item, i) => `
        <tr style="border-bottom: 1px solid #ddd; background-color: ${i % 2 === 1 ? '#f9f9f9' : 'transparent'};">
          <td style="padding: 4px 6px;">${item.loadNo || ''}</td>
          <td style="padding: 4px 6px;">${formatDate(item.deliveryDate)}</td>
          <td style="padding: 4px 6px;">${item.origin || ''}</td>
          <td style="padding: 4px 6px;">${item.destination || ''}</td>
          <td style="text-align: right; padding: 4px 6px;">${formatCurrency(item.freight)}</td>
          <td style="text-align: right; padding: 4px 6px;">${formatCurrency(item.fuelSurcharge)}</td>
          <td style="text-align: right; padding: 4px 6px;">${formatCurrency(item.accessorials)}</td>
          <td style="text-align: right; padding: 4px 6px; font-weight: 500;">${formatCurrency(item.total)}</td>
        </tr>
      `).join('');

      return `
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
          <thead>
            <tr style="border-bottom: 1px solid #999;">
              <th style="text-align: left; padding: 4px 6px; font-weight: 600;">Load #</th>
              <th style="text-align: left; padding: 4px 6px; font-weight: 600;">Date</th>
              <th style="text-align: left; padding: 4px 6px; font-weight: 600;">Origin</th>
              <th style="text-align: left; padding: 4px 6px; font-weight: 600;">Destination</th>
              <th style="text-align: right; padding: 4px 6px; font-weight: 600;">Freight</th>
              <th style="text-align: right; padding: 4px 6px; font-weight: 600;">Fuel SC</th>
              <th style="text-align: right; padding: 4px 6px; font-weight: 600;">Accessorials</th>
              <th style="text-align: right; padding: 4px 6px; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    };

    const getFieldValue = (field) => {
      const value = data[field.key];
      if (field.type === "table") return buildLineItemsTable();
      if (field.type === "currency") return formatCurrency(value);
      if (field.type === "image") {
        return `<div style="width: 100%; height: 100%; background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 10px;">[Company Logo]</div>`;
      }
      if (field.type === "textarea" && typeof value === "string") {
        return value.split("\n").join("<br/>");
      }
      return value || "";
    };

    // Find table field and calculate dynamic offset for fields below it
    const tableField = template.fields.find((f) => f.type === "table");
    const lineItemCount = data.lineItems?.length || 0;
    const tableHeaderHeight = 30; // pixels for header row
    const tableRowHeight = 28; // pixels per data row (including padding + border)
    const actualTableHeight = tableHeaderHeight + (lineItemCount * tableRowHeight) + 10; // +10 for spacing
    const templateTableHeight = tableField ? tableField.position.h * rowHeight : 0;
    const tableHeightDiff = tableField ? Math.max(0, actualTableHeight - templateTableHeight) : 0;
    const tableBottomY = tableField ? tableField.position.y + tableField.position.h : 0;

    const fieldsHtml = template.fields.map((field) => {
      // Adjust Y position for fields below the table
      let adjustedY = field.position.y * rowHeight;
      if (tableField && field.type !== "table" && field.position.y >= tableBottomY) {
        adjustedY += tableHeightDiff;
      }

      return `
        <div style="
          position: absolute;
          left: ${field.position.x * colWidth}px;
          top: ${adjustedY}px;
          width: ${field.position.w * colWidth}px;
          ${field.type === "table" ? "height: auto;" : `height: ${field.position.h * rowHeight}px;`}
          min-height: ${field.position.h * rowHeight}px;
          font-size: ${field.style?.fontSize || 12}px;
          font-weight: ${field.style?.bold ? "bold" : "normal"};
          font-style: ${field.style?.italic ? "italic" : "normal"};
          text-align: ${field.style?.alignment || "left"};
          line-height: 1.3;
          overflow: visible;
        ">
          ${getFieldValue(field)}
        </div>
      `;
    }).join('');

    const html = `
      <div style="
        width: ${paperDims.width}px;
        min-height: ${paperDims.height}px;
        background-color: #ffffff;
        padding: ${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px;
        font-family: Arial, sans-serif;
        color: #000000;
        box-sizing: border-box;
      ">
        <div style="position: relative; width: 100%; min-height: ${paperDims.height - marginTop - marginBottom}px; background-color: #ffffff; color: #000000;">
          ${fieldsHtml}
        </div>
      </div>
    `;

    // Create isolated iframe to avoid Tailwind CSS oklch color issues
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position: absolute; left: -9999px; top: 0; width: 900px; height: 1200px; border: none;";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            :root {
              color-scheme: light;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              background-color: transparent !important;
              border-color: #dddddd !important;
            }
            html, body {
              background-color: #ffffff !important;
              color: #000000 !important;
              font-family: Arial, sans-serif !important;
            }
            div, table, tr, td, th, span, p {
              color: #000000 !important;
            }
            table {
              border-collapse: collapse;
            }
          </style>
        </head>
        <body style="background-color: #ffffff !important; color: #000000 !important;">${html}</body>
      </html>
    `);
    iframeDoc.close();

    const isLandscape = template.orientation === "landscape";

    const opt = {
      margin: 0,
      filename: filename || `${invoiceData.invoiceNo || "invoice"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          // Reset all elements to use hex colors instead of oklch
          const allElements = clonedDoc.querySelectorAll("*");
          allElements.forEach((el) => {
            el.style.backgroundColor = el.style.backgroundColor || "transparent";
            el.style.color = el.style.color || "#000000";
            el.style.borderColor = el.style.borderColor || "transparent";
          });
        },
      },
      jsPDF: {
        unit: "pt",
        format: template.pageSize?.toLowerCase() === "letter" ? "letter" : "a4",
        orientation: isLandscape ? "landscape" : "portrait",
      },
    };

    try {
      const element = iframeDoc.body.firstElementChild;
      if (!element) {
        console.error("No element found in iframe");
        document.body.removeChild(iframe);
        return false;
      }

      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(iframe);
      return true;
    } catch (error) {
      console.error("PDF generation failed:", error);
      document.body.removeChild(iframe);
      return false;
    }
  }, []);

  return { generatePdf };
};

export default InvoicePdfRenderer;
