{
  /* Date Navigation Header */
}
<div className="flex items-center justify-between mb-4 px-1">
  <div className="flex items-center gap-2">
    <Calendar className="size-5 text-muted-foreground" />
    <span className="text-lg font-semibold">{formatDate(selectedDate)}</span>
  </div>
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
      <ChevronLeft className="size-4" />
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => setSelectedDate(new Date())}
    >
      Today
    </Button>
    <Button variant="outline" size="sm" onClick={() => changeDate(1)}>
      Next
      <ChevronRight className="size-4" />
    </Button>
  </div>
</div>;

{
  /* Gantt Chart */
}
<div className="flex-1 border rounded-sm bg-card overflow-hidden">
  <Chart
    chartType="Gantt"
    width="100%"
    height="500px"
    data={data}
    options={options}
  />
</div>;

{
  /* Legend */
}
<div className="flex items-center gap-6 mt-4 px-1">
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-sm bg-green-500" />
    <span className="text-sm text-muted-foreground">Completed</span>
  </div>
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-sm bg-blue-500" />
    <span className="text-sm text-muted-foreground">In Progress</span>
  </div>
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-sm bg-gray-300" />
    <span className="text-sm text-muted-foreground">Scheduled</span>
  </div>
</div>;
