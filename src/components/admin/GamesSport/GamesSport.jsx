import React, { useState } from "react";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection } from "firebase/firestore";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// For date picker
import DatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale"; // Import English locale
import "react-datepicker/dist/react-datepicker.css";

// Cloudinary upload
import axios from "axios";

// Register the English locale
registerLocale("en-US", enUS);

const GamesSport = () => {
  const [imgUrls, setImgUrls] = useState(Array(6).fill("")); // For storing image URLs from Cloudinary
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [timeAgo, setTimeAgo] = useState(new Date()); // Default to current date
  const [imageFiles, setImageFiles] = useState(Array(6).fill(null)); // For storing selected image files
  const [sportType, setSportType] = useState(""); // For storing selected sport type
  const [sellerType, setSellerType] = useState("Agency");
  const [registeredCity, setRegisteredCity] = useState("Un-Registered");
  const [assembly, setAssembly] = useState("Imported");
  const [engineCapacity, setEngineCapacity] = useState("1500CC");
  const [bodyType, setBodyType] = useState("Cross-over");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [condition, setCondition] = useState("Used");
  const [exteriorColor, setExteriorColor] = useState("Black");
  const [purpose, setPurpose] = useState("Sell");
  const [model, setModel] = useState("2022");
  const [color, setColor] = useState("Black");
  const [whatsapp, setWhatsapp] = useState("03189391781");
  const [type, setType] = useState("Sale");

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
      const newImgUrls = [...imgUrls];
      newImgUrls[index] = response.data.secure_url; // Save the image URL from Cloudinary
      setImgUrls(newImgUrls);
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

  // Function to add a new listing to Firestore
  const handleAddListing = async (e) => {
    e.preventDefault();

    if (imgUrls.some((url) => !url)) {
      alert("Please upload all images before submitting.");
      return;
    }

    try {
      // Get a reference to the 'GamesSport' collection
      const gamesSportCollection = collection(db, "GamesSport");

      // Add a new document to the 'GamesSport' collection
      const docRef = await addDoc(gamesSportCollection, {
        img: imgUrls[0], // img1
        img2: imgUrls[1], // img2
        img3: imgUrls[2], // img3
        img4: imgUrls[3], // img4
        img5: imgUrls[4], // img6: imgUrls[5], // img5
        title: title,
        description: description,
        location: location,
        price: price,
        link: link,
        sportType: sportType,
        timeAgo: timeAgo.toISOString(), // Convert to ISO string to store the date
      });

      alert("Listing added successfully!");
      // Reset all fields
      // setTitle("");
      // setImgUrls(Array(6).fill("")); // Reset all image URLs
      // setImageFiles(Array(6).fill(null)); // Reset all image files
      // setLocation("");
      // setPrice("");
      // setLink("");
      // setDescription("");
      setTimeAgo(new Date()); // Reset time to current date
      // setSportType("");
      setSellerType("Agency");
      setRegisteredCity("Un-Registered");
      setAssembly("Imported");
      setEngineCapacity("1500CC");
      setBodyType("Cross-over");
      setCondition("Used");
      setExteriorColor("Black");
      setPurpose("Sell");
      setModel("2022");
      setColor("Black");
      setWhatsapp("03189391781");
      setType("Sale");
    } catch (error) {
      console.error("Error adding listing: ", error);
      alert("Error adding listing.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Add a New Game or Sport</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddListing}>
                {/* Title */}
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
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
                      required
                    />
                  </Form.Group>
                ))}

                {/* Sport & Games Type */}
                <Form.Group controlId="formSportType" className="mb-3">
                  <Form.Label>Sport & Games Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={sportType}
                    onChange={(e) => setSportType(e.target.value)}
                    required
                  >
                    <option value="">Select Sport Type</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Gloves">Gloves</option>
                    <option value="Stumps">Stumps</option>
                  </Form.Control>
                </Form.Group>

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
                <Form.Group controlId="formTimeAgo" className="mb- 3">
                  <Form.Label>Time Ago (Date Added)</Form.Label>
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

export default GamesSport;
