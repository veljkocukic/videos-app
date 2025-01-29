import { categories } from "../data/data";
import React, { useState } from 'react';
import { Button } from "./Button";

export const Modal: React.FC<IModal> = ({ category, setModal, setCategory }) => {
    const [localActive, setLocalActive] = useState(category)

    const closeModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModal(false);
    }

    const confirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCategory(localActive)
        setModal(false);

    }

    const Tag = ({ name, active }: ITag) => {
        let cName = 'box tag';
        if (active) cName += ' active-tag';
        return <div className={cName} onClick={() => setLocalActive(name)} >
            {name}
        </div>
    }


    return <div className="modal" >
        <div className="box modal-content" >
            <div className="modal-top"  >
                <h3>Filter</h3>
                <span onClick={closeModal}>&times;</span>
            </div>
            <div className="modal-body" >
                <p className="filter-label" >CATEGORY</p>
                <div className="tags-container" >
                    {categories.map((category, index) => <Tag key={index} name={category} active={localActive === category} />)}
                </div>
                {/* <p style={{ marginTop: '2rem' }} className="filter-label" >LENGTH</p>
                <div className="tags-container" >
                    {lengths.map((length, index) => <Tag key={index} name={length} active={modal.length === length} type="length" />)}
                </div> */}
            </div>
            <Button onClick={confirm} text='Confirm' />
        </div>
    </div>
}

interface IModal {
    category: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

interface ITag {
    name: string;
    active: boolean;
}