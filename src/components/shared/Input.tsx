import Image from "next/image"
import images from "@/assets/index"
import { Dispatch, SetStateAction, useState } from "react"

type dataInput = {
  id?: string,
  type: string,
  label: string,
  inputData: string,
  setInputData: Dispatch<SetStateAction<string>>,
}

export const Input = ({ id, type, label, inputData, setInputData}: dataInput) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="form-item">
      <span>
        {label}:
      </span>
      <input  className="form-input" id={id} type={!visibility ? type : "text"} value={inputData} onChange={(e) => setInputData(e.target.value)} />
      {type === "password" && <Image width={26} className="eye-visibility" src={!visibility ? images.visible : images.visibleOff} alt="eye" onClick={() => setVisibility(!visibility)} />}
    </div>
  )
}