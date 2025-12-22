import { useState, useMemo, useEffect, useCallback } from "react";
import { Gantt, Willow, WillowDark } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./gantt-colors.css";

const GanttChart = ({ headerActions }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode from document
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkDarkMode();

    // Watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Theme wrapper component based on dark mode
  const ThemeWrapper = isDarkMode ? WillowDark : Willow;

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const changeDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Helper to create date with specific hour on selected date
  const createDateTime = useCallback(
    (hour, minute = 0) => {
      const date = new Date(selectedDate);
      date.setHours(hour, minute, 0, 0);
      return date;
    },
    [selectedDate]
  );

  // Vehicle schedule data converted to SVAR format
  // SVAR uses: id, text, start, end, parent (0 for root, parent id for children)
  // Custom types for colors: onTime (green), ahead (blue), delayed (red)
  const tasks = useMemo(
    () => [
      // TRK-2847
      {
        id: 1,
        text: "TRK-2847",
        start: createDateTime(6),
        end: createDateTime(17),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 101,
        text: "ML-001201 - Titan",
        start: createDateTime(6),
        end: createDateTime(9),
        parent: 1,
        type: "onTime",
      },
      {
        id: 102,
        text: "ML-001202 - Ashgrove",
        start: createDateTime(10),
        end: createDateTime(14),
        parent: 1,
        type: "ahead",
      },
      {
        id: 103,
        text: "ML-001203 - TQL",
        start: createDateTime(15),
        end: createDateTime(17),
        parent: 1,
        type: "delayed",
      },

      // TRK-1923
      {
        id: 2,
        text: "TRK-1923",
        start: createDateTime(7),
        end: createDateTime(16),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 201,
        text: "ML-001204 - Coyote",
        start: createDateTime(7),
        end: createDateTime(9),
        parent: 2,
        type: "ahead",
      },
      {
        id: 202,
        text: "ML-001205 - CH Robinson",
        start: createDateTime(11),
        end: createDateTime(16),
        parent: 2,
        type: "onTime",
      },

      // TRK-4521
      {
        id: 3,
        text: "TRK-4521",
        start: createDateTime(8),
        end: createDateTime(17),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 301,
        text: "ML-001206 - Titan",
        start: createDateTime(8),
        end: createDateTime(12),
        parent: 3,
        type: "delayed",
      },
      {
        id: 302,
        text: "ML-001207 - Ashgrove",
        start: createDateTime(14),
        end: createDateTime(17),
        parent: 3,
        type: "onTime",
      },

      // TRK-7734
      {
        id: 4,
        text: "TRK-7734",
        start: createDateTime(5),
        end: createDateTime(19),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 401,
        text: "ML-001208 - TQL",
        start: createDateTime(5),
        end: createDateTime(7),
        parent: 4,
        type: "onTime",
      },
      {
        id: 402,
        text: "ML-001209 - Coyote",
        start: createDateTime(9),
        end: createDateTime(15),
        parent: 4,
        type: "ahead",
      },
      {
        id: 403,
        text: "ML-001210 - Titan",
        start: createDateTime(17),
        end: createDateTime(19),
        parent: 4,
        type: "delayed",
      },

      // TRK-3356
      {
        id: 5,
        text: "TRK-3356",
        start: createDateTime(6),
        end: createDateTime(17),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 501,
        text: "ML-001211 - Ashgrove",
        start: createDateTime(6),
        end: createDateTime(11),
        parent: 5,
        type: "onTime",
      },
      {
        id: 502,
        text: "ML-001212 - CH Robinson",
        start: createDateTime(13),
        end: createDateTime(17),
        parent: 5,
        type: "ahead",
      },

      // TRK-5589
      {
        id: 6,
        text: "TRK-5589",
        start: createDateTime(7),
        end: createDateTime(19),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 601,
        text: "ML-001213 - Titan",
        start: createDateTime(7),
        end: createDateTime(10),
        parent: 6,
        type: "delayed",
      },
      {
        id: 602,
        text: "ML-001214 - TQL",
        start: createDateTime(12),
        end: createDateTime(14),
        parent: 6,
        type: "onTime",
      },
      {
        id: 603,
        text: "ML-001215 - Coyote",
        start: createDateTime(16),
        end: createDateTime(19),
        parent: 6,
        type: "ahead",
      },

      // TRK-6612
      {
        id: 7,
        text: "TRK-6612",
        start: createDateTime(9),
        end: createDateTime(13),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 701,
        text: "ML-001216 - Ashgrove",
        start: createDateTime(9),
        end: createDateTime(13),
        parent: 7,
        type: "onTime",
      },

      // TRK-8845
      {
        id: 8,
        text: "TRK-8845",
        start: createDateTime(6),
        end: createDateTime(19),
        parent: 0,
        open: true,
        type: "summary",
      },
      {
        id: 801,
        text: "ML-001217 - CH Robinson",
        start: createDateTime(6),
        end: createDateTime(8),
        parent: 8,
        type: "ahead",
      },
      {
        id: 802,
        text: "ML-001218 - Titan",
        start: createDateTime(10),
        end: createDateTime(13),
        parent: 8,
        type: "onTime",
      },
      {
        id: 803,
        text: "ML-001219 - TQL",
        start: createDateTime(15),
        end: createDateTime(19),
        parent: 8,
        type: "delayed",
      },
    ],
    [createDateTime]
  );

  // Timeline scales - day header with hour detail
  const scales = [
    { unit: "day", step: 1, format: "MMMM d, yyyy" },
    { unit: "hour", step: 1, format: "HH:mm" },
  ];

  // Column configuration
  const columns = [
    {
      id: "text",
      header: "Vehicle / Load",
      width: 220,
    },
  ];

  // Custom task types (colors defined in gantt-colors.css)
  const taskTypes = [
    { id: "task", label: "Task" },
    { id: "summary", label: "Summary" },
    { id: "milestone", label: "Milestone" },
    { id: "onTime", label: "On Time" },
    { id: "ahead", label: "Ahead" },
    { id: "delayed", label: "Delayed" },
  ];

  // Task dependency links (end-to-start connections)
  const links = [
    // TRK-2847 loads sequence
    { id: 1, source: 101, target: 102, type: "e2s" },
    { id: 2, source: 102, target: 103, type: "e2s" },
    // TRK-1923 loads sequence
    { id: 3, source: 201, target: 202, type: "e2s" },
    // TRK-4521 loads sequence
    { id: 4, source: 301, target: 302, type: "e2s" },
    // TRK-7734 loads sequence
    { id: 5, source: 401, target: 402, type: "e2s" },
    { id: 6, source: 402, target: 403, type: "e2s" },
    // TRK-3356 loads sequence
    { id: 7, source: 501, target: 502, type: "e2s" },
    // TRK-5589 loads sequence
    { id: 8, source: 601, target: 602, type: "e2s" },
    { id: 9, source: 602, target: 603, type: "e2s" },
    // TRK-8845 loads sequence
    { id: 10, source: 801, target: 802, type: "e2s" },
    { id: 11, source: 802, target: 803, type: "e2s" },
  ];

  // Project date range
  const projectStart = useMemo(() => {
    const date = new Date(selectedDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [selectedDate]);

  const projectEnd = useMemo(() => {
    const date = new Date(selectedDate);
    date.setHours(23, 59, 59, 999);
    return date;
  }, [selectedDate]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold tracking-tight">Load Schedule</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => changeDate(-1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 font-medium"
              onClick={() => setSelectedDate(new Date())}
            >
              {formatDate(selectedDate)}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => changeDate(1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          {headerActions}
        </div>
      </div>

      {/* Gantt Chart Container */}
      <div className="flex-1 min-h-0 border rounded-md bg-card overflow-hidden">
        <Willow>
          <ThemeWrapper fonts={false}>
            <Gantt
              tasks={tasks}
              scales={scales}
              columns={columns}
              links={links}
              taskTypes={taskTypes}
              start={projectStart}
              end={projectEnd}
              cellWidth={60}
              cellHeight={40}
              lengthUnit="hour"
            />
          </ThemeWrapper>
        </Willow>
      </div>
    </div>
  );
};

export default GanttChart;
