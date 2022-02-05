import React, { useState } from "react";
import "./join.css";
import { useForm, SubmitHandler } from "react-hook-form";

export type JoinInput = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const Join: React.FC = () => {
  const [genres, setGenres] = useState<string>();

  const { register, handleSubmit } = useForm<JoinInput>();
  const onSubmit: SubmitHandler<JoinInput> = async (formData) => {
    //TODO: add user to db
  };

  return (
    <div className="container" id="join">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>First enter some primary information</div>
        <input
          {...register("name")}
          placeholder="name..."
          className="text-input"
        />
        <br />
        <input
          {...register("surname")}
          placeholder="surname..."
          className="text-input"
        />
        <br />
        <br />
        <br />
        <div>First enter some primary information</div>
        <input
          {...register("email")}
          placeholder="email..."
          className="text-input"
        />
        <br />
        <input
          type="password"
          {...register("password")}
          placeholder="password..."
          className="text-input"
        />
        <br />
      </form>
      <section></section>
    </div>
  );
};

export default Join;
