const ReceivablesMetricsCards = () => {
  // Mock data
  const metricsData = [
    { label: "Current", value: "$28,500.00" },
    { label: "Over 30", value: "$12,350.00" },
    { label: "Over 60", value: "$8,200.00" },
    { label: "Over 90", value: "$4,500.00" },
    { label: "Over 120", value: "$2,100.00" },
    { label: "Balance", value: "$55,650.00" },
    { label: "Open Credits", value: "$3,200.00" },
    { label: "Aging Balance", value: "$52,450.00" },
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

export default ReceivablesMetricsCards;
