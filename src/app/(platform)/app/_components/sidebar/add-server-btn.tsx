const AddServerBtn = ({ setOpenModal }: { setOpenModal: () => void }) => {
  return (
    <button
      className="w-12 h-12 flex justify-center items-center bg-zinc-900 hover:bg-emerald-600 rounded-3xl hover:rounded-lg transition-[border-radius] duration-300 ease-in-out"
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
