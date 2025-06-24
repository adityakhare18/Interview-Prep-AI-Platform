import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import uploadImage from "../../utils/uploadImage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //   const handleSignUp = async (e) => {
  //     e.preventDefault();
  //     let profileImageUrl = "";

  //     if (!fullName) {
  //       setError("Full name is required");
  //       return;
  //     }

  //     if (!validateEmail(email)) {
  //       setError("Please enter a valid email");
  //       return;
  //     }

  //     if (!password) {
  //       setError("Please enter a password");
  //       return;
  //     }

  //     setError("");

  //     //signup api call
  //     try {
  //       try {
  //   if (profilePic) {
  //     const imgUploadRes = await uploadImage(profilePic);
  //     profileImageUrl = imgUploadRes.imageUrl || "";
  //   }
  //   const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
  //     name: fullName,
  //     email,
  //     password,
  //     profileImageUrl,
  //   });

  //   updateUser(response.data);
  //   navigate("/dashboard");
  // } catch (error) {
  //   if (error.response && error.response.data.message) {
  //     setError(error.response.data.message);
  //   } else {
  //     setError("Something went wrong. Please try again later.");
  //   }
  // }

  //     } catch (error) {
  //       if (error.response && error.response.data.message) {
  //         setError(error.response.data.message);
  //       } else {
  //         setError("Something went wrong. Please try again later.")
  //       }
  //     }
  //   };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Full name is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      updateUser(response.data);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by enterning your details below.
      </p>
      <form action="" onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            required
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          Sign Up
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already an account ?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
