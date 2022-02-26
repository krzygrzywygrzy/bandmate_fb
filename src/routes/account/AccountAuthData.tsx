import { updatePassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../../firebase";

type Inputs = {
  password: string;
  repeatPassword: string;
};

const AccountAuthData: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const [message, setMessage] = useState<string | null>(null);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password === data.repeatPassword) {
      try {
        if (!auth.currentUser) throw Error("User not logged in");
        await updatePassword(auth.currentUser, data.password);
        setMessage("Password updated succesfully!");
      } catch (err: any) {
        setMessage(err.message);
      }
    } else {
      setMessage("Passwords do not match!");
    }
  };

  const resetPasswords = (e: any) => {
    e.preventDefault();
    reset({
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <div className="account-auth-data">
      <p>Change Password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="new password..."
          {...register("password")}
          className="text-input"
        />
        <br />
        <input
          placeholder="repeat password..."
          {...register("repeatPassword")}
          className="text-input"
        />
        <br />
        <button onClick={resetPasswords} className="reset">
          Reset
        </button>
        <button>Update</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AccountAuthData;
