import { useState } from "react"

const CreateTaskModal = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="create-task-wrapper">
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  )
}

export default CreateTaskModal
