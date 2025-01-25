import UserIcon from "@/app/(platform)/app/_components/user-icon";
import Image from "next/image";

interface UserIconProps {
  userPicture: string | null;
  userName: string | null;
}

const UserProfile = ({ userPicture, userName }: UserIconProps) => {
  if (userPicture) {
    return <Image className="w-9 h-9" src={userPicture} alt="Img" />;
  }

  return <UserIcon className="w-9 h-9" userName={userName} />;
};

export default UserProfile;
