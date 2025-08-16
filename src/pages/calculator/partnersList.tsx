import type { PartnersListProps } from "./types";
import Input from "../../components/input";
import { BsFilePlusFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";

function PartnersList({ partners, setPartners }: PartnersListProps) {
  const handlePartnersChange = (
    id: string | number,
    key: string,
    value: string | number
  ) =>
    setPartners((p) =>
      p.map((el) => (el.id === id ? { ...el, [key]: value } : el))
    );

  const handleAddNewPartner = () =>
    setPartners((p) => [
      ...p,
      { id: Number(new Date()), amount: 0, fullname: "" },
    ]);

  const handlePartnerRemove = (id: string | number) =>
    setPartners((p) => p.filter((el) => el.id !== id));

  return (
    <article className="pt-10 pl-10 flex gap-5 flex-wrap items-center">
      {partners.map((partner) => (
        <section
          key={partner.id}
          className="flex flex-col gap-1 relative group"
        >
          <FaMinusCircle
            className="absolute -right-2.5 hidden group-hover:block cursor-pointer"
            size={20}
            color="red"
            onClick={() => handlePartnerRemove(partner.id)}
          />
          <Input
            name="fullname"
            placeholder="Введите ФИО Партнёра"
            type="text"
            value={partner.fullname}
            onChange={(e) =>
              handlePartnersChange(partner.id, "fullname", e.target.value)
            }
            inputTailwindUtilities="ring-hover-text/30! focus:ring-hover-text/60! ring-1! rounded-xl! px-3! py-2! w-[200px]! focus:bg-bg/50"
          />
          <Input
            name="amount"
            placeholder="Введите Сумму"
            type="number"
            value={partner.amount}
            onChange={(e) =>
              handlePartnersChange(partner.id, "amount", e.target.value)
            }
            inputTailwindUtilities="ring-hover-text/30! focus:ring-hover-text/60! ring-1! rounded-xl! px-3! py-2! w-[200px]! focus:bg-bg/50"
          />
        </section>
      ))}
      <BsFilePlusFill
        color="#003A6B"
        size={80}
        onClick={handleAddNewPartner}
        className="cursor-pointer hover:fill-hover-text duration-200 transition"
      />
    </article>
  );
}

export default PartnersList;
