import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";

interface MessageCardProps {
  roleType: "USER" | "ASSISTANT";
}

export const MessageCard = ({ roleType }: MessageCardProps) => {
  if (roleType === "ASSISTANT") {
    return <AssistantMessage />;
  }

  return <UserMessage content="User Message" />;
};

interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex justify-end pb-4 pr-2 pl-10">
      <Card className="rounded-lg py-2 px-4 shadow-none bg-sidebar">
        {content}
      </Card>
    </div>
  );
};

const AssistantMessage = () => {
  const createdAt = Date.now();

  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4"
        // type === "ERROR" && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src={`/logo.svg`}
          alt="vibe"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">VAG</span>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 font-medium">
          {format(createdAt, "HH:mm 'on' MM dd, yyyy")}
        </span>
      </div>
      <div className="pl-8 5 flex flex-col gap-y-4 ">
        <span>This is AI</span>
      </div>
    </div>
  );
};
