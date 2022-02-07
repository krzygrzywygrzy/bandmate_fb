import React, { useState } from "react";
import "./scss/popup.css";
import { IoCloseOutline } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

type Props = {
  close?(): void;
};

export type Inputs = {
  email: string;
  password: string;
};

const LoginPopup: React.FC<Props> = ({ close }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      var res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (close) close();
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="login-popup">
      <section className="close">
        <div className="close-button" onClick={close}>
          <IoCloseOutline size={22} />
        </div>
      </section>
      <header>
        Log in to <span>BandMate</span>
      </header>
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            className="login-input"
            placeholder="email..."
          />
          <input
            type="password"
            {...register("email")}
            className="login-input"
            placeholder="password..."
          />
          {errorMessage && <div className="err-message">{errorMessage}</div>}
          <button>Login</button>
        </form>
      </section>
    </div>
  );
};

export default LoginPopup;
