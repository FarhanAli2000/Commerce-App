import React, { useState } from "react";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// For date picker
import DatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale"; // Import English locale
import "react-datepicker/dist/react-datepicker.css";

// Cloudinary upload
import axios from "axios";

// Register the English locale
registerLocale("en-US", enUS);

const Cars = () => {
  const [name, setName] = useState("");
  const [imageUrls, setImageUrls] = useState(Array(6).fill("")); // Array to hold image URLs
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [ManufactureYear, setManufactureYear] = useState("");

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [timeAgo, setTimeAgo] = useState(new Date()); // Default to current date
  const [imageFiles, setImageFiles] = useState(Array(6).fill(null)); // Array to hold selected image files
  const [registeredCity, setRegisteredCity] = useState("Un-Registered");
  const [assembly, setAssembly] = useState("Imported");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [condition, setCondition] = useState("Used");
  const [purpose, setPurpose] = useState("Sell");
  const [PhoneNumber, setPhoneNumber] = useState("");

  const [model, setModel] = useState("2022");
  const [DrivenKm, setDrivenKm] = useState("");

  const [whatsapp, setWhatsapp] = useState("03189391781");
  const [type, setType] = useState("Sale");
  const [selectedCity, setSelectedCity] = useState("");
  const [Registeredin, setRegisteredin] = useState("");
  const [TrustedCars, setTrustedCars] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedEngineType, setSelectedEngineType] = useState("");
  const [selectedEngineCapacity, setSelectedEngineCapacity] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedNumberOfDoors, setSelectedNumberOfDoors] = useState("");
  const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState("");
  const [selectedModalCategory, setSelectedModalCategory] = useState("");
  const [selectedSellerType, setSelectedSellerType] = useState("");
  const [selectedPictureAvailability, setSelectedPictureAvailability] =
    useState("");
  const [selectedVideoAvailability, setSelectedVideoAvailability] =
    useState("");
  const [selectedAdType, setSelectedAdType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);

  const locations = [
    "Downtown Dubai",
    "Dubai Marina",
    "Jumeirah",
    "Deira",
    "Business Bay",
  ];

  // Handle checkbox selection
  const handleLocationChanges = (e, loc) => {
    if (e.target.checked) {
      setSelectedLocations((prev) => [...prev, loc]);
    } else {
      setSelectedLocations((prev) => prev.filter((item) => item !== loc));
    }
  };
  const handleFuelTypeChange = (event) => {
    const fuelType = event.target.value;
    setSelectedFuelType(fuelType);
    console.log(fuelType); // Log selected fuel type to the console
  };
  const handleAdTypeChange = (event) => {
    const adType = event.target.value;
    setSelectedAdType(adType);
    console.log(adType); // Log selected ad type to the console
  };
  const handleVideoAvailabilityChange = (event) => {
    const videoAvailability = event.target.value;
    setSelectedVideoAvailability(videoAvailability);
    console.log(videoAvailability); // Log selected video availability to the console
  };
  const handlePictureAvailabilityChange = (event) => {
    const pictureAvailability = event.target.value;
    setSelectedPictureAvailability(pictureAvailability);
    console.log(pictureAvailability); // Log selected picture availability to the console
  };
  const handleSellerTypeChange = (event) => {
    const sellerType = event.target.value;
    setSelectedSellerType(sellerType);
    console.log(sellerType); // Log selected seller type to the console
  };

  const handleModalCategoryChange = (event) => {
    const modalCategory = event.target.value;
    setSelectedModalCategory(modalCategory);
    console.log(modalCategory); // Log selected modal category to the console
  };
  const handleSeatingCapacityChange = (event) => {
    const seatingCapacity = event.target.value;
    setSelectedSeatingCapacity(seatingCapacity);
    console.log(seatingCapacity); // Log selected seating capacity to the console
  };
  const handleNumberOfDoorsChange = (event) => {
    const numberOfDoors = event.target.value;
    setSelectedNumberOfDoors(numberOfDoors);
    console.log(numberOfDoors); // Log selected number of doors to the console
  };
  const handleBodyTypeChange = (event) => {
    const bodyType = event.target.value;
    setSelectedBodyType(bodyType);
    console.log(bodyType); // Log selected body type to the console
  };
  const handleAssemblyChange = (event) => {
    const assemblyType = event.target.value;
    setSelectedAssembly(assemblyType);
    console.log(assemblyType); // Log selected assembly type to the console
  };
  const handleEngineCapacityChange = (event) => {
    const engineCapacity = event.target.value;
    setSelectedEngineCapacity(engineCapacity);
    console.log(engineCapacity); // Log selected engine capacity to the console
  };
  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    console.log(color); // Log selected color to the console
  };

  const handleEngineTypeChange = (event) => {
    const engineType = event.target.value;
    setSelectedEngineType(engineType);
    console.log(engineType); // Log selected engine type to the console
  };
  const handleTransmissionChange = (event) => {
    const transmission = event.target.value;
    setSelectedTransmission(transmission);
    console.log(transmission); // Log selected transmission to the console
  };
  const handleTrustedCarChange = (event) => {
    const TrustedCars = event.target.value;
    setTrustedCars(TrustedCars);
    console.log(TrustedCars); // Log selected car brand to the console
  };
  const handleRegisteredinChange = (event) => {
    const setRegisteredinCity = event.target.value;
    setRegisteredin(setRegisteredinCity);
    console.log(setRegisteredinCity, "setRegisteredinCity"); // Log selected city to the console
  };
  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    console.log(city, "city___________"); // Log selected city to the console
  };
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    const location = event.target.name; // Use the name attribute to get the location label
    setSelectedLocation(location);
    console.log(location); // Log selected location to the console
  };
  const [selectedCarBrand, setSelectedCarBrand] = useState("");

  const handleCarBrandChange = (event) => {
    const carBrand = event.target.value;
    setSelectedCarBrand(carBrand);
    console.log(carBrand); // Log selected car brand to the console
  };
  // Handle image upload to Cloudinary
  const handleImageUpload = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "duvddbfbf");
    formData.append("cloud_name", "duvddbfbf");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duvddbfbf/image/upload",
        formData
      );
      const newImageUrls = [...imageUrls];
      newImageUrls[index] = response.data.secure_url; // Save the image URL from Cloudinary
      setImageUrls(newImageUrls);
      console.log("Image uploaded successfully:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  // Handle file selection for images
  const handleFileChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);
      handleImageUpload(file, index); // Upload the selected file
    }
  };

  // Function to add a new car to Firestore
  const handleAddCar = async (e) => {
    e.preventDefault();

    // if (imageUrls.some((url) => !url)) {
    //   alert("Please upload all images before submitting.");
    //   return;
    // }

    try {
      // Get a reference to the 'carData' collection
      const carsCollection = collection(db, "Cars");

      // Add a new document to the 'carData' collection
      const docRef = await addDoc(carsCollection, {
        title: name,
        img: imageUrls[0], // img1
        img2: imageUrls[1], // img2
        img3: imageUrls[2], // img3
        img4: imageUrls[3], // img4
        img5: imageUrls[4], // img5
        img6: imageUrls[5], // img6
        location: location,
        Emirates: selectedLocation,
        price: price,
        link: link,
        description: description,
        Make: selectedCarBrand,

        timeAgo: timeAgo.toISOString(), // Convert to ISO string to store the date
        sellerType: selectedSellerType,
        registeredCity: registeredCity,
        assembly: assembly,
        engineCapacity: selectedEngineCapacity,
        bodyType: selectedBodyType,
        lastUpdated: lastUpdated.toISOString(),
        condition: condition,
        purpose: purpose,
        model: model,
        whatsapp: whatsapp,
        type: type,
        isFeatured: selectedAdType,
        VideoAvailability: selectedVideoAvailability,
        PictureAvailability: selectedPictureAvailability,
        FuelType: selectedFuelType,
        AdType: selectedAdType,
        ModalCategory: selectedModalCategory,
        SellerType: selectedSellerType,
        NumberOfDoors: selectedNumberOfDoors,
        SeatingCapacity: selectedSeatingCapacity,
        Assembly: selectedAssembly,
        BodyType: selectedBodyType,
        Color: selectedColor,
        EngineType: selectedEngineType,
        EngineCapacity: selectedEngineCapacity,
        Transmission: selectedTransmission,
        TrustedCars: TrustedCars,
        Registeredin: Registeredin,
        City: selectedCity,
        DrivenKm: DrivenKm,
        PhoneNumber: PhoneNumber,
        registeredCity: registeredCity,
        ManufactureYear: ManufactureYear,
      });

      alert("Car added successfully!");
      // Reset all fields
      // setName("");
      // setImageUrls(Array(6).fill("")); // Reset all image URLs
      // setImageFiles(Array(6).fill(null)); // Reset all image files
      // setLocation("");
      // setPrice("");
      // setLink("");
      // setDescription("");
      setTimeAgo(new Date()); // Reset time to current date
      //   setRegisteredCity("Un-Registered");
      //   setAssembly("");
      //   setCondition("");
      //   setPurpose("");
      //   setModel("");
      //   setWhatsapp("");
      //   setType("Sale");
    } catch (error) {
      console.error("Error adding car: ", error);
      alert("Error adding car.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Add a New Car Listing</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddCar}>
                {/* Name */}
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <div>
                  <Form.Group className="mb-3">
                    <Form.Select
                      onChange={handleCityChange}
                      value={selectedCity}
                    >
                      <option disabled value="">
                        City
                      </option>
                      <option value="New York">New York</option>
                      <option value="Bogotá">Bogotá</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Tokyo">Tokyo</option>
                      <option value="Paris">Paris</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <Form.Group>
                  {/* Emirates Locations */}
                  <div>
                    {[
                      { label: "Downtown Dubai", value: "12345" },
                      { label: "Dubai Marina", value: "12345" },
                      { label: "Jumeirah", value: "12345", checked: true },
                      { label: "Deira", value: "12345" },
                      { label: "Business Bay", value: "12345" },
                    ].map((location, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 0",
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          label={location.label}
                          name={location.label} // Use name attribute for location
                          defaultChecked={location.checked || false}
                          onChange={handleLocationChange}
                        />
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {location.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Form.Group>

                {/* Selected Location */}
                <div style={{ marginTop: "20px" }}>
                  <Form.Group>
                    <Form.Label>Select Location</Form.Label>
                    <Form.Control as="select" value={selectedLocation} readOnly>
                      <option value="">-- Select Location --</option>
                      {[
                        "Downtown Dubai",
                        "Dubai Marina",
                        "Jumeirah",
                        "Deira",
                        "Business Bay",
                      ].map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  {/* Dropdown Selection for Car Brands */}
                  <Form.Select
                    className="mt-3"
                    onChange={handleCarBrandChange}
                    value={selectedCarBrand}
                  >
                    <option disabled value="">
                      Make
                    </option>
                    <option value="Toyota">Toyota</option>
                    <option value="Mercedez-Benz">Mercedez-Benz</option>
                    <option value="Nissan">Nissan</option>
                    <option value="BMW">BMW</option>
                    <option value="Lamborghini">Lamborghini</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formRegisteredCity" className="mb-3">
                  <Form.Label>ManufactureYear</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ManufactureYear"
                    value={ManufactureYear}
                    onChange={(e) => setManufactureYear(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleRegisteredinChange}
                    value={Registeredin}
                  >
                    <option value="" disabled>
                      Registered in
                    </option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Dubai Marina">Dubai Marina</option>
                    <option value="Jumeirah">Jumeirah</option>
                    <option value="Deira">Deira</option>
                    <option value="Business Bay">Business Bay</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleTrustedCarChange}
                    value={TrustedCars}
                  >
                    <option value="" disabled>
                      Trusted Cars
                    </option>
                    <option value="Toyota">Toyota</option>
                    <option value="Mercedez-Benz">Mercedez-Benz</option>
                    <option value="Nissan">Nissan</option>
                    <option value="BMW">BMW</option>
                    <option value="Lamborghini">Lamborghini</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleTransmissionChange}
                    value={selectedTransmission}
                  >
                    <option value="" disabled>
                      Transmission
                    </option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleColorChange}
                    value={selectedColor}
                  >
                    <option value="" disabled>
                      Color
                    </option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Grey">Grey</option>
                    <option value="Red">Red</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Silver">Silver</option>
                    <option value="Orange">Orange</option>
                    <option value="Purple">Purple</option>
                    <option value="Brown">Brown</option>
                    <option value="Pink">Pink</option>
                    <option value="Beige">Beige</option>
                    <option value="Maroon">Maroon</option>
                    <option value="Turquoise">Turquoise</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleEngineTypeChange}
                    value={selectedEngineType}
                  >
                    <option value="" disabled>
                      Engine Type
                    </option>
                    <option value="Inline-4 (14) Engine">
                      Inline-4 (14) Engine
                    </option>
                    <option value="V6 Engine">V6 Engine</option>
                    <option value="V8 Engine">V8 Engine</option>
                    <option value="Inline-6 (16) Engine">
                      Inline-6 (16) Engine
                    </option>
                    <option value="V12 Engine">V12 Engine</option>
                    <option value="Inline-3 Engine">Inline-3 Engine</option>
                    <option value="V10 Engine">V10 Engine</option>
                    <option value="Flat-4 Engine">Flat-4 Engine</option>
                    <option value="Flat-6 Engine">Flat-6 Engine</option>
                    <option value="W12 Engine">W12 Engine</option>
                    <option value="W16 Engine">W16 Engine</option>
                    <option value="Electric Motor">Electric Motor</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Engine Capacity (cc)"
                    value={selectedEngineCapacity}
                    onChange={handleEngineCapacityChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleAssemblyChange}
                    value={selectedAssembly}
                  >
                    <option value="" disabled>
                      Assembly
                    </option>
                    <option value="Local">Local</option>
                    <option value="Imported">Imported</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleBodyTypeChange}
                    value={selectedBodyType}
                  >
                    <option value="" disabled>
                      Body Type
                    </option>
                    <option value="Coupe">Coupe</option>
                    <option value="Sedan">Sedan (Saloon)</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Crossover">Crossover</option>
                    <option value="Station Wagon">Station Wagon</option>
                    <option value="Minivan">Minivan</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="Roadster">Roadster</option>
                    <option value="MPV">MPV (Multi-Purpose Vehicle)</option>
                    <option value="Luxury Sedan">Luxury Sedan</option>
                    <option value="Limousine">Limousine</option>
                    <option value="Coupe SUV">Coupe SUV</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleNumberOfDoorsChange}
                    value={selectedNumberOfDoors}
                  >
                    <option value="" disabled>
                      Number of Doors
                    </option>
                    <option value="4">4 Doors</option>
                    <option value="5">5 Doors</option>
                    <option value="2">2 Doors</option>
                    <option value="3">3 Doors</option>
                    <option value="0">
                      No Doors (e.g., a truck or a specialized vehicle)
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleSeatingCapacityChange}
                    value={selectedSeatingCapacity}
                  >
                    <option value="" disabled>
                      Seating Capacity
                    </option>
                    <option value="4">4 Seats</option>
                    <option value="5">5 Seats</option>
                    <option value="2">2 Seats</option>
                    <option value="3">3 Seats</option>
                    <option value="0">
                      No Seats (e.g., for cargo or specialty vehicles)
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleModalCategoryChange}
                    value={selectedModalCategory}
                  >
                    <option value="" disabled>
                      Modal Category
                    </option>
                    <option value="A-Class">A-Class (Compact)</option>
                    <option value="B-Class">B-Class (Compact MPV)</option>
                    <option value="C-Class">C-Class (Compact Exe)</option>
                    <option value="E-Class">E-Class (Executive)</option>
                    <option value="S-Class">S-Class (Luxury)</option>
                    <option value="CLA">CLA (Compact Coupe)</option>
                    <option value="CLS">CLS (Executive Coupe)</option>
                    <option value="GLA">GLA (Compact SUV)</option>
                    <option value="GLC">GLC (Luxury SUV)</option>
                    <option value="GLE">GLE (Luxury SUV)</option>
                    <option value="GLS">GLS (Full-Size SUV)</option>
                    <option value="G-Class">G-Class (Off-Road SUV)</option>
                    <option value="SLK">SLK (Compact Roadster)</option>
                    <option value="SLC">SLC (Compact Roadster)</option>
                    <option value="AMG GT">AMG GT (Performance)</option>
                    <option value="EQC">EQC (Electric SUV)</option>
                    <option value="EQS">EQS (Electric Luxury Sedan)</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleSellerTypeChange}
                    value={selectedSellerType}
                  >
                    <option value="" disabled>
                      Seller Type
                    </option>
                    <option value="Dealers">Dealers</option>
                    <option value="Individuals">Individuals</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handlePictureAvailabilityChange}
                    value={selectedPictureAvailability}
                  >
                    <option value="" disabled>
                      Picture Availability
                    </option>
                    <option value="With Pictures">With Pictures</option>
                    <option value="Without Pictures">Without Pictures</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleVideoAvailabilityChange}
                    value={selectedVideoAvailability}
                  >
                    <option value="" disabled>
                      Video Availability
                    </option>
                    <option value="With Video">With Video</option>
                    <option value="Without Video">Without Video</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleAdTypeChange}
                    value={selectedAdType}
                  >
                    <option value="" disabled>
                      Ad Type
                    </option>
                    <option value="Featured Ad">Featured Ad</option>
                  </Form.Select>
                </Form.Group>
                {/* Image Uploads */}
                {[...Array(6)].map((_, index) => (
                  <Form.Group
                    controlId={`formImageUrl${index + 1}`}
                    className="mb-3"
                    key={index}
                  >
                    <Form.Label>{`Image Upload ${index + 1}`}</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange(index)}
                    />
                  </Form.Group>
                ))}
                {/* Location */}
                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Price */}

                {/* Link */}
                <Form.Group controlId="formLink" className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Description */}
                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Time Ago */}
                <Form.Group controlId="formTimeAgo" className="mb-3">
                  <Form.Label>Time Ago (Date Posted)</Form.Label>
                  <DatePicker
                    selected={timeAgo}
                    onChange={(date) => setTimeAgo(date)} // Update the date state
                    dateFormat="MMMM d, yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    className="form-control"
                    required
                  />
                </Form.Group>

                {/* Registered City */}
                <Form.Group controlId="formRegisteredCity" className="mb-3">
                  <Form.Label>Registered City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter registered city"
                    value={registeredCity}
                    onChange={(e) => setRegisteredCity(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Assembly */}
                <Form.Group controlId="formAssembly" className="mb-3">
                  <Form.Label>Assembly</Form.Label>
                  <Form.Control
                    as="select"
                    value={assembly}
                    onChange={(e) => setAssembly(e.target.value)}
                    required
                  >
                    <option value="Imported">Imported</option>
                    <option value="Local">Local</option>
                  </Form.Control>
                </Form.Group>
                {/* Engine Capacity */}

                {/* Body Type */}

                {/* Condition */}
                <Form.Group controlId="formCondition" className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    as="select"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  >
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </Form.Control>
                </Form.Group>
                {/* Exterior Color */}

                {/* Purpose */}
                <Form.Group controlId="formPurpose" className="mb-3">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    as="select"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  >
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    defaultValue=""
                    onChange={handleFuelTypeChange}
                    value={selectedFuelType}
                  >
                    <option value="" disabled>
                      Fuel Type
                    </option>
                    <option value="Petroleum">Petroleum</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
                {/* Model */}
                <Form.Group controlId="formModel" className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Color */}

                {/* WhatsApp */}
                <Form.Group controlId="formWhatsapp" className="mb-3">
                  <Form.Label>WhatsApp</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter WhatsApp number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDrivenKm" className="mb-3">
                  <Form.Label>Driven KM</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Driven KMS"
                    value={DrivenKm}
                    onChange={(e) => setDrivenKm(e.target.value)}
                    required
                  />
                </Form.Group>
                {/* Type */}
                <Form.Group controlId="formType" className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="Sale">Sale</option>
                    <option value="Lease">Lease</option>
                  </Form.Control>
                </Form.Group>
                {/* Submit Button */}
                <Button variant="primary" type="submit" block>
                  Add Listing
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cars;
