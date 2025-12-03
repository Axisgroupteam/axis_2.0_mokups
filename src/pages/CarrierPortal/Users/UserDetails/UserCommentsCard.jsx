import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, User, Clock, Paperclip } from "lucide-react";

const UserCommentsCard = ({ commentsData }) => {
  const typeColors = {
    Performance: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Training: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    General: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    Warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <div className="border rounded-sm bg-card">
      <div className="px-4 py-3 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="size-4" />
          Comments
        </h3>
        <Button
          size="sm"
          className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 flex items-center gap-1.5"
        >
          <Plus className="size-3" />
          Add Comment
        </Button>
      </div>
      <div className="p-4">
        {commentsData && commentsData.length > 0 ? (
          <div className="space-y-4">
            {commentsData.map((comment) => (
              <div
                key={comment.id}
                className="border rounded-lg p-3 bg-background hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="size-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-foreground">
                        {comment.enteredBy}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="size-2" />
                        {comment.dateTime}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      typeColors[comment.type] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {comment.type}
                  </span>
                </div>

                <p className="text-xs text-foreground mb-2 leading-relaxed">
                  {comment.comment}
                </p>

                {comment.attachment && (
                  <div className="flex items-center gap-1.5 p-1.5 bg-muted/50 rounded-md w-fit">
                    <Paperclip className="size-2.5 text-muted-foreground" />
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      {comment.attachment}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No comments added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCommentsCard;
