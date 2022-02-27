import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./scss/account.css";
import { useForm, SubmitHandler } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { UserActionType } from "../../store/actions/actionTypes";

const AccountEmail: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data!);
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(true);

  const { register, handleSubmit, reset } = useForm<{ email: string }>({
    defaultValues: {
      email: user.email,
    },
  });
  const [message, setMessage] = useState<string | null>(null);
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    if (EmailValidator.validate(data.email)) {
      await updateEmail(auth.currentUser!, data.email);
      dispatch({
        type: UserActionType.LOADED,
        payload: { ...user, email: data.email },
      });
      setMessage("Email updated successfully");
    } else {
      setMessage("This is not a correct email!");
    }
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    reset({ email: user.email });
  };

  return (
    <div className="account-email">
      <p>Your email</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          placeholder="new email..."
          disabled={disabled}
          className="text-input"
        />
        <br />
        {!disabled && (
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        )}
        {!disabled && <button>Update</button>}
      </form>
      {disabled && <button onClick={() => setDisabled(false)}>Edit</button>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AccountEmail;
