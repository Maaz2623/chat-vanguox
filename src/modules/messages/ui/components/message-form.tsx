"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextAreaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface Props {
  chatId: string;
}

const formSchema = z.object({
  value: z.string().min(1, {
    message: "Prompt is required",
  }),
});

export const MessageForm = ({ chatId }: Props) => {
  const router = useRouter();

  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createMessageMutation = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: (data) => {
        router.push(`/chats/${data.chatId}`);
        queryClient.invalidateQueries(
          trpc.chat.getOne.queryOptions({
            id: data.chatId,
          })
        );
        queryClient.invalidateQueries(
          trpc.messages.getMany.queryOptions({
            chatId: chatId,
          })
        );
      },
      onError: (error) => {
        console.error(error.message);
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    form.reset();
    createMessageMutation.mutateAsync({
      value: values.value,
      chatId: chatId,
    });
  };

  const [isFocused, setIsFocused] = useState(false);
  const showUsage = false;
  const isPending = createMessageMutation.isPending;
  const isDisabled = isPending || !form.formState.isValid;
  return (
    <Form {...form}>
      <form
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextAreaAutosize
              {...field}
              disabled={isPending}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              minRows={2}
              maxRows={8}
              className="pt-4 resize-none border-none w-full outline-none bg-transparent"
              placeholder="What would you like to build?"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            />
          )}
        />
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>&#8984;</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            disabled={isDisabled}
            className={cn(
              "size-8 rounded-full",
              isDisabled && "bg-muted-foreground border"
            )}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
