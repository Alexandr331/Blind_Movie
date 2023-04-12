
type dataInput = {
  type: string,
  label: string,
  setInputData: any,
  inputData: string
}

export const Input = ({ type, label, inputData, setInputData}: dataInput) => {
  return (
    <label>
      {label}:
      <input type={type} value={inputData} onChange={(e) => setInputData(e.target.value)} />
    </label>
  )
}