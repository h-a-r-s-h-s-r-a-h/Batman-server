import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    foods: [], // Array to store selected food items
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle checkbox inputs separately
      if (checked) {
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData); // For demonstration, log form data to console
  };
  const [exercisePlan, setExercisePlan] = useState(
    "Exercise_Type: HIIT\nDuration: 30 minutes\nIntensity: High\nMuscle groups targeted: Full-body\nEquipment needed: None\n\nPlan:\n- Warm up for 5 minutes with light cardio or dynamic stretching.\n- Do 8-10 rounds of the following exercises, with 30 seconds of rest between each round:\n    * Squat jumps\n    * Burpees\n    * Mountain climbers\n    * High knees\n    * Jumping jacks\n- Cool down for 5 minutes with slow walking or static stretching.\n"
  );
  const handleChange1 = (event) => {
    setExercisePlan(event.target.value);
  };
  return (
    <div>
      <h2>Student Registration</h2>
      <textarea
        value={exercisePlan}
        onChange={handleChange}
        style={{ width: "100%", height: "300px" }}
        disabled
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Foods:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="foods"
                value="pizza"
                checked={formData.foods.includes("pizza")}
                onChange={handleChange}
              />
              Pizza
            </label>
            <label>
              <input
                type="checkbox"
                name="foods"
                value="burger"
                checked={formData.foods.includes("burger")}
                onChange={handleChange}
              />
              Burger
            </label>
            <label>
              <input
                type="checkbox"
                name="foods"
                value="sushi"
                checked={formData.foods.includes("sushi")}
                onChange={handleChange}
              />
              Sushi
            </label>
            {/* Add more food items as needed */}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
