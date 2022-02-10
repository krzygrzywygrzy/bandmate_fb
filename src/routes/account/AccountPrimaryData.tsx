import React, { useState } from "react";
import "./scss/account.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserPrimary } from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updatePrimaryData } from "../../store/thunk/userThunks";

const AccountPrimaryData: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<UserPrimary>({
    defaultValues: {
      name: user.data!.name,
      surname: user.data!.surname,
      description: user.data!.description,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<UserPrimary> = async (data) => {
    setLoading(true);
    const res = await dispatch(updatePrimaryData(data));
    console.log(res);
    setLoading(false);
  };

  const cancelEditing = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    reset({
      name: user.data!.name,
      surname: user.data!.surname,
      description: user.data!.description,
    });
    setDisabled(true);
  };

  return (
    <section className="account-primary-data">
      <p>Your primary data</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inputs">
          <div>
            <input
              disabled={disabled}
              className="text-input"
              placeholder="name..."
              {...register("name")}
            ></input>
            <br />
            <input
              disabled={disabled}
              className="text-input"
              placeholder="surname..."
              {...register("surname")}
            ></input>
          </div>
          <textarea
            {...register("description")}
            rows={10}
            placeholder="description..."
            disabled={disabled}
          ></textarea>
        </div>
        {!disabled && (
          <div>
            <button onClick={cancelEditing} className="reset">
              Reset
            </button>
            <button>Save</button>
          </div>
        )}
      </form>
      {disabled && <button onClick={() => setDisabled(false)}>Edit</button>}
    </section>
  );
};

export default AccountPrimaryData;
