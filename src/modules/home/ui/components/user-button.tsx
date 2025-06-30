import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export const UserButton = () => {
  const { data } = authClient.useSession();
  return (
    <Button variant={`ghost`} className="flex items-center gap-x-1">
      {data?.user.image && (
        <Image
          src={data.user.image}
          alt="image"
          width={30}
          className="rounded-full"
          height={30}
        />
      )}
      <span className="text-lg">{data?.user.name}</span>
    </Button>
  );
};
