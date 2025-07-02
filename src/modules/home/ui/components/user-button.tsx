import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  showName: boolean;
}

export const UserButton = ({ showName }: Props) => {
  const router = useRouter();

  const { data } = authClient.useSession();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(`/`);
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!showName ? (
          <Button className="p-0 size-fit" variant={`ghost`}>
            {data?.user.image && (
              <Image
                src={data.user.image}
                alt="image"
                width={30}
                className="rounded-full"
                height={30}
              />
            )}
          </Button>
        ) : (
          <Button
            variant={`outline`}
            className={cn("flex items-center gap-x-1")}
          >
            {data?.user.image && (
              <Image
                src={data.user.image}
                alt="image"
                width={25}
                className="rounded-full"
                height={25}
              />
            )}
            <span className="text-md">{data?.user.name}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="flex justify-between">
          <p className="text-rose-500">Sign out</p>
          <LogOutIcon className="text-rose-500" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
