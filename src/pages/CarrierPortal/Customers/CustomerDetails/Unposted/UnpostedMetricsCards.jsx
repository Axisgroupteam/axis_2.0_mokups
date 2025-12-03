const UnpostedMetricsCards = () => {
  // Mock data
  const metricsData = [
    { label: "Orders", value: "24" },
    { label: "Miscellaneous Bills", value: "8" },
    { label: "Credit Memos", value: "3" },
    { label: "Cash Receipts", value: "12" },
    { label: "Net Total", value: "$45,320.00" },
  ];

  return (
    <div className="border rounded-sm bg-card">
      <div className="flex divide-x divide-border">
        {metricsData.map((item, index) => (
          <div key={index} className="flex-1 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className="text-sm text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnpostedMetricsCards;
