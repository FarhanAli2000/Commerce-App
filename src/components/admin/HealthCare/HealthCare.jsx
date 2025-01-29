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

const HealthCare = () => {
  const [imgUrls, setImgUrls] = useState(Array(6).fill("")); // For storing image URLs from Cloudinary
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [postedAgo, setPostedAgo] = useState(new Date()); // Default to current date
  const [imageFiles, setImageFiles] = useState(Array(6).fill(null)); // For storing selected image files
  const [healthcareType, setHealthcareType] = useState(""); // For storing selected healthcare type
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
      // Get a reference to the 'listings' collection
      const listingsCollection = collection(db, "HealthCare");

      // Add a new document to the 'listings' collection
      const docRef = await addDoc(listingsCollection, {
        img: imgUrls[0], // img1
        img2: imgUrls[1], // img2
        img3: imgUrls[2], // img3
        img4: imgUrls[3], // img4
        img5: imgUrls[4],
        img6: imgUrls[5], // img5
        title: title,
        details: details,
        location: location,
        price: price,
        link: link,
        healthcareType: healthcareType,
        sellerType: sellerType,
        registeredCity: registeredCity,
        assembly: assembly,
        engineCapacity: engineCapacity,
        bodyType: bodyType,
        lastUpdated: lastUpdated.toISOString(),
        condition: condition,
        exteriorColor: exteriorColor,
        purpose: purpose,
        model: model,
        color: color,
        whatsapp: whatsapp,
        type: type,
        postedAgo: postedAgo.toISOString(), // Convert to ISO string to store the date
      });

      alert("Listing added successfully!");
      // Reset all fields
      // setTitle("");
      // setImgUrls(Array(6).fill("")); // Reset all image URLs
      // setImageFiles(Array(6).fill(null)); // Reset all image files
      // setLocation("");
      // setPrice("");
      // setLink("");
      // setDetails("");
      setPostedAgo(new Date()); // Reset time to current date
      // setHealthcareType("");
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
              <h3>Add a New HealthCare Item</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddListing}>
                {/* Title */}
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter listing title"
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

                {/* Healthcare Type */}
                <Form.Group controlId="formHealthcareType" className="mb-3">
                  <Form.Label>Healthcare Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={healthcareType}
                    onChange={(e) => setHealthcareType(e.target.value)}
                    required
                  >
                    <option value="">Select Healthcare Type</option>
                    <option value="Sugae Apparatus">Sugae Apparatus</option>
                    <option value="Bp Apparatus">Bp Apparatus</option>
                    <option value="Medicine">Medicine</option>
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
                    type="url"
                    placeholder="Enter link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Details */}
                <Form.Group controlId="formDetails" className="mb-3">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Posted Ago */}
                <Form.Group controlId="formPostedAgo" className="mb-3">
                  <Form.Label>Posted Ago (Date Posted)</Form.Label>
                  <DatePicker
                    selected={postedAgo}
                    onChange={(date) => setPostedAgo(date)} // Update the date state
                    dateFormat="MMMM d, yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    className="form-control"
                    required
                  />
                </Form.Group>

                {/* Seller Type */}
                <Form.Group controlId="formSellerType" className="mb-3">
                  <Form.Label>Seller Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={sellerType}
                    onChange={(e) => setSellerType(e.target.value)}
                    required
                  >
                    <option value="Agency">Agency</option>
                    <option value="Individual">Individual</option>
                  </Form.Control>
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
                <Form.Group controlId="formEngineCapacity" className="mb-3">
                  <Form.Label>Engine Capacity</Form.Label>
                  <Form.Control
                    as="select"
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.value)}
                    required
                  >
                    <option value="1500CC">1500CC</option>
                    <option value="2000CC">2000CC</option>
                    <option value="2500CC">2500CC</option>
                  </Form.Control>
                </Form.Group>

                {/* Body Type */}
                <Form.Group controlId="formBodyType" className="mb-3">
                  <Form.Label>Body Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    required
                  >
                    <option value="Cross-over">Cross-over</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                  </Form.Control>
                </Form.Group>

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
                <Form.Group controlId="formExteriorColor" className="mb-3">
                  <Form.Label>Exterior Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter exterior color"
                    value={exteriorColor}
                    onChange={(e) => setExteriorColor(e.target.value)}
                    required
                  />
                </Form.Group>

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

                {/* Model */}
                <Form.Group controlId="formModel" className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter model year"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Color */}
                <Form.Group controlId="formColor" className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* WhatsApp */}
                <Form.Group controlId="formWhatsapp" className="mb-3">
                  <Form.Label>WhatsApp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter WhatsApp number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
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

export default HealthCare;
