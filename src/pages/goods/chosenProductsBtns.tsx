import { MdOutlineCleaningServices, MdPayment } from "react-icons/md";

interface ChosenProductsBtnsProps {
  cleanChosenProducts: () => void;
  setChosenProductsModal: (value: React.SetStateAction<boolean>) => void;
}

function ChosenProductsBtns({
  cleanChosenProducts,
  setChosenProductsModal,
}: ChosenProductsBtnsProps) {
  return (
    <article className="w-full fixed bottom-[100px] flex gap-5 items-center justify-center">
      <button
        className="bg-secondary text-white rounded-lg shadow-xl shadow-black/50 w-[140px] h-fit py-2 cursor-pointer hover:bg-[#ff964b] duration-200 transition my-auto flex gap-2 justify-center items-center"
        onClick={cleanChosenProducts}
      >
        <MdOutlineCleaningServices size={25} /> Очистить
      </button>
      <button
        className="bg-green-700 text-white rounded-lg shadow-xl shadow-black/50 w-[140px] h-fit py-2 cursor-pointer hover:bg-green-600 duration-200 transition my-auto flex gap-2 justify-center items-center"
        onClick={() => setChosenProductsModal(true)}
      >
        <MdPayment size={25} /> Покупать
      </button>
    </article>
  );
}

export default ChosenProductsBtns;
