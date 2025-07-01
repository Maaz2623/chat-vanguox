import Image from "next/image";
import { MessageForm } from "../../../messages/ui/components/message-form";

export const HomeView = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-[12vh]">
        <div className="flex text-center justify-center flex-col space-y-4">
          <div className="w-full flex justify-center">
            <Image src={`/logo.svg`} width={65} height={65} alt="logo" />
          </div>
          <p className="w-full text-center text-2xl md:text-4xl font-bold">
            Start using VAG
          </p>
          <p className="text-wrap w-1/2 mx-auto text-muted-foreground">
            Get instant, intelligent answers to almost any question—anytime,
            anywhere. From everyday queries to complex topics, our AI chat
            platform delivers fast, accurate, and reliable responses to help you
            learn, solve, and create with ease.
          </p>
          <div className="w-1/2 mx-auto">
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};
