import { SORT_DIRECTION } from "../../core/providers/appProvider";
import "./GroupCheckbox.scss";

interface IGroupCheckbox{
    label: string;
    values: Array<string>;
    toggleValues?: Array<string>;
    selectedValue: string;
    toggleSelectedValue?: string;
    setSelectedValue: (value: string) => void;
    setToggleSelectedValue?: (value: string) => void;
}

export default function GroupCheckbox({
    label,
    values = [],
    toggleValues = [],
    selectedValue = "",
    toggleSelectedValue = "",
    setSelectedValue = () => {},
    setToggleSelectedValue = () => {}
}: IGroupCheckbox){
    
    const setToggleValue = () => {
        if(toggleSelectedValue){
            const nonSelectedValue = toggleValues.find(val => val != toggleSelectedValue);
            setToggleSelectedValue(nonSelectedValue);
        }
        else{
            setToggleSelectedValue(toggleValues[0] || '');
        }
    }

    if(values.length > 0 && label)
    return <div className="checkbox">
    <label className="checkbox-label">{label}</label>
        {values?.map((checkbox, index) => 
        <div key={index} className="checkbox-element">
            <input 
                type="checkbox" 
                checked={Boolean(checkbox == selectedValue)}
                onChange={() => setSelectedValue(checkbox)}/>
            <span>{checkbox}</span>
            {checkbox == selectedValue &&
            <span className={toggleSelectedValue == SORT_DIRECTION.DESC ? "checkbox-up" : "checkbox-down"} onClick={() => setToggleValue()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 15L17.59 13.59L13 18.17L13 2H11L11 18.17L6.41 13.58L5 15L12 22L19 15Z" fill="#171A1F"/>
                </svg>
            </span>}
        </div>)}
    </div>
    
    return null;
}