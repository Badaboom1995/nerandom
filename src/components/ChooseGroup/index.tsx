import React, { useEffect, useState } from "react";
import Choose from "../Choose";
import Modal from "react-modal";
import Button from "../Button";

const ChooseGroup = ({
  groupName,
  options = [],
  className,
  label,
  noVerticalMargins,
  radio,
  maxItems,
}: {
  groupName: string;
  options: { content: any; value: string }[];
  className?: string;
  label?: any;
  noVerticalMargins?: boolean;
  radio?: boolean;
  maxItems?: number;
}) => {
  const [showFirstItems, setFirstItems]: any = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [chosenIds, setIds]: any = React.useState([]);
  const onChoose = (value: any) => {
    if (radio) {
      setIds([value]);
    } else {
      setIds([...chosenIds, value]);
    }
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    const firstItems = maxItems ? options?.splice(0, maxItems) : options;
    setFirstItems(firstItems);
  }, []);

  return (
    <div className={`flex flex-wrap mb-2 ${className}`}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className={"overflow-scroll h-screen pb-20"}>
          {options?.map((item) => (
            <Choose
              id={`${groupName}-${item.value}`}
              key={`${groupName}-${item.value}`}
              name={groupName}
              value={item.value}
              content={item.content}
              noVerticalMargins={noVerticalMargins}
              radio={radio}
              onChoose={onChoose}
            />
          ))}
        </div>
        <div
          className={
            "shadow fixed bottom-10 left-0 w-full p-3 bg-white border-t-2 border-slate-100"
          }
        >
          <Button className={" w-3/4 mx-auto block"} onClick={closeModal}>
            Готово
          </Button>
        </div>
      </Modal>
      <label className={`font-medium text-md pl-3 mb-2 w-full`}>{label}</label>
      <div className="flex flex-wrap items-center">
        {showFirstItems.map((item: any) => (
          <Choose
            id={`${groupName}-${item.value}`}
            key={`${groupName}-${item.value}`}
            name={groupName}
            value={item.value}
            content={item.content}
            noVerticalMargins={noVerticalMargins}
            radio={radio}
            onChoose={onChoose}
          />
        ))}
        {maxItems && maxItems < options?.length && (
          <button
            type={"button"}
            className={
              "text-orange-500 px-2 py-4 underline block w-full text-left"
            }
            onClick={openModal}
          >
            Показать все...
          </button>
        )}
      </div>
    </div>
  );
};

export default ChooseGroup;
