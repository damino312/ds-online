import { AuthUser } from "@/types/next-auth";

const UserIcon = ({ user }: { user: AuthUser }) => {
  return (
    <button className="w-12 h-12 flex justify-center items-center rounded-full bg-white ">
      <span className="text-black font-semibold">
        {user?.name?.toUpperCase()[0] || "U"}
      </span>
    </button>
  );
};
export default UserIcon;
