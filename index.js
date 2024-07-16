import mongoose, { connect } from "mongoose";

// create a function to connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://lilchizzyblingz27:uANLYZuROj25GpXY@cluster0.hgxtbn0.mongodb.net/mongoose-checkpoint?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`MongoDB Connected Successfully`);
    console.log("creating user document");
    findPeopleByName();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Task 1: A person prototype
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: [String],
});

// Task 2: Create a person model
const Person = mongoose.model("Person", personSchema);

//  Task 2b: create a person document
async function createPerson() {
  try {
    const person = new Person({
      name: "Mhizta Dera",
      age: 200,
      favoriteFoods: ["Pizza", "Hamburger"],
    });
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
}

// Task 3: Create many people with `Model.create()`
const createManyPeople = async () => {
  let arrayOfPeople = [
    { name: "Yusuf", age: 107, favoriteFoods: ["Noodles", "Rice", "Eba"] },
    { name: "Aisha", age: 27, favoriteFoods: ["Pepper soup", "meat", "pasta"] },
    { name: "Fatima", age: 17, favoriteFoods: ["Pizza", "Hamburger", "Eba"] },
  ];

  try {
    const result = await Person.create(arrayOfPeople);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// Task 4: Use `Model.find()` to Search Your Database
const findPeopleByName = async () => {
  try {
    const person = await Person.find({ name: "Yusuf" });
    console.log(person);
  } catch (erro) {
    console.log(errr);
  }
};

// Task 5: Use Model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = async () => {
  try {
    const person = await Person.findOne({ favoriteFoods: "Pizza" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 6: Use `Model.findById()` to Search Your Database By `_id` and Return a Single Document
const findPersonById = async () => {
  try {
    const person = await Person.findById("66914dbd9f7980ad0bc0c734");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 7: Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = async () => {
  try {
    const person = await Person.findById("66914dbd9f7980ad0bc0c73");
    person.favoriteFoods.push("Spaghetti");
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 8: Perform New Updates on a Document Using `model.findOneAndUpdate()`
const findAndUpdate = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: "Yusuf" },
      { age: 1000 },
      { new: true }
    );
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 9: Delete One Document Using `model.findByIdAndDelete`
const removeById = async () => {
  try {
    const person = await Person.findByIdAndDelete("669153b77e7827589e1319bc");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 10: MongoDB and Mongoose - Delete Many Documents with `model.remove()`
const removeManyPeople = async () => {
  try {
    const person = await Person.deleteMany({ name: "Mary" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};
// Task 11: Chaine Search Query Helpers to Narrow Search Results
const queryChain = async () => {
  try {
    const person = await Person.find({ favoriteFoods: "Pizza" })
      .sort({ name: "asc" })
      .limit(2)
      .select("-age")
      .exec();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

connectDB();
