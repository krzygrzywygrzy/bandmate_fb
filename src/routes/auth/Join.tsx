import React, { useState } from "react";
import "./join.css";
import { useForm, SubmitHandler } from "react-hook-form";
import ListSelect from "../../components/input/ListSelect";
import { genresToSelect, instrumentsToSelect } from "../../core/exports";
import isValidUrl from "../../core/isValidUrl";
import Spotify from "react-spotify-embed";
import ImagePicker from "../../components/input/ImagePicker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export type JoinInput = {
  name: string;
  surname: string;
  email: string;
  password?: string;
  description: string;
};

const Join: React.FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [instruments, setInstruments] = useState<string[]>([]);

  const [spotify, setSpotify] = useState<string>();
  const [photos, setPhotos] = useState<File[]>([]);

  const { register, handleSubmit } = useForm<JoinInput>();
  const onSubmit: SubmitHandler<JoinInput> = async (formData) => {
    try {
      var user = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password ?? ""
      );
    } catch (err: any) {
      console.log(err);
    }
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
          {...register("email", { required: true })}
          placeholder="email..."
          className="text-input"
        />
        <br />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="password..."
          className="text-input"
        />
        <br />
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
        <section className="join-width">
          <div className="section-title">
            You can also paste Spotify link...
          </div>
          <br />
          <input
            placeholder="link to song or album..."
            className="text-input"
            onChange={(e) => setSpotify(e.target.value)}
            value={spotify}
          />
          <br />
          {spotify && isValidUrl(spotify) && (
            <Spotify style={{ width: "100%" }} link={spotify} />
          )}
        </section>
        <section className="join-width">
          <div className="section-title">
            And finally... you can share some photos of yourself
          </div>
          <br />
          <ImagePicker images={photos} setImages={(p) => setPhotos(p)} />
        </section>
        <button className="">Join</button>
      </form>

      <div className="bottom-margin"></div>
    </div>
  );
};

export default Join;
