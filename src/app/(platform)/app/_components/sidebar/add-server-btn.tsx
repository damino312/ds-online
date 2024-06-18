import { cn } from "@/lib/utils";

interface AddServerBtnProps {
  className?: string;
  setOpenModal: () => void;
}

const AddServerBtn = ({ className, setOpenModal }: AddServerBtnProps) => {
  return (
    <button
      className={cn(
        "w-12 h-12 flex justify-center items-center dark:bg-zinc-700 dark:hover:bg-emerald-600 bg-transparent hover:bg-emerald-600 rounded-3xl hover:rounded-lg transition-[border-radius] duration-300 ease-in-out",
        className
      )}
      onClick={setOpenModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};

export default AddServerBtn;
