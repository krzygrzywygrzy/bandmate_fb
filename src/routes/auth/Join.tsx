import React, { useState } from "react";
import "./join.css";
import { useForm, SubmitHandler } from "react-hook-form";
import ListSelect from "../../components/input/ListSelect";
import { genresToSelect, instrumentsToSelect } from "../../core/exports";

export type JoinInput = {
  name: string;
  surname: string;
  email: string;
  password: string;
  description: string;
};

const Join: React.FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [instruments, setInstruments] = useState<string[]>([]);

  const { register, handleSubmit } = useForm<JoinInput>();
  const onSubmit: SubmitHandler<JoinInput> = async (formData) => {
    //TODO: add user to db
  };

  return (
    <div className="container" id="join">
      <form onSubmit={handleSubmit(onSubmit)} className="join-width">
        <div className="section-title">
          First enter some primary information
        </div>
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
        <textarea
          rows={10}
          placeholder="your description..."
          {...register("description")}
        ></textarea>
        <br />
        <br />
        <br />
        <div className="section-title">
          We also need some way to authenticate you...
        </div>
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
      <section className="join-width">
        <div className="section-title">Select genres you like</div>
        <br />
        <ListSelect
          data={genres}
          setData={(data) => setGenres(data)}
          toSelect={genresToSelect}
        />
      </section>
      <section className="join-width">
        <div className="section-title">Select instruments you play</div>
        <br />
        <ListSelect
          data={instruments}
          setData={(data) => setInstruments(data)}
          toSelect={instrumentsToSelect}
        />
      </section>
    </div>
  );
};

export default Join;
