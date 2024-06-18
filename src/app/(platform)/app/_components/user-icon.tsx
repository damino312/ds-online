import { AuthUser } from "@/types/next-auth";

const UserIcon = ({ user }: { user: AuthUser }) => {
  return (
    <button className="w-12 h-12 flex justify-center items-center rounded-full dark:bg-white bg-black ">
      <span className="dark:text-black text-white font-semibold">
        {user?.name?.toUpperCase()[0] || "U"}
      </span>
    </button>
  );
};
export default UserIcon;
