import { cn } from "@/lib/utils";

interface UserIconProps {
  userName: string | null,
  className?: string
}

const UserIcon = ({className = '', userName }: UserIconProps ) => {
  return (
    <div className={cn("w-12 h-12 flex justify-center items-center rounded-full dark:bg-white bg-black", className )}>
      <span className="dark:text-black text-white font-semibold">
        {userName?.[0].toUpperCase() || "U"}
      </span>
    </div>
  );
};
export default UserIcon;
