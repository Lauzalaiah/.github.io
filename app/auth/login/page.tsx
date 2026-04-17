import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div 
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/dollar-bg-bright.jpg')" }}
    >
      {/* Overlay leger pour lisibilite du texte */}
      <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            Connexion
          </h1>
          <p className="mt-2 font-sans text-sm font-medium text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {"Entrez vos identifiants reçus par email"}
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center font-sans text-sm font-medium text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          {"Pas encore de compte ?"}{" "}
          <a href="/" className="text-primary underline hover:text-primary/80">
            Acheter la formation
          </a>
        </p>
      </div>
    </div>
  )
}
