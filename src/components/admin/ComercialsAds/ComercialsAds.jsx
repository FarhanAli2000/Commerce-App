import React, { useState } from "react";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection } from "firebase/firestore";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// Cloudinary upload
import axios from "axios";

const ComercialsAds = () => {
  const [img, setImg] = useState(""); // For storing image URL from Cloudinary
  const [link, setLink] = useState(""); // For storing ad link
  const [imageFile, setImageFile] = useState(null); // For storing the selected image file

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "duvddbfbf");
    formData.append("cloud_name", "duvddbfbf");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duvddbfbf/image/upload",
        formData
      );
      setImg(response.data.secure_url); // Save the image URL from Cloudinary
      console.log("Image uploaded successfully:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file); // Upload the selected file
    }
  };

  // Function to add a new ad to Firestore
  const handleAddAd = async (e) => {
    e.preventDefault();

    if (!img) {
      alert("Please upload an image before submitting.");
      return;
    }

    try {
      // Get a reference to the 'ComercialsAds' collection
      const comercialsAdsCollection = collection(db, "ComercialsAds");

      // Add a new document to the 'ComercialsAds' collection
      const docRef = await addDoc(comercialsAdsCollection, {
        img: img,
        link: link,
      });

      alert("Ad added successfully!");
      setImg("");
      setLink("");
    } catch (error) {
      console.error("Error adding ad: ", error);
      alert("Error adding ad.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Add a New Commercial Ad</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddAd}>
                {/* Image Upload */}
                <Form.Group controlId="formImg" className="mb-3">
                  <Form.Label>Image Upload</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>

                {/* Link */}
                <Form.Group controlId="formLink" className="mb-3">
                  <Form.Label>Ad Link</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter ad link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" block>
                  Add Ad
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ComercialsAds;
