import { FormEvent, useState } from "react";
import { UserLoginValidationScheme } from "../validations";
import { useUser } from "../context/Auth.context";
import { ZodEffects, ZodError } from "zod";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [errors, setErrors] = useState(
    new Map([
      ["email", null],
      ["password", null],
    ])
  );
  const [serverError, setServerError] = useState<string | undefined>();

  const { login, loginWithGoogle } = useUser();
  async function onSubmitLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(
      new Map([
        ["email", null],
        ["password", null],
      ])
    );
    setServerError(undefined);
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());
    try {
      const validatedData = UserLoginValidationScheme.parse(data);
      await login(validatedData);
      toast("Welcome back!");
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
  const handleGoogleSuccess = async (credentialResponse: any) => {
    // Send the token to your backend for verification
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast("Welcome back!");
    } catch (e: any) {
      toast.error("Google login failed");
      setServerError(e.message);
    }
  };

  return (
    <div>
      <form className="auth-form" onSubmit={onSubmitLogin}>
        <div>
          <label>Email address:</label>
          <input name="email" required placeholder="Enter email address" />
          <span className="span">{errors.get("email")}</span>
        </div>
        <div>
          <label>Password:</label>
          <input name="password" required placeholder="Enter Password" />
          <span className="span">{errors.get("password")}</span>
        </div>
        <span className="span h-[20px] text-center w-fit block mx-auto text-[12px] text-[red] font-bold">
          {serverError}
        </span>
        <button>Login</button>
        <div className="google-sign-in">
          <GoogleLogin
            size="large"
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed")}
          />
        </div>
      </form>
    </div>
  );
}
