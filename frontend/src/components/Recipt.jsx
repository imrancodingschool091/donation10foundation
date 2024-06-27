import "./Recipt.css";
import React, { useRef, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../Context/PaymentContext";

import { FaDownload } from "react-icons/fa6";

function Recipt() {
  const navigate = useNavigate();
  const [Payment, setPayment] = usePayment(); // Correctly call usePayment
  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot();

  // Fetch payment data from local storage on component mount
  useEffect(() => {
    if (!Payment) {
      const savedPayment = localStorage.getItem("Payment");
      if (savedPayment) {
        setPayment(JSON.parse(savedPayment));
      }
    }
  }, [Payment, setPayment]);

 
  const getImage = async () => {
    try {
      const imageData = await takeScreenshot(ref.current);
      downloadScreenshot(imageData);
    } catch (error) {
      console.error("Error while taking screenshot:", error);
    }
  };

  const downloadScreenshot = (imageData) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "screenshot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    localStorage.removeItem("Payment");
    setPayment(null)

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div ref={ref}>


      <p>name;{Payment.name}</p>
      <p>City {Payment.city}</p>
      <p>amout:{Payment.amount}</p>
  


        <div className="buttons">
           
          <FaDownload style={{color:"darkblue",fontSize:"3.5rem"}} onClick={getImage}/>
        </div>
    
    </div>
  );
}

export default Recipt;
