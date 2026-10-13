import { useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Event handlers for form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Perform validation checks and update error state
    if (name === "name" && value.length < 3) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "Name must be at least 3 characters long.",
      }));
    } else if (name === "email" && !isValidEmail(value)) {
      setFormErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
      }));
    } else if (name === "password" && value.length < 8) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "Password must be at least 8 characters long.",
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: " ", // Reset error message
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check
    const isFormValid = Object.values(formErrors).every(
      (error) => error === " ",
    );

    if (isFormValid) {
      // Form submission logic
      console.log("Form submitted successfully!");
      // Reset the form
      setFormData({
        name: " ",
        email: " ",
        password: " ",
      });
      setFormErrors({
        name: " ",
        email: " ",
        password: " ",
      });
    } else {
      console.log("Form contains validation errors.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <p className="error">{formErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {formErrors.password && <p className="error">{formErrors.password}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
