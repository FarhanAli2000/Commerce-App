import React from "react";
import img from "./Group 681.png";
import img1 from "./Group 682.png";
import img2 from "./Group 683.png";

const LatestBlog = () => {
  return (
    <div className="latestblog-wrapper latestBlog_Card ">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Latest Blog</h5>
          <button className="featuresection_btn featuresection_btn1">
            Explore Blogs
          </button>
        </div>
        <div className="row latest_blog_inner">
          <div className="col-md-6 latest_blog_box">
            <div className="image_box1 rounded-3 shadow-lg latest-blog-img">
              <img
                height={514}
                src={img}
                alt="The Best Spa Saloon"
                className="w-100 rounded-top-3  blog_image1"
              />
              <h6 className="text-center ">The Best Spa Saloon</h6>
            </div>
          </div>
          <div className="col-md-3 latest_blog_box">
            <div className="image_box2 rounded-3 shadow-lg mb-4 overflow-hidden latest-blog-img">
              <img src={img1} alt="" className="w-100 h-100 object-cover" />
              <h6 className="text-center">Three Powerful Trick</h6>
            </div>
            <div className="image_box2 rounded-3 shadow-lg overflow-hidden latest-blog-img">
              <img src={img1} alt="" className="w-100 h-100 object-cover" />
              <h6 className="text-center">Three Powerful Trick</h6>
            </div>
          </div>
          <div className="col-md-3 latest_blog_box">
            <div className="image_box2 rounded-3 shadow-lg mb-4 overflow-hidden latest-blog-img">
              <img src={img2} alt="" className="w-100 h-100 object-cover" />
              <h6 className="text-center">Competitive Analysis</h6>
            </div>
            <div className="image_box2 rounded-3 shadow-lg overflow-hidden latest-blog-img">
              <img src={img2} alt="" className="w-100 h-100 object-cover" />
              <h6 className="text-center">Competitive Analysis</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
