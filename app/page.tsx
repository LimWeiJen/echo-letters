import Navbar from "@/components/shared/Navbar"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <main>
      <div>
        <nav>
          <h1>Home</h1>
          <h1>About</h1>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
        <div>
          <h1>@echo letters</h1>
          <h1>Echo Letters</h1>
          <h1>Where your thoughts find timeless wisdom</h1>
          <button>Start Now</button>
        </div>
      </div>
    </main>
  );
}
