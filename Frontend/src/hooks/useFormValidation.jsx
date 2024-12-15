import { useState } from "react";

const useFormValidation = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        // Handle nested updates (e.g., formData.vehicle.color)
        return {
          ...prevState,
          [keys[0]]: {
            ...prevState[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const validateForm = () => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return { formData, errors, onChange, validateForm, resetForm };
};

export default useFormValidation;
