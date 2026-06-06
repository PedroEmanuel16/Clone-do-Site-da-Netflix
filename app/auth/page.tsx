"use client";
import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";

// Interface para o erro da API
interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login",
    );
    setError(null);
  }, []);

  const login = useCallback(async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        window.location.href = "/profiles";
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await axios.post("/api/auth/register", {
        email,
        name,
        password,
      });

      await login();
    } catch (error) {
      console.error("Registration error:", error);

      // Tratamento tipado para erro do axios
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const data = error.response?.data as ApiErrorResponse;

        if (status === 409) {
          setError("Email already exists. Please login instead.");
        } else if (status === 400) {
          setError(data?.message || data?.error || "Invalid registration data");
        } else {
          setError("Registration failed. Please try again.");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Registration failed. Please try again.");
      }
      setIsLoading(false);
    }
  }, [email, name, password, login]);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(provider, {
        callbackUrl: "/profiles",
        redirect: false,
      });

      if (result?.error) {
        setError(`Failed to login with ${provider}. Please try again.`);
        setIsLoading(false);
      } else if (result?.ok) {
        window.location.href = "/profiles";
      }
    } catch (error) {
      console.error("Social login error:", error);
      setError(`Failed to login with ${provider}. Please try again.`);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="h-full w-full bg-black lg:bg-black/70">
        <nav className="px-4 sm:px-8 md:px-12 py-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-8 sm:h-10 md:h-12"
          />
        </nav>

        <div className="flex justify-center px-4 sm:px-6">
          <div className="bg-black/80 px-6 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-md">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}

            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  label="Username"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  disabled={isLoading}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
              />
            </div>

            <button
              onClick={variant === "login" ? login : register}
              disabled={isLoading}
              className="
                bg-red-600 
                py-3 
                text-white 
                w-full 
                cursor-pointer 
                hover:bg-red-700 
                transition 
                mt-10 
                rounded-md
                disabled:opacity-50
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading className="animate-spin" size={20} />
                  <span>
                    {variant === "login"
                      ? "Logging in..."
                      : "Creating account..."}
                  </span>
                </>
              ) : (
                <span>{variant === "login" ? "Login" : "Register"}</span>
              )}
            </button>

            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              {/* <div
                onClick={() => !isLoading && handleSocialLogin("google")}
                className={`
                  w-10 h-10 bg-white rounded-full flex items-center justify-center 
                  transition-all duration-300
                  ${!isLoading ? "cursor-pointer hover:opacity-80 hover:scale-110" : "opacity-50 cursor-not-allowed"}
                `}
              >
                <FcGoogle size={30} />
              </div> */}
              <div
                onClick={() => !isLoading && handleSocialLogin("github")}
                className={`
                  w-10 h-10 bg-white rounded-full flex items-center justify-center 
                  transition-all duration-300
                  ${!isLoading ? "cursor-pointer hover:opacity-80 hover:scale-110" : "opacity-50 cursor-not-allowed"}
                `}
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-8 sm:mt-10 md:mt-12 text-center text-sm sm:text-base">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer font-medium"
                onClick={!isLoading ? toggleVariant : undefined}
              >
                {variant === "login" ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
