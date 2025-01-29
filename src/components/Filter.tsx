import { useState } from "react";
import { FilterIcon } from "../assets/icons/FilterIcon";
import { Modal } from "./Modal";

export const Filter = ({ setCategory, category }: { setCategory: React.Dispatch<React.SetStateAction<string>>, category: string }) => {
    const [modal, setModal] = useState(false);
    return <div onClick={() => setModal(true)} className="box filter-container" style={{ cursor: 'pointer' }} >
        <FilterIcon />
        {modal && <Modal category={category} setCategory={setCategory} setModal={setModal} />}
    </div>
};