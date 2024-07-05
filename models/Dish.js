import mongoose from "mongoose";

      const Schema = new mongoose.Schema(
          {
            Name: {
              type: String,
              required: [true, "Please enter the Dish name"],
            },
            Ingredients: {
              type: String,
              required: [true, "Please enter the ingredients"],
            },
            Time: {
                type: String,
                required: [true, "Approx Time required"],
            },
          }
        );

      const DModel = mongoose.model("dish", Schema);
      export default DModel;