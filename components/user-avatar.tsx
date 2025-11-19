import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage alt="@shadcn" src="" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
