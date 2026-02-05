import signinSvg from "../assets/signin.svg";
import signupSvg from "../assets/signup.svg";


export default function Login2Card({
  view,
  setView,
  register,
  handleSubmit,
  errors,
  onLogin,
  onSignup,
    authError,
}) {
  return (
    <div className="w-full max-w-full overflow-x-hidden ">
      <div
        className="w-full overflow-x-hidden
        min-h-screen
        pt-[120px] md:pt-0
        flex items-center justify-center
        bg-gradient-to-b from-blue-600 to-[#0e121c]
        pt-28 md:pt-0
                flex items-start lg:items-center
                justify-center px-4"
        style={{
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        {/* MAIN WRAPPER */}
        <div className="relative w-full max-w-[1100px] mx-auto overflow-hidden lg:h-[560px] relative z-10 mt-10 sm:mt-14 md:mt-24">
          {/* ================= LEFT NAV (DESKTOP ONLY) ================= */}
          <div
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2
                        w-65 h-120 bg-[#1f2937] rounded-2xl z-10
                        flex-col items-center py-6 text-white"
          >
            {/* <img src={logo} className="w-10 mb-10" /> */}

            <button
              onClick={() => setView("signin")}
              className={`w-full py-4 transition-all duration-300
              ${
                view === "signin"
                  ? "bg-blue-600 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setView("signup")}
              className={`w-full py-4 transition-all duration-300
              ${
                view === "signup"
                  ? "bg-blue-600 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* ================= HERO CARD ================= */}
          <div
            className={`
            relative
            lg:absolute lg:block
            left-auto lg:left-1/2
            top-auto lg:top-1/2
            transform lg:-translate-x-1/2 lg:-translate-y-1/2
            mx-auto
            w-full max-w-[320px] sm:max-w-90
            h-[340px] sm:h-[420px] lg:h-[520px]
            bg-blue-500 rounded-2xl z-20
            flex flex-col items-center justify-center
            text-white px-4
            transition-all duration-500
            ${view === "signin" ? "scale-100" : "scale-95"}
          `}
          >
            <img
              src={view === "signin" ? signinSvg : signupSvg}
              className="max-w-full w-[160px] sm:w-[200px] h-auto mb-6 block transition-all duration-500"
            />

            <h2 className="text-2xl font-semibold text-center">
              {view === "signin" ? "Welcome Back." : "Join The Crowd."}
            </h2>

            <p className="text-sm text-blue-100 mt-2 text-center">
              {view === "signin"
                ? "Please enter your credentials."
                : "Create an account and start your journey."}
            </p>
          </div>

          {/* ================= FORM CARD ================= */}
          <div
            className="relative lg:absolute lg:block right-0 top-auto lg:top-1/2
                     transform lg:-translate-y-1/2
                     mt-6 lg:mt-0
                     w-full max-w-85 sm:max-w-95
                     mx-auto
                     bg-[#111827] rounded-2xl z-10
                     p-6 sm:p-8 lg:p-10 text-white
                     transition-all duration-500"
          >
            {/* MOBILE TOGGLE */}
            <div className="flex lg:hidden mb-6 rounded overflow-hidden">
              <button
                onClick={() => setView("signin")}
                className={`w-1/2 py-2 text-sm transition
                ${view === "signin" ? "bg-blue-600" : "bg-gray-800"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setView("signup")}
                className={`w-1/2 py-2 text-sm transition
                ${view === "signup" ? "bg-blue-600" : "bg-gray-800"}`}
              >
                Sign Up
              </button>
            </div>

            {view === "signin" ? (
              <form
                onSubmit={handleSubmit(onLogin)}
                className="space-y-4 animate-slideUp"
              >
                <input
                  placeholder="Email"
                  className={`w-full bg-gray-800 border p-3 rounded
    ${errors.email ? "border-red-500" : "border-gray-700"}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.email.message}
                  </p>
                )}

                {authError && !errors.email && (
                  <p className="text-xs text-red-400 mt-1">{authError}</p>
                )}

                {errors.loginEmail && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.loginEmail.message}
                  </p>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full bg-gray-800 border p-3 rounded
    ${errors.password || authError ? "border-red-500" : "border-gray-700"}`}
                  {...register("password", { required: "Password required" })}
                />

                {/* react-hook-form error */}
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.password.message}
                  </p>
                )}

                {/* backend auth error */}
                {authError && !errors.password && (
                  <p className="text-xs text-red-400 mt-1 animate-fadeIn">
                    {authError}
                  </p>
                )}

                <button
                  className="w-full bg-blue-600 py-3 rounded font-medium
                                 hover:scale-[1.02] transition"
                >
                  SIGN IN
                </button>

                <p className="text-xs text-gray-400 leading-relaxed">
                  By clicking Sign In you agree to our terms and conditions,
                  privacy policy and reusability rules.
                </p>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit(onSignup)}
                className="space-y-4 animate-slideUp"
              >
                <input
                  placeholder="Full Name"
                  className={`w-full bg-gray-800 border p-3 rounded
    ${errors.name ? "border-red-500" : "border-gray-700"}`}
                  {...register("name", { required: "Name required" })}
                />

                <input
                  placeholder="Email"
                  className={`w-full bg-gray-800 border p-3 rounded
    ${errors.signupEmail ? "border-red-500" : "border-gray-700"}`}
                  {...register("signupEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />

                {errors.signupEmail && (
                  <p className="text-xs text-red-400 mt-1 animate-fadeIn">
                    {errors.signupEmail.message}
                  </p>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full bg-gray-800 border p-3 rounded
    ${errors.password ? "border-red-500" : "border-gray-700"}`}
                  {...register("password", { required: "Password required" })}
                />

                <button
                  className="w-full bg-green-600 py-3 rounded font-medium
                                 hover:scale-[1.02] transition"
                >
                  SIGN UP
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
