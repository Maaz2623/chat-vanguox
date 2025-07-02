import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import Markdown from "react-markdown";
import { TypewriterMarkdown } from "./typewriter-markdown";

interface MessageCardProps {
  roleType: "USER" | "ASSISTANT";
  content: string;
  isLatest?: boolean; // 👈 optional flag
}

export const MessageCard = ({
  roleType,
  content,
  isLatest,
}: MessageCardProps) => {
  if (roleType === "ASSISTANT") {
    return <AssistantMessage content={content} isLatest={isLatest} />;
  }

  return <UserMessage content={content} />;
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

interface AssistantMessageProps {
  content: string;
  isLatest?: boolean;
}

const AssistantMessage = ({ content, isLatest }: AssistantMessageProps) => {
  const createdAt = Date.now();

  return (
    <div className={cn("flex flex-col group px-2 pb-4")}>
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
      <div className="pl-8 flex flex-col gap-y-4">
        {isLatest ? (
          <TypewriterMarkdown text={content} />
        ) : (
          <Markdown>{content}</Markdown>
        )}
      </div>
    </div>
  );
};
