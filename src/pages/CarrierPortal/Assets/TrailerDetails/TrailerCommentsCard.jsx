import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, PlusIcon, Paperclip } from "lucide-react";

const TrailerCommentsCard = ({ commentsData }) => {
  const getTypeBadgeColor = (type) => {
    const colors = {
      Maintenance: "bg-blue-500/10 hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 border border-blue-500/50",
      Repair: "bg-orange-500/10 hover:bg-orange-500/30 text-orange-700 dark:text-orange-400 border border-orange-500/50",
      General: "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50",
    };
    return colors[type] || "bg-gray-500/10 hover:bg-gray-500/30 text-gray-700 dark:text-gray-400 border border-gray-500/50";
  };

  return (
    <div className="w-full border rounded-sm bg-card flex flex-col">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MessageSquareIcon className="size-4" />
          Comments
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <PlusIcon className="size-4 mr-1" />
          Add Comment
        </Button>
      </div>
      <div className="divide-y divide-border">
        {commentsData && commentsData.length > 0 ? (
          commentsData.map((comment) => (
            <div key={comment.id} className="p-4 hover:bg-muted/50 transition-colors">
              {/* Date Time and Entered By */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date and Time</p>
                  <p className="text-sm font-medium text-foreground">
                    {comment.dateTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Entered By</p>
                  <p className="text-sm font-medium text-foreground">
                    {comment.enteredBy}
                  </p>
                </div>
              </div>

              {/* Type */}
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Type</p>
                <Badge className={getTypeBadgeColor(comment.type)}>
                  {comment.type}
                </Badge>
              </div>

              {/* Attachment */}
              {comment.attachment && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Attachment</p>
                  <div className="flex items-center gap-2">
                    <Paperclip className="size-4 text-muted-foreground" />
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                    >
                      {comment.attachment}
                    </a>
                  </div>
                </div>
              )}

              {/* Comment */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Comment</p>
                <p className="text-sm text-foreground leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No comments available
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerCommentsCard;
