
type dataInput = {
  type: string,
  label: string,
  setInputData: any,
  inputData: string
}

export const Input = ({ type, label, inputData, setInputData}: dataInput) => {
  return (
    <div className="form-item">
      <span>
        {label}:
      </span>
      <input className="form-input" id={type} type={type} value={inputData} onChange={(e) => setInputData(e.target.value)} />
    </div>
  )
}