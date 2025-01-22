import { FormEvent, useRef, useState } from "react";
import { useUser } from "../context/Auth.context";
import { UserRegistration, UserRegistrationValidationScheme } from "../validations";
import { ZodError } from "zod";
import { uploadImage } from "../services/auth.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Register() {
  const [errors, setErrors] = useState(
    new Map([
      ["email", null],
      ["password", null],
      ["name", null],
    ])
  );
  const [serverError, setServerError] = useState<string | undefined>();

  const { register } = useUser();
  const nav = useNavigate();

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  async function onSubmitRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(
      new Map([
        ["email", null],
        ["password", null],
        ["image", null],
        ["name", null],
      ])
    );
    setServerError(undefined);
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());
    try {
      const validatedData: UserRegistration & { image?: string } =
        UserRegistrationValidationScheme.parse(data);
      const imageFiles = imageInputRef.current!.files;
      if (imageFiles && imageFiles.length > 0) {
        // upload image
        const imageUrl = await uploadImage(imageFiles[0]);
        console.log(imageUrl)
        validatedData.image = imageUrl;
      }
      await register(validatedData);
      // registration successfull
      nav("/auth/login");
      toast("Registration successfull, you may login");
    } catch (e: any) {
      if (e instanceof ZodError) {
        const newErrors = new Map();
        for (var error of e.errors) {
          const [field] = (error as any).path;
          const message = (error as any).message;
          newErrors.set(field, message);
        }
        setErrors(newErrors);
      } else {
        setServerError(e.message);
      }
    }
  }

  return (
    <div>
      <form  className="auth-form"  onSubmit={onSubmitRegister}>
        <div>
          <label>Full name:</label>
          <input required name="name" placeholder="Enter Full name" />
          <span>{errors.get("name")}</span>
        </div>
        <div>
          <label>Email address:</label>
          <input required name="email" placeholder="Enter email address" />
          <span>{errors.get("email")}</span>
        </div>
        <div>
          <label>Password:</label>
          <input required name="password" placeholder="Enter Password" />
          <span>{errors.get("password")}</span>
        </div>
        <div className="flex flex-col items-start">
          <label>Choose image</label>
          <input ref={imageInputRef} name="image" type="file" />
        </div>
        <span className="h-[20px] text-center w-fit block mx-auto text-[12px] text-[red] font-bold">
          {serverError}
        </span>

        <button>Register</button>
      </form>
    </div>
  );
}
