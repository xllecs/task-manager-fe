const Dropdown = ({ data }) => {
  console.log(data)
  return (
    <div className="dropdown-wrapper">
      {Object.entries(data).map(([value, option]) => (
        <div className="dropdown-option" key={value}>{option}</div>
      ))}
    </div>
  )
}

export default Dropdown
