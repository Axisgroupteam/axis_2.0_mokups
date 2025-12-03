import { useLocation } from "react-router-dom";
import { breadcrumbLabels, detailPageLabels, nonLinkableSegments } from "@/config/breadcrumbs";

export const useBreadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = [];
  let currentPath = "";
  let previousSegment = null;

  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    // Check if segment has a label (skip if null)
    const label = breadcrumbLabels[segment];

    if (label === null) {
      // Skip this segment but keep building path
      previousSegment = segment;
      return;
    }

    // Check if this segment should be linkable
    const isLinkable = !nonLinkableSegments.includes(segment);

    // If no label defined, check if it's a dynamic segment (like an ID)
    if (label === undefined) {
      // Check if it looks like an ID (number or UUID-like)
      if (/^\d+$/.test(segment) || /^[a-f0-9-]{8,}$/i.test(segment)) {
        // Check if the previous segment has a detail page label
        if (previousSegment && detailPageLabels[previousSegment]) {
          breadcrumbs.push({
            label: detailPageLabels[previousSegment],
            path: currentPath,
            isLinkable: false,
          });
        }
        previousSegment = segment;
        return;
      }
      // Convert segment to title case for unknown segments
      const formattedLabel = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label: formattedLabel,
        path: currentPath,
        isLinkable,
      });
    } else {
      breadcrumbs.push({
        label,
        path: currentPath,
        isLinkable,
      });
    }

    previousSegment = segment;
  });

  return breadcrumbs;
};

export default useBreadcrumbs;
